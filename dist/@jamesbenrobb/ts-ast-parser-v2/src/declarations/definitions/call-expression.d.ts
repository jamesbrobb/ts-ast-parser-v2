import * as ts from "typescript";
import { DeclarationKind } from "../declaration-kind.types";
import { DeclarationDefinition } from "../declaration-definition.types";
export type CallExpression = {
    expression: string;
    questionDotToken?: string;
    typeArguments?: string;
    arguments: string;
} & DeclarationKind<ts.CallExpression>;
export declare const callExpressionDefinition: DeclarationDefinition<CallExpression>;
