import * as ts from "typescript";
import { ParameterDeclaration } from "./parameter";
import { Modifiers } from "./modifiers";
import { TypeParameterDeclaration } from "./type";
import { DeclarationKind } from "../declaration-kind.types";
import { DeclarationDefinition } from "../declaration-definition.types";
export type MethodDeclaration = {
    name: string;
    parameters: ParameterDeclaration[];
    type?: string;
    typeParameters?: TypeParameterDeclaration[];
} & DeclarationKind<ts.MethodDeclaration> & Modifiers;
export declare const methodDeclarationDefinition: DeclarationDefinition<MethodDeclaration>;
