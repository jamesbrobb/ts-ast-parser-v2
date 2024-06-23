import * as ts from "typescript";
import {Modifiers} from "./modifiers";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";



export type ImportDeclaration = {
  moduleSpecifier: string,
  importClause?: ImportClause,
  //attributes?: ts.ImportAttributes, // TODO - add declaration
  raw: string,
  children?: ImportClause[] // TODO - needed in import map factory - look at removing
} & DeclarationKind<ts.ImportDeclaration> & Modifiers

export const importDeclarationDefinition: DeclarationDefinition<ImportDeclaration> = {
  props: ['moduleSpecifier', 'importClause', 'modifiers']
}


export type ImportClause = {
  name?: string
  isTypeOnly?: boolean
  //namedBindings?: NamedImportBindings // TODO - add declaration
  raw: string
  children?: NamedImports[]
} & DeclarationKind<ts.ImportClause>

export const importClauseDefinition: DeclarationDefinition<ImportClause> = {
  props: ['name', 'isTypeOnly', 'namedBindings']
}


export type NamedImports = {
  elements: ImportSpecifier[]
  raw: string
  children?: ImportSpecifier[]
} & DeclarationKind<ts.NamedImports>

export const namedImportsDefinition: DeclarationDefinition<NamedImports> = {
  props: ['elements']
}


export type ImportSpecifier = {
  name: string
  propertyName?: string,
  isTypeOnly: boolean,
  raw: string
} & DeclarationKind<ts.ImportSpecifier>

export const importSpecifierDefinition: DeclarationDefinition<ImportSpecifier> = {
  props: ['name', 'propertyName', 'isTypeOnly']
}


export type NamespaceImport = {
  name: string,
  raw: string
} & DeclarationKind<ts.NamespaceImport>

export const namespaceImportDefinition: DeclarationDefinition<NamespaceImport> = {
  props: ['name']
}



/*export function isImportDeclaration(result: any): result is ImportDeclaration {
  return 'kind' in result && result.kind === DeclarationKind.IMPORT
}*/
