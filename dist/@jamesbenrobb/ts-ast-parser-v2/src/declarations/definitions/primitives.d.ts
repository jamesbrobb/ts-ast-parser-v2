import * as ts from "typescript";
import { Parser } from "../declaration-parser";
export declare function parseObjectLiteral(node: ts.ObjectLiteralExpression, sourceFile: ts.SourceFile, parser: Parser<any>): Record<string, any>;
export declare function parseArrayLiteral(node: ts.ArrayLiteralExpression, sourceFile: ts.SourceFile, parser: Parser<any>): any[];
export declare function parseBoolean(node: ts.BooleanLiteral, sourceFile: ts.SourceFile): boolean;
export declare function parseString(node: ts.Node, sourceFile: ts.SourceFile): string;
