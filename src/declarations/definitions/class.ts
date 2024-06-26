import * as ts from "typescript";
import {DeclarationDefinition} from "../declaration-definition.types";
import {DeclarationKind} from "../declaration-kind.types";
import {PropertyDeclaration} from "./property";
import {MethodDeclaration} from "./method";
import {GetAccessorDeclaration} from "./get-accessor";
import {SetAccessorDeclaration} from "./set-accessor";
import {ConstructorDeclaration} from "./constructor";
import {TypeParameterDeclaration} from "./type";
import {HeritageClause} from "./heritage";
import {getModifiers, Modifiers} from "./modifiers";


export type ClassElement = PropertyDeclaration | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | ConstructorDeclaration


export type ClassDeclaration = {
  name: string,
  typeParameters?: TypeParameterDeclaration[],
  heritage?: HeritageClause[],
  members: ClassElement[],
  modifiers?: Modifiers
} & DeclarationKind<ts.ClassDeclaration>


export const classDeclarationDefinition: DeclarationDefinition<ClassDeclaration> = {
  props: ['name', 'typeParameters', 'members', 'heritageClauses', 'modifiers'],
  propHandlers: {
    modifiers: getModifiers
  }
}