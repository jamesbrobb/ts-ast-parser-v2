import * as ts from 'typescript';
import {expectAssignable, expectNotAssignable, expectNotType, expectType} from 'tsd';
import {DeclarationKind, GetDeclarationTSNodeType} from "../declaration-kind.types";


export type TestClassDeclaration = {
  name: string
  typeParameters?: number[]
  heritage?: string[]
  modifiers?: string
  properties?: string[]
  accessors?: string[]
  methods?: string[]
} & DeclarationKind<ts.ClassDeclaration>


export type ExcludeTsNodeProps<N extends ts.Node> = Exclude<keyof N, keyof ts.Node>

// ExcludeTsNodeProps

expectAssignable<ExcludeTsNodeProps<ts.ClassDeclaration>>("modifiers");
expectAssignable<ExcludeTsNodeProps<ts.ClassDeclaration>>("name");
expectAssignable<ExcludeTsNodeProps<ts.ClassDeclaration>>("typeParameters");
expectAssignable<ExcludeTsNodeProps<ts.ClassDeclaration>>("heritageClauses");
expectAssignable<ExcludeTsNodeProps<ts.ClassDeclaration>>("members");
expectAssignable<ExcludeTsNodeProps<ts.ClassDeclaration>>("_declarationBrand");
expectAssignable<ExcludeTsNodeProps<ts.ClassDeclaration>>("_jsdocContainerBrand");
expectAssignable<ExcludeTsNodeProps<ts.ClassDeclaration>>("_statementBrand");
expectNotAssignable<ExcludeTsNodeProps<ts.ClassDeclaration>>("frog");

export type ExcludeTsNodePropsFromDeclaration<
  N extends ts.Node,
  D extends DeclarationKind<N>
> = Exclude<keyof Omit<D, keyof DeclarationKind<N>>, keyof N>

// ExcludeTsNodePropsFromDeclaration

expectAssignable<ExcludeTsNodePropsFromDeclaration<ts.ClassDeclaration, TestClassDeclaration>>("heritage");
expectAssignable<ExcludeTsNodePropsFromDeclaration<ts.ClassDeclaration, TestClassDeclaration>>("properties");
expectAssignable<ExcludeTsNodePropsFromDeclaration<ts.ClassDeclaration, TestClassDeclaration>>("accessors");
expectAssignable<ExcludeTsNodePropsFromDeclaration<ts.ClassDeclaration, TestClassDeclaration>>("methods");
expectNotAssignable<ExcludeTsNodePropsFromDeclaration<ts.ClassDeclaration, TestClassDeclaration>>("cat");

export type NodePropValueParseFunc<
  N extends ts.Node,
  D extends DeclarationKind<N>,
  NK extends ExcludeTsNodeProps<N>,
  DK extends keyof Omit<D, keyof DeclarationKind<N>>
> = (node: N[NK], sourceFile: ts.SourceFile, parser: any) => D[DK]

// NodePropValueParseFunc

expectAssignable<
  NodePropValueParseFunc<
    ts.ClassDeclaration,
    TestClassDeclaration,
    "members",
    "methods"
  >
>((node: ts.NodeArray<ts.ClassElement>, sourceFile: ts.SourceFile, parser: any) => ['test', 'test2']);

expectNotAssignable<
  NodePropValueParseFunc<
    ts.ClassDeclaration,
    TestClassDeclaration,
    "members",
    "methods"
  >
>((node: ts.NodeArray<ts.ClassElement>, sourceFile: ts.SourceFile, parser: any) => [1, 2]);


export type _PropHandlerDefinitionOptions<
  N extends ts.Node,
  D extends DeclarationKind<N>,
  K extends ExcludeTsNodeProps<N>,
  P extends ExcludeTsNodePropsFromDeclaration<N, D> | undefined = undefined
> = {
  parseFn?: P extends undefined ?
    (node: N[K], sourceFile: ts.SourceFile, parser: any) => D[K & keyof D] :
    (node: N[K], sourceFile: ts.SourceFile, parser: any) => D[P & keyof D]
  defaultValue?: P extends undefined ? D[K & keyof D] : D[P & keyof D]
  postProcess?: P extends undefined ?
    (node: N, prop: N[K], dec: D, sourceFile: ts.SourceFile, parser: any) => D[K & keyof D] :
    (node: N, prop: N[K], dec: D, sourceFile: ts.SourceFile, parser: any) => D[P & keyof D]
}

