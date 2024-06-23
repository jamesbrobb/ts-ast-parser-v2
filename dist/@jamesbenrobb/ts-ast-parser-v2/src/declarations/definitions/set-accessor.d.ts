import * as ts from "typescript";
import { Modifiers } from "./modifiers";
import { DeclarationKind } from "../declaration-kind.types";
import { ParameterDeclaration } from "./parameter";
import { DeclarationDefinition } from "../declaration-definition.types";
export type SetAccessorDeclaration = {
    name: string;
    type?: string;
    parameters: ParameterDeclaration[];
} & DeclarationKind<ts.SetAccessorDeclaration> & Modifiers;
export declare const setAccessorDeclarationDefinition: DeclarationDefinition<SetAccessorDeclaration>;
