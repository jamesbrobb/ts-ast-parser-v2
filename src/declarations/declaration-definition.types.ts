import * as ts from "typescript";

import {
  DeclarationKind,
  DeclarationKindMap,
  DeclarationParseFn,
  GetDeclarationTSNodeType
} from "./declaration-kind.types";
import {SyntaxKindToTSNodeDeclarationMap} from "../syntax-kind";


export type NodePropValueParseFunc<N extends ts.Node, K extends keyof N> = (node: N[K] | undefined, sourceFile: ts.SourceFile, parser: any) => any

export type PropHandlerDefinition<N extends ts.Node, K extends keyof N> = {
  parseFn?: NodePropValueParseFunc<N, K>,
  propName?: string,
  defaultValue?: string
}

export type PropHandlerEntry<N extends ts.Node, K extends keyof N> = PropHandlerDefinition<N, K> | NodePropValueParseFunc<N, K>

export type _DeclarationDefinitionInner<N extends ts.Node, R extends DeclarationKind<any>> = {
  __resultType?: R,
  removeKind?: boolean,
  props: Exclude<keyof N, keyof ts.Node>[],
  propHandlers?: {
    [key in Exclude<keyof N, keyof ts.Node>]?: PropHandlerEntry<N, key>
  },
  hasModifiers?: boolean,
  postProcess?: Function[]
} & DeclarationKind<N>

export type DeclarationDefinition<T extends DeclarationKind<any>> = _DeclarationDefinitionInner<GetDeclarationTSNodeType<T>, T>

export type DeclarationDefinitionMapEntry<T extends DeclarationKind<any>> = DeclarationDefinition<T> | DeclarationParseFn<T>

export type DeclarationDefinitionMap<T extends SyntaxKindToTSNodeDeclarationMap, M extends DeclarationKindMap<T>> = {
  [K in keyof M]: M[K] extends DeclarationKind<any> ? DeclarationDefinitionMapEntry<M[K]> : never
}