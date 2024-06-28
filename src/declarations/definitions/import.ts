import * as ts from "typescript";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";
import {getModifiers, Modifiers} from "./modifiers";



export type ImportDeclaration = {
  moduleSpecifier: string,
  importClause?: ImportClause,
  modifiers?: Modifiers,
} & DeclarationKind<ts.ImportDeclaration>

export const importDeclarationDefinition: DeclarationDefinition<ImportDeclaration> = {
  props: ['moduleSpecifier', 'importClause', 'modifiers', 'attributes'],
  propHandlers: {
    modifiers: getModifiers
  }
}


export type ImportClause = {
  name?: string
  isTypeOnly?: boolean
  namedBindings?: NamespaceImport | NamedImports
} & DeclarationKind<ts.ImportClause>

export const importClauseDefinition: DeclarationDefinition<ImportClause> = {
  props: ['name', 'isTypeOnly', 'namedBindings']
}


export type NamedImports = {
  elements: ImportSpecifier[]
} & DeclarationKind<ts.NamedImports>

export const namedImportsDefinition: DeclarationDefinition<NamedImports> = {
  props: ['elements']
}


export type ImportSpecifier = {
  name: string
  propertyName?: string,
  isTypeOnly: boolean
} & DeclarationKind<ts.ImportSpecifier>

export const importSpecifierDefinition: DeclarationDefinition<ImportSpecifier> = {
  props: ['name', 'propertyName', 'isTypeOnly']
}


export type NamespaceImport = {
  name: string,
} & DeclarationKind<ts.NamespaceImport>

export const namespaceImportDefinition: DeclarationDefinition<NamespaceImport> = {
  props: ['name']
}



/*export function isImportDeclaration(result: any): result is ImportDeclaration {
  return 'kind' in result && result.kind === DeclarationKind.IMPORT
}*/
