import * as ts from "typescript";
import { DeclarationKind } from "../declaration-kind.types";
import { DeclarationDefinition } from "../declaration-definition.types";
export type VariableDeclaration = {
    name: string;
    type?: string;
    exclamation?: string;
    initializer?: string;
    raw: string;
} & DeclarationKind<ts.VariableDeclaration>;
export declare const variableDeclarationDefinition: DeclarationDefinition<VariableDeclaration>;
