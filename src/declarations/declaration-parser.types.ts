import * as ts from 'typescript'
import {DeclarationKind, DeclarationKindMap} from "./declaration-kind.types";
import {SyntaxKindToSyntaxKindValueMap, SyntaxKindToTSNodeDeclarationMap} from "../syntax-kind";
import {DeclarationDefinitionMapEntry} from "./declaration-definition.map.types";
import {Maps} from "../maps";


export type GetDeclarationKind<
  N extends ts.Node,
  T extends SyntaxKindToTSNodeDeclarationMap,
  M extends DeclarationKindMap<T>
> = M[N['kind']] extends DeclarationKind<any> ? M[N['kind']] : never

export type GetDeclarationDefinition<
  N extends ts.Node,
  T extends SyntaxKindToTSNodeDeclarationMap,
  M extends DeclarationKindMap<T>
> = DeclarationDefinitionMapEntry<GetDeclarationKind<N, T, M>>

export type UnregisteredSyntaxKindNode<N extends ts.Node | ts.SyntaxKind> = N extends ts.Node ? {
  raw: string,
  kind: N['kind'],
  type: SyntaxKindToSyntaxKindValueMap[N['kind']]
} : string | boolean;

export type _ParseReturnType2Inner<
  N extends ts.Node,
  T extends DeclarationKind<N>,
  D
> = [T] extends [never] ? D extends undefined ? UnregisteredSyntaxKindNode<N> : D : T

export type ParseReturnType2<
  N extends ts.Node | ts.NodeArray<ts.Node>,
  T extends SyntaxKindToTSNodeDeclarationMap,
  M extends DeclarationKindMap<T>,
  D = undefined
> = N extends ts.Node ?
  _ParseReturnType2Inner<N, GetDeclarationKind<N, T, M>, D> :
  N extends ts.NodeArray<infer NT> ?
    _ParseReturnType2Inner<NT, GetDeclarationKind<NT, T, M>, D>[] : never


export type ParserOptions = { // TODO - add user extendable options
  debug?: boolean
}

export interface Parser<T extends SyntaxKindToTSNodeDeclarationMap, M extends DeclarationKindMap<T>> {
  parse<N extends ts.Node | ts.NodeArray<ts.Node>, D = undefined>(
    node: N,
    defaultValue?: D,
    maps?: Maps,
    options?: ParserOptions
  ): ParseReturnType2<N, T, M, D>
}