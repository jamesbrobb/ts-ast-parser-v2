// ts playground code https://tsplay.dev/mxpQbm

import * as ts from "typescript";
import {EnumToMappedType} from "../utils";


export type SyntaxKinds = `${ts.SyntaxKind}` extends `${infer T extends number}` ? T : never;
export type SyntaxKindKeys = keyof typeof ts.SyntaxKind;

export type SyntaxKindToSyntaxKindValueMap = EnumToMappedType<typeof ts.SyntaxKind>

export type SyntaxKindToTSNodeDeclarationMap = {
  [K in keyof SyntaxKindToSyntaxKindValueMap]?: {kind: K} & ts.Node
}

export type DefaultSyntaxKindToTSNodeDeclarationMap = {
  [ts.SyntaxKind.ImportDeclaration]: ts.ImportDeclaration
  [ts.SyntaxKind.ImportClause]: ts.ImportClause
  [ts.SyntaxKind.NamespaceImport]: ts.NamespaceImport
  [ts.SyntaxKind.NamedImports]: ts.NamedImports
  [ts.SyntaxKind.ImportSpecifier]: ts.ImportSpecifier
  [ts.SyntaxKind.ClassDeclaration]: ts.ClassDeclaration
  [ts.SyntaxKind.InterfaceDeclaration]: ts.InterfaceDeclaration
  [ts.SyntaxKind.Decorator]: ts.Decorator
  [ts.SyntaxKind.TypeParameter]: ts.TypeParameterDeclaration
  [ts.SyntaxKind.TypeReference]: ts.TypeReferenceNode
  [ts.SyntaxKind.ExpressionWithTypeArguments]: ts.ExpressionWithTypeArguments
  [ts.SyntaxKind.TypeAliasDeclaration]: ts.TypeAliasDeclaration
  [ts.SyntaxKind.TypeLiteral]: ts.TypeLiteralNode
  [ts.SyntaxKind.UnionType]: ts.UnionTypeNode
  [ts.SyntaxKind.LiteralType]: ts.LiteralTypeNode
  [ts.SyntaxKind.IndexedAccessType]: ts.IndexedAccessTypeNode
  [ts.SyntaxKind.FunctionType]: ts.FunctionTypeNode
  [ts.SyntaxKind.HeritageClause]: ts.HeritageClause
  [ts.SyntaxKind.Constructor]: ts.ConstructorDeclaration
  [ts.SyntaxKind.PropertyDeclaration]: ts.PropertyDeclaration
  [ts.SyntaxKind.PropertySignature]: ts.PropertySignature
  [ts.SyntaxKind.PropertyAccessExpression]: ts.PropertyAccessExpression
  [ts.SyntaxKind.MethodDeclaration]: ts.MethodDeclaration
  [ts.SyntaxKind.GetAccessor]: ts.GetAccessorDeclaration
  [ts.SyntaxKind.SetAccessor]: ts.SetAccessorDeclaration
  [ts.SyntaxKind.TupleType]: ts.TupleTypeNode
  [ts.SyntaxKind.NamedTupleMember]: ts.NamedTupleMember
  [ts.SyntaxKind.EnumDeclaration]: ts.EnumDeclaration
  [ts.SyntaxKind.EnumMember]: ts.EnumMember
  [ts.SyntaxKind.VariableDeclaration]: ts.VariableDeclaration
  [ts.SyntaxKind.Parameter]: ts.ParameterDeclaration
  [ts.SyntaxKind.CallExpression]: ts.CallExpression
  [ts.SyntaxKind.NewExpression]: ts.NewExpression
  [ts.SyntaxKind.BinaryExpression]: ts.BinaryExpression
  [ts.SyntaxKind.FunctionDeclaration]: ts.FunctionDeclaration
  [ts.SyntaxKind.ArrowFunction]: ts.ArrowFunction
  [ts.SyntaxKind.ObjectLiteralExpression]: ts.ObjectLiteralExpression
  [ts.SyntaxKind.ArrayLiteralExpression]: ts.ArrayLiteralExpression
  [ts.SyntaxKind.ArrayType]: ts.ArrayTypeNode
  [ts.SyntaxKind.Identifier]: ts.Identifier
}
