import * as ts from "typescript";
import { Modifiers } from "./modifiers";
import { TypeParameterDeclaration } from "./type";
import { ParameterDeclaration } from "./parameter";
import { DeclarationKind } from "../declaration-kind.types";
import { DeclarationDefinition } from "../declaration-definition.types";
export type FunctionDeclaration = {
    name: string;
    type?: string;
    typeParameters?: TypeParameterDeclaration[];
    parameters: ParameterDeclaration[];
} & DeclarationKind<ts.FunctionDeclaration> & Modifiers;
export declare const functionDeclarationDefinition: DeclarationDefinition<FunctionDeclaration>;
