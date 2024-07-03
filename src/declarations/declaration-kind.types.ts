import * as ts from "typescript";
import {SyntaxKindToSyntaxKindValueMap, SyntaxKindToTSNodeDeclarationMap} from "../syntax-kind";
import {Parser} from "./declaration-parser";
import {Maps} from "../maps";


export type DeclarationKind<N extends ts.Node> = {
  __nodeType?: N
  kind?: SyntaxKindToSyntaxKindValueMap[N['kind']]
  signature?: string
}

export type GetDeclarationTSNodeType<T extends DeclarationKind<any>> = T extends DeclarationKind<infer N> ? N : never

export type _DeclarationParseFnInner<N extends ts.Node, R extends DeclarationKind<any>> = (node: N, sourceFile: ts.SourceFile, parser: Parser<any, any>, maps?: Maps) => R
export type DeclarationParseFn<T extends DeclarationKind<any>> = _DeclarationParseFnInner<GetDeclarationTSNodeType<T>, T>


export type DeclarationKindMap<M extends SyntaxKindToTSNodeDeclarationMap> = {
  [K in keyof SyntaxKindToTSNodeDeclarationMap]?: M[K] extends ts.Node ? DeclarationKind<M[K]> : never
}