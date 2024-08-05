import * as ts from "typescript";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";
import {getModifiers, Modifiers} from "./modifiers";



export type ImportDeclaration = {
  moduleSpecifier: string,
  importClause?: ImportClause,
  modifiers?: Modifiers,
} & DeclarationKind<ts.ImportDeclaration>

const impProps = [
  'moduleSpecifier',
  'importClause',
  'modifiers'
] as const

export const importDeclarationDefinition: DeclarationDefinition<
  ImportDeclaration,
  typeof impProps
> = {
  props: impProps,
  propHandlers: {
    modifiers: getModifiers
  }
}


export type ImportClause = {
  name?: string
  isTypeOnly?: boolean
  namedBindings?: NamespaceImport | NamedImports
} & DeclarationKind<ts.ImportClause>

export const importClauseDefinition: DeclarationDefinition<
  ImportClause,
  ['name', 'isTypeOnly', 'namedBindings']
> = {
  props: ['name', 'isTypeOnly', 'namedBindings']
}


export type NamedImports = {
  elements: ImportSpecifier[]
} & DeclarationKind<ts.NamedImports>

export const namedImportsDefinition: DeclarationDefinition<
  NamedImports,
  ['elements']
> = {
  props: ['elements']
}


export type ImportSpecifier = {
  name: string
  propertyName?: string,
  isTypeOnly: boolean
} & DeclarationKind<ts.ImportSpecifier>

export const importSpecifierDefinition: DeclarationDefinition<
  ImportSpecifier,
  ['name', 'propertyName', 'isTypeOnly']
> = {
  props: ['name', 'propertyName', 'isTypeOnly']
}


export type NamespaceImport = {
  name: string,
} & DeclarationKind<ts.NamespaceImport>

export const namespaceImportDefinition: DeclarationDefinition<NamespaceImport, ['name']> = {
  props: ['name']
}



/*export function isImportDeclaration(result: any): result is ImportDeclaration {
  return 'kind' in result && result.kind === DeclarationKind.IMPORT
}*/
