import * as ts from "typescript";
import { Modifiers } from "./modifiers";
import { DeclarationKind } from "../declaration-kind.types";
import { DeclarationDefinition } from "../declaration-definition.types";
export type ImportDeclaration = {
    moduleSpecifier: string;
    importClause?: ImportClause;
    raw: string;
    children?: ImportClause[];
} & DeclarationKind<ts.ImportDeclaration> & Modifiers;
export declare const importDeclarationDefinition: DeclarationDefinition<ImportDeclaration>;
export type ImportClause = {
    name?: string;
    isTypeOnly?: boolean;
    raw: string;
    children?: NamedImports[];
} & DeclarationKind<ts.ImportClause>;
export declare const importClauseDefinition: DeclarationDefinition<ImportClause>;
export type NamedImports = {
    elements: ImportSpecifier[];
    raw: string;
    children?: ImportSpecifier[];
} & DeclarationKind<ts.NamedImports>;
export declare const namedImportsDefinition: DeclarationDefinition<NamedImports>;
export type ImportSpecifier = {
    name: string;
    propertyName?: string;
    isTypeOnly: boolean;
    raw: string;
} & DeclarationKind<ts.ImportSpecifier>;
export declare const importSpecifierDefinition: DeclarationDefinition<ImportSpecifier>;
export type NamespaceImport = {
    name: string;
    raw: string;
} & DeclarationKind<ts.NamespaceImport>;
export declare const namespaceImportDefinition: DeclarationDefinition<NamespaceImport>;
