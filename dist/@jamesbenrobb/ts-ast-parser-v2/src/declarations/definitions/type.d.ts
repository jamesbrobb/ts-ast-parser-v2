import * as ts from "typescript";
import { Modifiers } from "./modifiers";
import { PropertySignature } from "./property";
import { DeclarationKind } from "../declaration-kind.types";
import { DeclarationDefinition } from "../declaration-definition.types";
import { Parser } from "../declaration-parser";
export type TypeParameterDeclaration = {
    name: string;
    constraint?: string;
    default?: string;
    raw: string;
} & DeclarationKind<ts.TypeParameterDeclaration> & Modifiers;
export declare const typeParameterDeclarationDefinition: DeclarationDefinition<TypeParameterDeclaration>;
export type TypeReferenceNode = {
    name: string;
    raw: string;
} & DeclarationKind<ts.TypeReferenceNode>;
export declare const typeReferenceDefinition: DeclarationDefinition<TypeReferenceNode>;
export type ExpressionWithTypeArguments = {
    expression: string;
    typeArguments?: string[];
    raw: string;
} & DeclarationKind<ts.ExpressionWithTypeArguments>;
export declare const expressionWithTypeArgumentsDefinition: DeclarationDefinition<ExpressionWithTypeArguments>;
export type TypeAliasDeclaration = {
    name: string;
    typeParameters?: TypeParameterDeclaration[];
    type: string;
    raw: string;
} & DeclarationKind<ts.TypeAliasDeclaration> & Modifiers;
export declare const typeAliasDeclarationDefinition: DeclarationDefinition<TypeAliasDeclaration>;
export type TypeLiteral = {
    members: ({
        kind: number;
        nodeType: string;
        raw: string;
    } | PropertySignature)[];
    raw: string;
} & DeclarationKind<ts.TypeLiteralNode>;
export declare const typeLiteralDefinition: DeclarationDefinition<TypeLiteral>;
export type TypeElement = {
    name: string;
    optional?: boolean;
} & DeclarationKind<ts.TypeElement>;
export declare const typeElementDefinition: DeclarationDefinition<TypeElement>;
export declare function getType(node: ts.TypeNode, sourceFile: ts.SourceFile, parser: Parser<any>): string | any;
