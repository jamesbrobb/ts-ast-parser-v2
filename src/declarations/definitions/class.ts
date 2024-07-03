import * as ts from "typescript";
import {DeclarationDefinition} from "../declaration-definition.types";
import {DeclarationKind} from "../declaration-kind.types";
import {isPublicPropertyDeclaration, PropertyDeclaration} from "./property";
import {isPublicMethodDeclaration, MethodDeclaration} from "./method";
import {GetAccessorDeclaration, isPublicGetAccessorDeclaration} from "./get-accessor";
import {isPublicSetAccessorDeclaration, SetAccessorDeclaration} from "./set-accessor";
import {ConstructorDeclaration} from "./constructor";
import {TypeParameterDeclaration} from "./type";
import {HeritageClause} from "./heritage";
import {getModifiers, Modifiers} from "./modifiers";


export type ClassElement = PropertyDeclaration | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | ConstructorDeclaration


export type ClassDeclaration = {
  name: string
  typeParameters?: TypeParameterDeclaration[]
  heritage?: HeritageClause[]
  members: ClassElement[]
  modifiers?: Modifiers
  properties?: PropertyDeclaration[]
  accessors?: (GetAccessorDeclaration | SetAccessorDeclaration)[]
  methods?: MethodDeclaration[]
} & DeclarationKind<ts.ClassDeclaration>


export const classDeclarationDefinition: DeclarationDefinition<ClassDeclaration> = {
  props: ['name', 'typeParameters', 'members', 'heritageClauses', 'modifiers'],
  propHandlers: {
    modifiers: getModifiers
  },
  postProcess: [
    (dec: ClassDeclaration) => {
      dec.properties = dec.members.filter(isPublicPropertyDeclaration)
      dec.methods = dec.members.filter(isPublicMethodDeclaration)
      dec.accessors = [
        ...dec.members.filter(isPublicSetAccessorDeclaration),
        ...dec.members.filter(isPublicGetAccessorDeclaration)
      ]
    }
  ]
}