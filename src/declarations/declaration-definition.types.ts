import * as ts from "typescript";

import {
  DeclarationKind,
  DeclarationKindMap,
  DeclarationParseFn,
  GetDeclarationTSNodeType
} from "./declaration-kind.types";
import {SyntaxKindToTSNodeDeclarationMap} from "../syntax-kind";
import {Parser} from "./declaration-parser";
import {Maps} from "../maps";


export type NodePropValueParseFunc<
  N extends ts.Node,
  K extends keyof N
> = (node: N[K] | undefined, sourceFile: ts.SourceFile, parser: Parser<any, any>, maps?: Maps) => any

export type PropHandlerPostProcessFn<
  N extends ts.Node,
  K extends keyof N,
  D extends DeclarationKind<N>
> = (node: N, prop: N[K], dec: D, sourceFile: ts.SourceFile, parser: Parser<any, any>, maps?: Maps) => any

export type PropHandlerDefinition<
  N extends ts.Node,
  K extends keyof N,
  D extends DeclarationKind<N>
> = {
  parseFn?: NodePropValueParseFunc<N, K>
  propName?: string
  defaultValue?: string
  postProcess?: PropHandlerPostProcessFn<N, K, D>[]
}

export type PropHandlerEntry<
  N extends ts.Node,
  K extends keyof N,
  R extends DeclarationKind<N>
> = PropHandlerDefinition<N, K, R> | NodePropValueParseFunc<N, K>

export type DeclarationPostProcessFn<
  N extends ts.Node,
  D extends DeclarationKind<N>
> = (dec: D, node: N, sourceFile: ts.SourceFile, parser: Parser<any, any>, maps?: Maps) => void

export type _DeclarationDefinitionInner<N extends ts.Node, R extends DeclarationKind<N>> = {
  __resultType?: R,
  removeKind?: boolean,
  props: Exclude<keyof N, keyof ts.Node>[],
  propHandlers?: {
    [K in Exclude<keyof N, keyof ts.Node>]?: PropHandlerEntry<N, K, R>
  },
  hasModifiers?: boolean,
  postProcess?: DeclarationPostProcessFn<N, R>[]
} & DeclarationKind<N>

export type DeclarationDefinition<
  T extends DeclarationKind<any>
> = _DeclarationDefinitionInner<GetDeclarationTSNodeType<T>, T>

export type DeclarationDefinitionMapEntry<
  T extends DeclarationKind<any>
> = DeclarationDefinition<T> | DeclarationParseFn<T>

export type DeclarationDefinitionMap<
  T extends SyntaxKindToTSNodeDeclarationMap,
  M extends DeclarationKindMap<T>
> = {
  [K in keyof M]: M[K] extends DeclarationKind<any> ? DeclarationDefinitionMapEntry<M[K]> : never
}