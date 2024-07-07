import * as ts from "typescript";
import {
  ArrayTypeNode, ArrowFunction, BinaryExpression, CallExpression,
  ClassDeclaration,
  ConstructorDeclaration,
  Decorator, EnumDeclaration, EnumMember,
  ExpressionWithTypeArguments, FunctionDeclaration,
  FunctionTypeNode, GetAccessorDeclaration,
  HeritageClause,
  ImportClause,
  ImportDeclaration,
  ImportSpecifier,
  IndexedAccessTypeNode,
  InterfaceDeclaration,
  LiteralTypeNode, MethodDeclaration,
  NamedImports, NamedTupleMember,
  NamespaceImport, NewExpression, ParameterDeclaration, PropertyAccessExpression,
  PropertyDeclaration, PropertySignature, SetAccessorDeclaration, TupleTypeNode,
  TypeAliasDeclaration,
  TypeLiteral,
  TypeParameterDeclaration,
  TypeReferenceNode,
  UnionTypeNode, VariableDeclaration
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
  [ts.SyntaxKind.UnionType]: UnionTypeNode
  [ts.SyntaxKind.IndexedAccessType]: IndexedAccessTypeNode
  [ts.SyntaxKind.FunctionType]: FunctionTypeNode
  [ts.SyntaxKind.ArrayType]: ArrayTypeNode
  [ts.SyntaxKind.LiteralType]: LiteralTypeNode
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
  [ts.SyntaxKind.NewExpression]: NewExpression
  [ts.SyntaxKind.BinaryExpression]: BinaryExpression
  [ts.SyntaxKind.FunctionDeclaration]: FunctionDeclaration
  [ts.SyntaxKind.ArrowFunction]: ArrowFunction
  [ts.SyntaxKind.ObjectLiteralExpression]: DeclarationKind<ts.ObjectLiteralExpression> & Record<PropertyKey, any>
  [ts.SyntaxKind.ArrayLiteralExpression]: DeclarationKind<ts.ArrayLiteralExpression> & any[],
  [ts.SyntaxKind.Identifier]: DeclarationKind<ts.Identifier> & string
}
