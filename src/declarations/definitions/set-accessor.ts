import * as ts from "typescript";
import {Modifiers} from "./modifiers";
import {DeclarationKind} from "../declaration-kind.types";
import {ParameterDeclaration} from "./parameter";
import {DeclarationDefinition} from "../declaration-definition.types";


export type SetAccessorDeclaration = {
  name: string,
  type?: string,
  parameters: ParameterDeclaration[]
} & DeclarationKind<ts.SetAccessorDeclaration> & Modifiers;

// TODO - add props from ts.FunctionLikeDeclarationBase and ts.SignatureDeclarationBase

export const setAccessorDeclarationDefinition: DeclarationDefinition<SetAccessorDeclaration> = {
  props: ['name', 'type', 'parameters', 'modifiers']
}
