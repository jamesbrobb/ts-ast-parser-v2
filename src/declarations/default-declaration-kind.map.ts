import * as ts from "typescript";
import * as defs from "./definitions";
import {DeclarationKind} from "./declaration-kind.types";


export type DefaultDeclarationKindMap = {
  [ts.SyntaxKind.ImportDeclaration]: defs.ImportDeclaration
  [ts.SyntaxKind.ImportClause]: defs.ImportClause
  [ts.SyntaxKind.NamespaceImport]: defs.NamespaceImport
  [ts.SyntaxKind.NamedImports]: defs.NamedImports
  [ts.SyntaxKind.ImportSpecifier]: defs.ImportSpecifier
  [ts.SyntaxKind.ClassDeclaration]: defs.ClassDeclaration
  [ts.SyntaxKind.InterfaceDeclaration]: defs.InterfaceDeclaration
  [ts.SyntaxKind.Decorator]: defs.Decorator
  [ts.SyntaxKind.TypeParameter]: defs.TypeParameterDeclaration
  [ts.SyntaxKind.TypeReference]: defs.TypeReferenceNode
  [ts.SyntaxKind.ExpressionWithTypeArguments]: defs.ExpressionWithTypeArguments
  [ts.SyntaxKind.TypeAliasDeclaration]: defs.TypeAliasDeclaration
  [ts.SyntaxKind.TypeLiteral]: defs.TypeLiteral
  [ts.SyntaxKind.UnionType]: defs.UnionTypeNode
  [ts.SyntaxKind.IndexedAccessType]: defs.IndexedAccessTypeNode
  [ts.SyntaxKind.FunctionType]: defs.FunctionTypeNode
  [ts.SyntaxKind.ArrayType]: defs.ArrayTypeNode
  [ts.SyntaxKind.LiteralType]: defs.LiteralTypeNode
  [ts.SyntaxKind.HeritageClause]: defs.HeritageClause
  [ts.SyntaxKind.Constructor]: defs.ConstructorDeclaration
  [ts.SyntaxKind.PropertyDeclaration]: defs.PropertyDeclaration
  [ts.SyntaxKind.PropertySignature]: defs.PropertySignature
  [ts.SyntaxKind.PropertyAccessExpression]: defs.PropertyAccessExpression
  [ts.SyntaxKind.MethodDeclaration]: defs.MethodDeclaration
  [ts.SyntaxKind.GetAccessor]: defs.GetAccessorDeclaration
  [ts.SyntaxKind.SetAccessor]: defs.SetAccessorDeclaration
  [ts.SyntaxKind.TupleType]: defs.TupleTypeNode
  [ts.SyntaxKind.NamedTupleMember]: defs.NamedTupleMember
  [ts.SyntaxKind.EnumDeclaration]: defs.EnumDeclaration
  [ts.SyntaxKind.EnumMember]: defs.EnumMember
  [ts.SyntaxKind.VariableDeclaration]: defs.VariableDeclaration
  [ts.SyntaxKind.Parameter]: defs.ParameterDeclaration
  [ts.SyntaxKind.CallExpression]: defs.CallExpression
  [ts.SyntaxKind.NewExpression]: defs.NewExpression
  [ts.SyntaxKind.BinaryExpression]: defs.BinaryExpression
  [ts.SyntaxKind.FunctionDeclaration]: defs.FunctionDeclaration
  [ts.SyntaxKind.ArrowFunction]: defs.ArrowFunction
  [ts.SyntaxKind.ObjectLiteralExpression]: DeclarationKind<ts.ObjectLiteralExpression> & Record<PropertyKey, any>
  [ts.SyntaxKind.ArrayLiteralExpression]: DeclarationKind<ts.ArrayLiteralExpression> & any[],
  [ts.SyntaxKind.Identifier]: DeclarationKind<ts.Identifier> & string
}