export type PropHandlerDefinition<
  N extends ts.Node,
  D extends DeclarationKind<N>,
  K extends ExcludeTsNodeProps<N>,
  P extends ExcludeTsNodePropsFromDeclaration<N, D> | undefined = undefined
> = K extends keyof D ?
  _PropHandlerDefinitionOptions<N, D, K>:
  _PropHandlerDefinitionOptions<N, D, K, P> & { propName: P extends undefined ? never : P }

// PropHandlerDefinition

expectAssignable<
  PropHandlerDefinition<
    ts.ClassDeclaration,
    TestClassDeclaration,
    'name'
  >
>({});

expectAssignable<
  PropHandlerDefinition<
    ts.ClassDeclaration,
    TestClassDeclaration,
    'typeParameters'
  >
>({
  parseFn: (
    node: ts.NodeArray<ts.TypeParameterDeclaration> | undefined,
    sourceFile: ts.SourceFile,
    parser: any
  ) => [1, 2],
  defaultValue: [7],
  postProcess: (
    node: ts.ClassDeclaration,
    prop: ts.NodeArray<ts.TypeParameterDeclaration> | undefined,
    dec: TestClassDeclaration,
    sourceFile: ts.SourceFile,
    parser: any
  ) => [1, 2]
});

expectNotAssignable<
  PropHandlerDefinition<
    ts.ClassDeclaration,
    TestClassDeclaration,
    'typeParameters'
  >
>({
  propName: 'methods',
  parseFn: (
    node: ts.NodeArray<ts.TypeParameterDeclaration> | undefined,
    sourceFile: ts.SourceFile,
    parser: any
  ) => [1, 2],
  defaultValue: [7],
  postProcess: (
    node: ts.ClassDeclaration,
    prop: ts.NodeArray<ts.TypeParameterDeclaration> | undefined,
    dec: TestClassDeclaration,
    sourceFile: ts.SourceFile,
    parser: any
  ) => [1, 2]
});

expectAssignable<
  PropHandlerDefinition<
    ts.ClassDeclaration,
    TestClassDeclaration,
    'members',
    'methods'
  >
>({
  propName: 'methods',
  parseFn: (node: ts.NodeArray<ts.ClassElement>, sourceFile: ts.SourceFile, parser: any) => ['test', 'test2'],
  defaultValue: ['test'],
  postProcess: (
    node: ts.ClassDeclaration,
    prop: ts.NodeArray<ts.ClassElement>,
    dec: TestClassDeclaration,
    sourceFile: ts.SourceFile,
    parser: any
  ) => ['test', 'test2']
});

expectNotAssignable<
  PropHandlerDefinition<
    ts.ClassDeclaration,
    TestClassDeclaration,
    'members'
  >
>({
  parseFn: (node: ts.NodeArray<ts.ClassElement>, sourceFile: ts.SourceFile, parser: any) => ['test', 'test2'],
  defaultValue: ['test'],
  postProcess: (
    node: ts.ClassDeclaration,
    prop: ts.NodeArray<ts.ClassElement>,
    dec: TestClassDeclaration,
    sourceFile: ts.SourceFile,
    parser: any
  ) => ['test', 'test2']
});


export type PropHandlerEntry<
  N extends ts.Node,
  D extends DeclarationKind<N>,
  K extends ExcludeTsNodeProps<N>,
  P extends ExcludeTsNodePropsFromDeclaration<N, D> | undefined = undefined
> = K extends keyof D ?
  PropHandlerDefinition<N, D, K> | ((node: N[K], sourceFile: ts.SourceFile, parser: any) => D[K & keyof D]) :
  PropHandlerDefinition<N, D, K, P>


// PropHandlerEntry

expectAssignable<
  PropHandlerEntry<
    ts.ClassDeclaration,
    TestClassDeclaration,
    'name'
  >
>({})

expectAssignable<
  PropHandlerEntry<
    ts.ClassDeclaration,
    TestClassDeclaration,
    'name'
  >
>((node: ts.Identifier | undefined, sourceFile: ts.SourceFile, parser: any) => 'test')

expectAssignable<
  PropHandlerEntry<
    ts.ClassDeclaration,
    TestClassDeclaration,
    'name'
  >
>({
  parseFn: (node: ts.Identifier | undefined, sourceFile: ts.SourceFile, parser: any) => 'test',
  defaultValue: 'test',
  postProcess: (node: ts.ClassDeclaration, prop: ts.Identifier | undefined, dec: TestClassDeclaration, sourceFile: ts.SourceFile, parser: any) => 'test'
})

expectNotAssignable<
  PropHandlerEntry<
    ts.ClassDeclaration,
    TestClassDeclaration,
    'name'
  >
