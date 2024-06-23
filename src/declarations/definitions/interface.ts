import * as ts from "typescript";
import {Modifiers} from "./modifiers";
import {TypeParameterDeclaration} from "./type";
import {HeritageClause} from "./heritage";
import {ClassElement} from "typescript";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";


export type InterfaceDeclaration = {
  name: string,
  typeParameters?: TypeParameterDeclaration[],
  heritage?: HeritageClause[],
  members: ClassElement[]
} & DeclarationKind<ts.InterfaceDeclaration> & Modifiers;


export const interfaceDeclarationDefinition: DeclarationDefinition<InterfaceDeclaration> = {
  props: ['name', 'typeParameters', 'members', 'heritageClauses', 'modifiers']
}
