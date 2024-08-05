import * as ts from 'typescript';
import {expectAssignable, expectNotAssignable, expectNotType, expectType} from 'tsd';
import {DeclarationKind} from "../declaration-kind.types";

import {
  DeclarationDefinition,
  ExcludeTsNodeProps,
  ExcludeTsNodePropsFromDeclaration, GetDistinctKeys, GetOverlappingKeys,
  OmitBaseDeclarationKindProps, PropHandlerDefinition, PropHandlerEntry, PropHandlers
} from "../declaration-definition.types";


export type TestClassDeclaration = {
  name: string
  typeParameters?: number[]
  heritage?: string[]
  modifiers?: string
  properties?: string[]
  accessors?: string[]
  methods?: string[]
} & DeclarationKind<ts.ClassDeclaration>


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


// OmitBaseDeclarationKindProps

expectAssignable<OmitBaseDeclarationKindProps<TestClassDeclaration>>({
  name: 'test',
  typeParameters: [1, 2],
  heritage: ['test'],
  modifiers: 'test',
  properties: ['test'],
  accessors: ['test'],
  methods: ['test']
});

expectNotAssignable<OmitBaseDeclarationKindProps<TestClassDeclaration>>({
  name: 'test',
  __nodeType: undefined
});

expectNotAssignable<OmitBaseDeclarationKindProps<TestClassDeclaration>>({
  name: 'test',
  kind: undefined
});

expectNotAssignable<OmitBaseDeclarationKindProps<TestClassDeclaration>>({
  name: 'test',
  signature: undefined
});

expectNotAssignable<OmitBaseDeclarationKindProps<TestClassDeclaration>>({
  name: 'test',
  raw: undefined
});


// ExcludeTsNodePropsFromDeclaration

expectAssignable<ExcludeTsNodePropsFromDeclaration<ts.ClassDeclaration, TestClassDeclaration>>("heritage");
expectAssignable<ExcludeTsNodePropsFromDeclaration<ts.ClassDeclaration, TestClassDeclaration>>("properties");
expectAssignable<ExcludeTsNodePropsFromDeclaration<ts.ClassDeclaration, TestClassDeclaration>>("accessors");
expectAssignable<ExcludeTsNodePropsFromDeclaration<ts.ClassDeclaration, TestClassDeclaration>>("methods");
expectNotAssignable<ExcludeTsNodePropsFromDeclaration<ts.ClassDeclaration, TestClassDeclaration>>("cat");


// GetOverlappingKeys

const oKeys = ['name', 'typeParameters', 'modifiers'] as const;

expectAssignable<GetOverlappingKeys<ts.ClassDeclaration, TestClassDeclaration, typeof oKeys>>("name");
expectAssignable<GetOverlappingKeys<ts.ClassDeclaration, TestClassDeclaration, typeof oKeys>>("typeParameters");
expectAssignable<GetOverlappingKeys<ts.ClassDeclaration, TestClassDeclaration, typeof oKeys>>("modifiers");
expectNotAssignable<GetOverlappingKeys<ts.ClassDeclaration, TestClassDeclaration, typeof oKeys>>("heritageClauses");
expectNotAssignable<GetOverlappingKeys<ts.ClassDeclaration, TestClassDeclaration, typeof oKeys>>("members");
expectNotAssignable<GetOverlappingKeys<ts.ClassDeclaration, TestClassDeclaration, typeof oKeys>>("frog");


// GetDistinctKeys

const dKeys = ['heritageClauses', 'members'] as const;

expectAssignable<GetDistinctKeys<ts.ClassDeclaration, TestClassDeclaration, typeof dKeys>>("members");
expectAssignable<GetDistinctKeys<ts.ClassDeclaration, TestClassDeclaration, typeof dKeys>>("heritageClauses");
expectNotAssignable<GetDistinctKeys<ts.ClassDeclaration, TestClassDeclaration, typeof dKeys>>("name");
expectNotAssignable<GetDistinctKeys<ts.ClassDeclaration, TestClassDeclaration, typeof dKeys>>("typeParameters");
expectNotAssignable<GetDistinctKeys<ts.ClassDeclaration, TestClassDeclaration, typeof dKeys>>("modifiers");
expectNotAssignable<GetDistinctKeys<ts.ClassDeclaration, TestClassDeclaration, typeof dKeys>>("frog");


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


// PropHandlers

const props = ['name', 'typeParameters', 'heritageClauses', 'modifiers', 'members'] as const;

expectAssignable<
  PropHandlers<ts.ClassDeclaration, TestClassDeclaration, typeof props>
>({
  name: {
    defaultValue: 'name'
  },
  modifiers: (node: ts.NodeArray<ts.ModifierLike>  | undefined, sourceFile: ts.SourceFile, parser: any) => 'test',
  typeParameters: {
    parseFn: (node: ts.NodeArray<ts.TypeParameterDeclaration> | undefined, sourceFile: ts.SourceFile, parser: any) => [1, 2]
  },
  heritageClauses: {
    propName: 'heritage'
  },
  members: {
    propName: 'methods',
    parseFn: (node: ts.NodeArray<ts.ClassElement>, sourceFile: ts.SourceFile, parser: any) => ['test', 'test2']
  },
});


expectAssignable<
  PropHandlers<ts.ClassDeclaration, TestClassDeclaration, typeof props>
>({
  heritageClauses: {
    propName: 'heritage'
  },
  members: {
    propName: 'methods',
    parseFn: (node: ts.NodeArray<ts.ClassElement>, sourceFile: ts.SourceFile, parser: any) => ['test', 'test2']
  },
});

expectNotAssignable<
  PropHandlers<ts.ClassDeclaration, TestClassDeclaration, typeof props>
>({});

expectNotAssignable<
  PropHandlers<ts.ClassDeclaration, TestClassDeclaration, typeof props>
>({
  name: {
    propName: 'heritage'
  }
});


// DeclarationDefinition

expectAssignable<
  DeclarationDefinition<TestClassDeclaration, typeof props>
>({
  props: ['name', 'typeParameters', 'heritageClauses', 'modifiers', 'members'],
  propHandlers: {
    name: (node: ts.Identifier | undefined, sourceFile: ts.SourceFile, parser: any) => 'test',
    members: {
      propName: 'methods'
    },
    heritageClauses: {
      propName: 'heritage'
    }
  }
})

expectNotAssignable<
  DeclarationDefinition<TestClassDeclaration, typeof props>
>({
  props: ['name', 'typeParameters', 'heritageClauses', 'modifiers', 'members'],
  propHandlers: {
    name: (node: ts.Identifier | undefined, sourceFile: ts.SourceFile, parser: any) => 'test',
    members: {
      parseFn: (node: ts.NodeArray<ts.ClassElement>, sourceFile: ts.SourceFile, parser: any) => ['test', 'test2']
    }
  }
});

expectType<
  DeclarationDefinition<TestClassDeclaration, typeof props>
>({
  props: ['name', 'typeParameters', 'heritageClauses', 'modifiers', 'members'],
  propHandlers: {
    name: (node: ts.Identifier | undefined, sourceFile: ts.SourceFile, parser: any) => 'test',
    heritageClauses: {
      propName: 'heritage'
    },
    members: {
      propName: 'methods',
      parseFn: (node: ts.NodeArray<ts.ClassElement>, sourceFile: ts.SourceFile, parser: any) => ['test', 'test2']
    }
  }
})

