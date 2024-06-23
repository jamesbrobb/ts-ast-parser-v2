import * as ts from "typescript";
import {ParameterDeclaration} from "./parameter";
import {Modifiers} from "./modifiers";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";


export type ConstructorDeclaration = {
  parameters: ParameterDeclaration[]
} & DeclarationKind<ts.ConstructorDeclaration> & Modifiers;


export const constructorDeclarationDefinition: DeclarationDefinition<ConstructorDeclaration> = {
  props: ['parameters', 'modifiers']
}