>((node: ts.Identifier | undefined, sourceFile: ts.SourceFile, parser: any) => 1234)

expectNotAssignable<
  PropHandlerEntry<
    ts.ClassDeclaration,
    TestClassDeclaration,
    'name'
  >
>({
  propName: 'methods'
})


expectAssignable<
  PropHandlerEntry<
    ts.ClassDeclaration,
    TestClassDeclaration,
    'members',
    'methods'
  >
>({
  propName: 'methods'
});

expectAssignable<
  PropHandlerEntry<
    ts.ClassDeclaration,
    TestClassDeclaration,
    'members',
    'methods'
  >
>({
  propName: 'methods',
  parseFn: (node: ts.NodeArray<ts.ClassElement>, sourceFile: ts.SourceFile, parser: any) => ['test', 'test2'],
});

expectAssignable<
  PropHandlerEntry<
    ts.ClassDeclaration,
    TestClassDeclaration,
    'members',
    'methods'
  >
>({
  propName: 'methods',
  postProcess: (node: ts.ClassDeclaration, prop: ts.NodeArray<ts.ClassElement>, dec: TestClassDeclaration, sourceFile: ts.SourceFile, parser: any) => ['test', 'test2'],
});

expectAssignable<
  PropHandlerEntry<
    ts.ClassDeclaration,
    TestClassDeclaration,
    'members',
    'methods'
  >
>({
  propName: 'methods',
  defaultValue: ['test']
});

expectNotAssignable<
  PropHandlerEntry<
    ts.ClassDeclaration,
    TestClassDeclaration,
    'members'
  >
>((node: ts.NodeArray<ts.ClassElement>, sourceFile: ts.SourceFile, parser: any) => ['test', 'test2']);

expectNotAssignable<
  PropHandlerEntry<
    ts.ClassDeclaration,
    TestClassDeclaration,
    'members'
  >
>({});

expectNotAssignable<
  PropHandlerEntry<
    ts.ClassDeclaration,
    TestClassDeclaration,
    'members'
  >
>({
  propName: 'methods'
});

expectNotType<
  PropHandlerEntry<
    ts.ClassDeclaration,
    TestClassDeclaration,
    'members',
    'methods'
  >
>({
  propName: 'methods'
});

expectType<
  PropHandlerEntry<
    ts.ClassDeclaration,
    TestClassDeclaration,
    'members',
    'methods'
  >
>({
  propName: 'methods',
  parseFn: (node: ts.NodeArray<ts.ClassElement>, sourceFile: ts.SourceFile, parser: any) => ['test', 'test2']
});


export type DeclarationPostProcessFn<
  N extends ts.Node,
  D extends DeclarationKind<N>
> = (dec: D, node: N, sourceFile: ts.SourceFile, parser: any) => void


export type PropHandlers<N extends ts.Node, D extends DeclarationKind<N>> = {
  [K in ExcludeTsNodeProps<N>]?: PropHandlerEntry<N, D, K, ExcludeTsNodePropsFromDeclaration<N, D> | undefined>
}

export type _DeclarationDefinitionInner<N extends ts.Node, D extends DeclarationKind<N>> =
  ([ExcludeTsNodePropsFromDeclaration<N, D>] extends [never] ? {
    propHandlers?: PropHandlers<N, D>
  } : {
    propHandlers: PropHandlers<N, D>
  }) & ({
    __resultType?: D,
    removeKind?: boolean,
    props: ExcludeTsNodeProps<N>[],
    postProcess?: DeclarationPostProcessFn<N, D>[],
    signatureCreationFn?: (dec: D, node: N, sourceFile: ts.SourceFile) => string
  } & DeclarationKind<N>)

export type DeclarationDefinition<
  T extends DeclarationKind<any>
> = _DeclarationDefinitionInner<GetDeclarationTSNodeType<T>, T>


expectAssignable<
  DeclarationDefinition<TestClassDeclaration>
>({
  props: ['name', 'typeParameters', 'heritageClauses', 'modifiers', 'members'],
  propHandlers: {
    name: (node: ts.Identifier | undefined, sourceFile: ts.SourceFile, parser: any) => 'test'
  }
})

expectType<
  DeclarationDefinition<TestClassDeclaration>
>({
  props: ['name', 'typeParameters', 'heritageClauses', 'modifiers', 'members'],
  propHandlers: {
    name: (node: ts.Identifier | undefined, sourceFile: ts.SourceFile, parser: any) => 'test'
  }
})

