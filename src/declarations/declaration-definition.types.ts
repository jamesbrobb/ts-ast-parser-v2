import * as ts from "typescript";

import {DeclarationKind, GetDeclarationTSNodeType} from "./declaration-kind.types";
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
  propName?: string //Exclude<keyof Omit<D, keyof DeclarationKind<N>>, keyof N>
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
  postProcess?: DeclarationPostProcessFn<N, R>[],
  signatureCreationFn?: (dec: R, node: N, sourceFile: ts.SourceFile) => string
} & DeclarationKind<N>

export type DeclarationDefinition<
  T extends DeclarationKind<any>
> = _DeclarationDefinitionInner<GetDeclarationTSNodeType<T>, T>
