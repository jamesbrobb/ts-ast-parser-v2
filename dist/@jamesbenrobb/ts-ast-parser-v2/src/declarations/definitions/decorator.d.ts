import * as ts from "typescript";
import { Parser } from "../declaration-parser";
import { DeclarationKind } from "../declaration-kind.types";
export type DecoratorMetadata = {
    [key: string]: string | string[];
};
export type DecoratorMetadataTypes = DecoratorMetadata | string | (DecoratorMetadata | string)[];
export type Decorator = {
    type: string;
    metadata?: DecoratorMetadataTypes;
    raw: string;
    signature: string;
} & DeclarationKind<ts.Decorator>;
export type GetDecoratorMetadata<T extends {}> = {
    [K in keyof T]: T[K] extends infer K ? K extends Array<unknown> ? string[] : K extends undefined ? never : string : never;
};
export type DecoratorDef<T extends string, M extends DecoratorMetadataTypes> = {
    type: T;
    metadata?: M;
    raw: string;
    signature: string;
};
export declare function getDecorator<T extends Decorator>(node: ts.Decorator, sourceFile: ts.SourceFile, parser: Parser<any>): T;
