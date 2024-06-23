import * as ts from "typescript";
import {DeclarationDefinition} from "../declaration-definition.types";
import {DeclarationKind} from "../declaration-kind.types";
import {Modifiers} from "./modifiers";
import {PropertyDeclaration} from "./property";
import {MethodDeclaration} from "./method";
import {GetAccessorDeclaration} from "./get-accessor";
import {SetAccessorDeclaration} from "./set-accessor";
import {ConstructorDeclaration} from "./constructor";
import {TypeParameterDeclaration} from "./type";
import {HeritageClause} from "./heritage";


export type ClassElement = PropertyDeclaration | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | ConstructorDeclaration


export type ClassDeclaration = {
  name: string,
  typeParameters?: TypeParameterDeclaration[],
  heritage?: HeritageClause[],
  members: ClassElement[]
} & DeclarationKind<ts.ClassDeclaration> & Modifiers


export const classDeclarationDefinition: DeclarationDefinition<ClassDeclaration> = {
  props: ['name', 'typeParameters', 'members', 'heritageClauses', 'modifiers']
}