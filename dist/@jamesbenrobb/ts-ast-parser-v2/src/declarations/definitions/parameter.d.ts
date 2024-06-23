import * as ts from "typescript";
import { Modifiers } from "./modifiers";
import { DeclarationKind } from "../declaration-kind.types";
import { DeclarationDefinition } from "../declaration-definition.types";
export type ParameterDeclaration = {
    name: string;
    optional: boolean;
    signature: string;
    type?: string;
    initializer?: string;
    raw: string;
} & DeclarationKind<ts.ParameterDeclaration> & Modifiers;
export declare const parameterDeclarationDefinition: DeclarationDefinition<ParameterDeclaration>;
