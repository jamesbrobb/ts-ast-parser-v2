import * as ts from "typescript";

import {DeclarationKind, GetDeclarationTSNodeType} from "./declaration-kind.types";
import {SyntaxKindToTSNodeDeclarationMap} from "../syntax-kind";
import {Parser} from "./declaration-parser";
import {Maps} from "../maps";
import {ExcludePrivateProps} from "../utils";


/**
 * @overview
 * @description
 * This file contains the types to declare a declaration kind definition.
 ```ts
type definition<N extends ts.Node, D extends DeclarationKind<N>> = {
    // Whether to remove the kind from the declaration
    // This is inverted as the default/majority case is to add the kind
    removeKind?: boolean,
    // An array containing the property names of the node properties to be parsed
    // This is restricted to properties that:
    // - are unique to the node - i.e. not part of the ts.Node interface
    // - do not start with an underscore - i.e. private properties
    // - are unique values - i.e. a property name can only be declared once
    props: [],
    // A key/value map of property names used to define custom handling/parsing for node properties
    // - optional if all properties declared in 'props' have a matching named key in the declaration kind
    // - required if any property declared in 'props' does not have a matching named key in the declaration kind
    propHandlers?: {
      // The name of the node property
      // - optional for any property that has a matching named key in the declaration kind
      // - required for any property that does not have a matching named key in the declaration kind
      propertyName?: {
        // The name of the declaration kind property to assign the parsed value to
        propName?: string,
        // An optional function to parse the node property value
        // This function is used to parse the value of the node property
        // If supplied, Parser.parse is not called for the node property
        // The 'node' argument type is the type of the node property
        // The return type is either:
        // - if a value is not assigned to 'propName', the type of DeclarationKind[propertyName]
        // - if a value is assigned to 'propName', the type of DeclarationKind[propName]
        parseFn?: (node: N['propertyName'], sourceFile: ts.SourceFile, parser: Parser<any, any>, maps?: Maps) => D['propertyName'] || D['propName'],
        // A default value for the property
        // The type is either:
        // - if a value is not assigned to 'propName', the type of DeclarationKind[propertyName]
        // - if a value is assigned to 'propName', the type of DeclarationKind[propName]
        defaultValue?: D['propertyName'] || D['propName'],
        // An array of functions that post-process the parsed value
        postProcess?: (node: N, prop: N['propertyName'], dec: D, sourceFile: ts.SourceFile, parser: Parser<any, any>, maps?: Maps) => D
      },
      // Or a function to parse the node property value
      propertyName? : (node: N['propertyName'], sourceFile: ts.SourceFile, parser: Parser<any, any>, maps?: Maps) => D['propertyName'] || D['propName']
    },
    postProcess?: DeclarationPostProcessFn<N, D>[],
    signatureCreationFn?: (dec: D, node: N, sourceFile: ts.SourceFile) => string
 }
```
 */

export type ExcludeTsNodeProps<N extends ts.Node> = Exclude<keyof N, keyof ts.Node>

export type GetReadOnlyNodePropsArray<N extends ts.Node> = ReadonlyArray<ExcludeTsNodeProps<ExcludePrivateProps<N>>>

export type OmitBaseDeclarationKindProps<D extends DeclarationKind<any>> = Omit<D, keyof DeclarationKind<any>>

export type ExcludeTsNodePropsFromDeclaration<
  N extends ts.Node,
  D extends DeclarationKind<N>
> = Exclude<keyof OmitBaseDeclarationKindProps<D>, keyof N>

export type GetOverlappingKeys<
  N extends ts.Node,
  D extends DeclarationKind<N>,
  Props extends GetReadOnlyNodePropsArray<N>
> = Extract<Props[number], keyof OmitBaseDeclarationKindProps<D>>

export type GetDistinctKeys<
  N extends ts.Node,
  D extends DeclarationKind<N>,
  Props extends GetReadOnlyNodePropsArray<N>
> = Exclude<Props[number], keyof OmitBaseDeclarationKindProps<D>>

export type _PropHandlerDefinitionOptions<
  N extends ts.Node,
  D extends DeclarationKind<N>,
  K extends ExcludeTsNodeProps<N>,
  P extends ExcludeTsNodePropsFromDeclaration<N, D> | undefined = undefined
> = {
  parseFn?: P extends undefined ?
    (node: N[K], sourceFile: ts.SourceFile, parser: Parser<any, any>, maps?: Maps) => D[K & keyof D] :
    (node: N[K], sourceFile: ts.SourceFile, parser: Parser<any, any>, maps?: Maps) => D[P & keyof D]
  defaultValue?: P extends undefined ? D[K & keyof D] : D[P & keyof D]
  postProcess?: P extends undefined ?
    (node: N, prop: N[K], dec: D, sourceFile: ts.SourceFile, parser: Parser<any, any>, maps?: Maps) => D[K & keyof D] :
    (node: N, prop: N[K], dec: D, sourceFile: ts.SourceFile, parser: Parser<any, any>, maps?: Maps) => D[P & keyof D]
}

export type PropHandlerDefinition<
  N extends ts.Node,
  D extends DeclarationKind<N>,
  K extends ExcludeTsNodeProps<N>,
  P extends ExcludeTsNodePropsFromDeclaration<N, D> | undefined = undefined
> = K extends keyof D ?
  _PropHandlerDefinitionOptions<N, D, K>:
  _PropHandlerDefinitionOptions<N, D, K, P> & { propName: P extends undefined ? never : P }

export type PropHandlerEntry<
  N extends ts.Node,
  D extends DeclarationKind<N>,
  K extends ExcludeTsNodeProps<N>,
  P extends ExcludeTsNodePropsFromDeclaration<N, D> | undefined = undefined
> = K extends keyof D ?
  PropHandlerDefinition<N, D, K> | ((node: N[K], sourceFile: ts.SourceFile, parser: Parser<any, any>, maps?: Maps) => D[K & keyof D]) :
  PropHandlerDefinition<N, D, K, P>

export type PropHandlers<
  N extends ts.Node,
  D extends DeclarationKind<N>,
  Props extends GetReadOnlyNodePropsArray<N>
> = {
  [K in GetOverlappingKeys<N, D, Props>]?: PropHandlerEntry<N, D, K, ExcludeTsNodePropsFromDeclaration<N, D> | undefined>
} & {
  [K in GetDistinctKeys<N, D, Props>]: PropHandlerEntry<N, D, K, ExcludeTsNodePropsFromDeclaration<N, D>>
}

export type DeclarationPostProcessFn<
  N extends ts.Node,
  D extends DeclarationKind<N>
> = (dec: D, node: N, sourceFile: ts.SourceFile, parser: Parser<any, any>, maps?: Maps) => void

export type _DeclarationDefinitionInner<
  N extends ts.Node,
  D extends DeclarationKind<N>,
  Props extends GetReadOnlyNodePropsArray<N>
> =
  ([Exclude<Props[number], keyof D>] extends [never] ? {
    propHandlers?: PropHandlers<N, D, Props>
  } : {
    propHandlers: PropHandlers<N, D, Props>
  }) & {
    readonly __resultType?: D,
    readonly removeKind?: boolean,
    readonly props: Props,
    postProcess?: DeclarationPostProcessFn<N, D>[],
    signatureCreationFn?: (dec: D, node: N, sourceFile: ts.SourceFile) => string
  } & DeclarationKind<N>

export type DeclarationDefinition<
  T extends DeclarationKind<any>,
  Props extends GetReadOnlyNodePropsArray<GetDeclarationTSNodeType<T>>
> = _DeclarationDefinitionInner<GetDeclarationTSNodeType<T>, T, Props>
