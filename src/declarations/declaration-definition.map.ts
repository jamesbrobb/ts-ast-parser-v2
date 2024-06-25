import * as ts from "typescript";

import {DefaultSyntaxKindToTSNodeDeclarationMap} from "../syntax-kind";
import {DeclarationDefinitionMap} from "./declaration-definition.types";
import {
  CallExpression,
  ConstructorDeclaration,
  Decorator,
  EnumMember,
  ExpressionWithTypeArguments,
  FunctionDeclaration,
  GetAccessorDeclaration,
  HeritageClause,
  ImportClause,
  ImportDeclaration,
  ImportSpecifier,
  InterfaceDeclaration,
  MethodDeclaration,
  NamedImports,
  NamespaceImport,
  ParameterDeclaration,
  PropertyDeclaration,
  PropertySignature,
  SetAccessorDeclaration,
  TupleTypeNode,
  NamedTupleMember,
  TypeLiteral,
  TypeParameterDeclaration,
  TypeReferenceNode,
  VariableDeclaration,
  ClassDeclaration,
  EnumDeclaration,
  TypeAliasDeclaration,
  enumMemberDefinition,
  variableDeclarationDefinition,
  importDeclarationDefinition,
  importClauseDefinition,
  namespaceImportDefinition,
  namedImportsDefinition,
  importSpecifierDefinition,
  interfaceDeclarationDefinition,
  typeParameterDeclarationDefinition,
  typeReferenceDefinition,
  expressionWithTypeArgumentsDefinition,
  typeLiteralDefinition,
  heritageClauseDefinition,
  constructorDeclarationDefinition,
  propertyDeclarationDefinition,
  propertySignatureDefinition,
  methodDeclarationDefinition,
  getAccessorDeclarationDefinition,
  setAccessorDeclarationDefinition,
  parameterDeclarationDefinition,
  callExpressionDefinition,
  functionDeclarationDefinition,
  classDeclarationDefinition,
  typeAliasDeclarationDefinition,
  enumDeclarationDefinition,
  tupleTypeNodeDefinition,
  namedTupleMemberDefinition,
  parseArrayLiteral,
  parseString,
  parseObjectLiteral,
  IndexedAccessTypeNode,
  indexedAccessTypeNodeDefinition,
  ArrayTypeNode,
  arrayTypeNodeDefinition,
  PropertyAccessExpression, propertyAccessExpressionDefinition, decoratorDefinition
} from "./definitions";
import {DeclarationKind} from "./declaration-kind.types";


export type DefaultDeclarationKindMap = {
  [ts.SyntaxKind.ImportDeclaration]: ImportDeclaration
  [ts.SyntaxKind.ImportClause]: ImportClause
  [ts.SyntaxKind.NamespaceImport]: NamespaceImport
  [ts.SyntaxKind.NamedImports]: NamedImports
  [ts.SyntaxKind.ImportSpecifier]: ImportSpecifier
  [ts.SyntaxKind.ClassDeclaration]: ClassDeclaration
  [ts.SyntaxKind.InterfaceDeclaration]: InterfaceDeclaration
  [ts.SyntaxKind.Decorator]: Decorator
  [ts.SyntaxKind.TypeParameter]: TypeParameterDeclaration
  [ts.SyntaxKind.TypeReference]: TypeReferenceNode
  [ts.SyntaxKind.ExpressionWithTypeArguments]: ExpressionWithTypeArguments
  [ts.SyntaxKind.TypeAliasDeclaration]: TypeAliasDeclaration
  [ts.SyntaxKind.TypeLiteral]: TypeLiteral
  [ts.SyntaxKind.IndexedAccessType]: IndexedAccessTypeNode
  [ts.SyntaxKind.ArrayType]: ArrayTypeNode
  [ts.SyntaxKind.HeritageClause]: HeritageClause
  [ts.SyntaxKind.Constructor]: ConstructorDeclaration
  [ts.SyntaxKind.PropertyDeclaration]: PropertyDeclaration
  [ts.SyntaxKind.PropertySignature]: PropertySignature
  [ts.SyntaxKind.PropertyAccessExpression]: PropertyAccessExpression
  [ts.SyntaxKind.MethodDeclaration]: MethodDeclaration
  [ts.SyntaxKind.GetAccessor]: GetAccessorDeclaration
  [ts.SyntaxKind.SetAccessor]: SetAccessorDeclaration
  [ts.SyntaxKind.TupleType]: TupleTypeNode
  [ts.SyntaxKind.NamedTupleMember]: NamedTupleMember
  [ts.SyntaxKind.EnumDeclaration]: EnumDeclaration
  [ts.SyntaxKind.EnumMember]: EnumMember
  [ts.SyntaxKind.VariableDeclaration]: VariableDeclaration
  [ts.SyntaxKind.Parameter]: ParameterDeclaration
  [ts.SyntaxKind.CallExpression]: CallExpression
  [ts.SyntaxKind.FunctionDeclaration]: FunctionDeclaration
  [ts.SyntaxKind.ObjectLiteralExpression]: DeclarationKind<ts.ObjectLiteralExpression> & Record<PropertyKey, any>
  [ts.SyntaxKind.ArrayLiteralExpression]: DeclarationKind<ts.ArrayLiteralExpression> & any[],
  [ts.SyntaxKind.Identifier]: DeclarationKind<ts.Identifier> & string
}

