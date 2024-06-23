import * as ts from "typescript";
import {Modifiers} from "./modifiers";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";


export type GetAccessorDeclaration = {
  name: string,
  type?: string
} & DeclarationKind<ts.GetAccessorDeclaration> & Modifiers;

// TODO - add props from ts.FunctionLikeDeclarationBase and ts.SignatureDeclarationBase

export const getAccessorDeclarationDefinition: DeclarationDefinition<GetAccessorDeclaration> = {
  props: ['name', 'type', 'modifiers']
}
