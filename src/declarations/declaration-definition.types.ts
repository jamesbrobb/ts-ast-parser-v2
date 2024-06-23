import * as ts from "typescript";

import {
  DeclarationKind,
  DeclarationKindMap,
  DeclarationParseFn,
  GetDeclarationTSNodeType
} from "./declaration-kind.types";
import {SyntaxKindToTSNodeDeclarationMap} from "../syntax-kind";


export type NodePropValueParseFunc<N extends ts.Node, K extends keyof N> = (node: N[K], sourceFile: ts.SourceFile, parser: any) => any

export type PropHandlerDefinition<N extends ts.Node, K extends keyof N> = {
  parseFn?: NodePropValueParseFunc<N, K>,
  propName?: string,
  defaultValue?: string
}

export type _DeclarationDefinitionInner<N extends ts.Node, R extends DeclarationKind<any>> = {
  __resultType?: R,
  props: Exclude<keyof N, keyof ts.Node>[],
  propHandlers?: {
    [key in Exclude<keyof N, keyof ts.Node>]?: PropHandlerDefinition<N, key> | NodePropValueParseFunc<N, key>
  },
  hasModifiers?: boolean,
  postProcess?: Function[]
} & DeclarationKind<N>

export type DeclarationDefinition<T extends DeclarationKind<any>> = _DeclarationDefinitionInner<GetDeclarationTSNodeType<T>, T>

export type DeclarationDefinitionMap<T extends SyntaxKindToTSNodeDeclarationMap, M extends DeclarationKindMap<T>> = {
  [K in keyof M]: M[K] extends DeclarationKind<any> ? DeclarationDefinition<M[K]> | DeclarationParseFn<M[K]> : never
}