export type DefaultDeclarationDefinitionMap = DeclarationDefinitionMap<
  DefaultSyntaxKindToTSNodeDeclarationMap, DefaultDeclarationKindMap
>

export const defaultDeclarationDefinitionMap: DefaultDeclarationDefinitionMap = {
  [ts.SyntaxKind.ImportDeclaration]: importDeclarationDefinition,
  [ts.SyntaxKind.ImportClause]: importClauseDefinition,
  [ts.SyntaxKind.NamespaceImport]: namespaceImportDefinition,
  [ts.SyntaxKind.NamedImports]: namedImportsDefinition,
  [ts.SyntaxKind.ImportSpecifier]: importSpecifierDefinition,
  [ts.SyntaxKind.ClassDeclaration]: classDeclarationDefinition,
  [ts.SyntaxKind.InterfaceDeclaration]: interfaceDeclarationDefinition,
  [ts.SyntaxKind.Decorator]: decoratorDefinition,
  [ts.SyntaxKind.TypeParameter]: typeParameterDeclarationDefinition,
  [ts.SyntaxKind.TypeReference]: typeReferenceDefinition,
  [ts.SyntaxKind.ExpressionWithTypeArguments]: expressionWithTypeArgumentsDefinition,
  [ts.SyntaxKind.TypeAliasDeclaration]: typeAliasDeclarationDefinition,
  [ts.SyntaxKind.TypeLiteral]: typeLiteralDefinition,
  [ts.SyntaxKind.IndexedAccessType]: indexedAccessTypeNodeDefinition,
  [ts.SyntaxKind.ArrayType]: arrayTypeNodeDefinition,
  [ts.SyntaxKind.HeritageClause]: heritageClauseDefinition,
  [ts.SyntaxKind.Constructor]: constructorDeclarationDefinition,
  [ts.SyntaxKind.PropertyDeclaration]: propertyDeclarationDefinition,
  [ts.SyntaxKind.PropertySignature]: propertySignatureDefinition,
  [ts.SyntaxKind.PropertyAccessExpression]: propertyAccessExpressionDefinition,
  [ts.SyntaxKind.MethodDeclaration]: methodDeclarationDefinition,
  [ts.SyntaxKind.GetAccessor]: getAccessorDeclarationDefinition,
  [ts.SyntaxKind.SetAccessor]: setAccessorDeclarationDefinition,
  [ts.SyntaxKind.EnumDeclaration]: enumDeclarationDefinition,
  [ts.SyntaxKind.EnumMember]: enumMemberDefinition,
  [ts.SyntaxKind.VariableDeclaration]: variableDeclarationDefinition,
  [ts.SyntaxKind.Parameter]: parameterDeclarationDefinition,
  [ts.SyntaxKind.CallExpression]: callExpressionDefinition,
  [ts.SyntaxKind.FunctionDeclaration]: functionDeclarationDefinition,
  [ts.SyntaxKind.TupleType]: tupleTypeNodeDefinition,
  [ts.SyntaxKind.NamedTupleMember]: namedTupleMemberDefinition,
  [ts.SyntaxKind.Identifier]: parseString,
  [ts.SyntaxKind.ObjectLiteralExpression]: parseObjectLiteral,
  [ts.SyntaxKind.ArrayLiteralExpression]: parseArrayLiteral
}