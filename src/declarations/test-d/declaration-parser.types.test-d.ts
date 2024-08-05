import * as ts from "typescript";
import {DeclarationKind, DeclarationKindMap} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";
import {DeclarationDefinitionMap} from "../declaration-definition.map.types";
import {DefaultSyntaxKindToTSNodeDeclarationMap} from "../../syntax-kind";
import {expectAssignable, expectNotAssignable, expectNotType, expectType} from "tsd";
import {
  _ParseReturnType2Inner,
  GetDeclarationDefinition,
  GetDeclarationKind, ParseReturnType2,
  UnregisteredSyntaxKindNode
} from "../declaration-parser.types";
import {ExtendsType} from "../../utils";


type TestClassDeclaration = {
  // in ts.ClassDeclaration
  name: string
  typeParameters?: string[]
  modifiers?: string

  // not in ts.ClassDeclaration
  heritage?: string[]
  properties?: string[]
  accessors?: string[]
  methods?: string[]
} & DeclarationKind<ts.ClassDeclaration>

/* only in ts.ClassDeclaration
members
heritageClauses
*/


type TestEnumDeclaration = {
  name: string
  members: string[]
  modifiers?: string,
} & DeclarationKind<ts.EnumDeclaration>


type TestTypeAliasDeclaration = {
  name: string
  modifiers?: string
  typeParameters?: string[]
  type: string
} & DeclarationKind<ts.TypeAliasDeclaration>


const classDeclarationDefinition2: DeclarationDefinition<TestClassDeclaration, ['members', "heritageClauses", "typeParameters", "name", "modifiers"]> = {
  props: ['members', "heritageClauses", "typeParameters", "name", "modifiers"],
  propHandlers: {
    typeParameters: {
      defaultValue: ['one']
    },
    members: {
      propName: 'methods',
      parseFn: (node: ts.ClassDeclaration['members'], sourceFile: ts.SourceFile, parser: any) => {
        return ['true', 'false']
      }
    },
    name: (node: ts.ClassDeclaration['name'], sourceFile: ts.SourceFile, parser: any) => {
      return 'test'
    },
    heritageClauses: {
      propName: 'heritage'
    }
  }
}


const enumDeclarationDefinition2: DeclarationDefinition<TestEnumDeclaration, ["name", "members", "modifiers"]> = {
  kind: "EnumDeclaration",
  props: ["name", "members", "modifiers"]
}


const typeAliasDeclaration2: DeclarationDefinition<TestTypeAliasDeclaration, ["name", "modifiers"]> = {
  kind: "TypeAliasDeclaration",
  props: ["name", "modifiers"]
}


type TestDeclarationKindMap = ExtendsType<DeclarationKindMap<DefaultSyntaxKindToTSNodeDeclarationMap>, {
  [ts.SyntaxKind.ClassDeclaration]: TestClassDeclaration,
  [ts.SyntaxKind.EnumDeclaration]: TestEnumDeclaration
  [ts.SyntaxKind.TypeAliasDeclaration]: TestTypeAliasDeclaration
}>


const declarationMap2: DeclarationDefinitionMap<DefaultSyntaxKindToTSNodeDeclarationMap, TestDeclarationKindMap> = {
  [ts.SyntaxKind.ClassDeclaration]: classDeclarationDefinition2,
  [ts.SyntaxKind.EnumDeclaration]: enumDeclarationDefinition2,
  [ts.SyntaxKind.TypeAliasDeclaration]: typeAliasDeclaration2
}


/////////////////////////////////////////////////////////////////////////////////////////////////

type EqualsWrapped<T> = T extends infer R & {} ?
  { [P in keyof R]: R[P] }
  : never

export type Equals<A, B> =
  (<T>() => T extends EqualsWrapped<A> ? 1 : 2) extends
    (<T>() => T extends EqualsWrapped<B> ? 1 : 2)
    ? true
    : false

/////////////////////////////////////////////////////////////////////////////////////////////////


// GetDeclarationKind

expectAssignable<
  Equals<
    GetDeclarationKind<ts.ClassDeclaration, DefaultSyntaxKindToTSNodeDeclarationMap, TestDeclarationKindMap>,
    TestClassDeclaration
  >
>(true)


expectAssignable<
  Equals<
    GetDeclarationKind<ts.ClassDeclaration, DefaultSyntaxKindToTSNodeDeclarationMap, TestDeclarationKindMap>,
    TestEnumDeclaration
  >
>(false)


// GetDeclarationDefinition

expectAssignable<
  Equals<
    GetDeclarationDefinition<ts.ClassDeclaration, DefaultSyntaxKindToTSNodeDeclarationMap, TestDeclarationKindMap>,
    DeclarationDefinition<TestClassDeclaration, ['members', "heritageClauses", "typeParameters", "name", "modifiers"]>
  >
>(true);


// UnregisteredSyntaxKindNode

expectType<
  UnregisteredSyntaxKindNode<ts.ClassDeclaration>
>({
  kind: ts.SyntaxKind.ClassDeclaration,
  type: "ClassDeclaration",
  raw: ''
});

expectNotType<
  UnregisteredSyntaxKindNode<ts.ClassDeclaration>
>({
  raw: 'string',
  kind: ts.SyntaxKind.EnumDeclaration,
  type: "EnumDeclaration"
});

expectType<
  Equals<
    UnregisteredSyntaxKindNode<ts.ClassDeclaration>,
    string | boolean
  >
>(false);

expectType<
  Equals<
    UnregisteredSyntaxKindNode<ts.SyntaxKind.ClassDeclaration>,
    string | boolean
  >
>(true);


// ParseReturnType2 + _ParseReturnType2Inner

expectType<
  Equals<
    _ParseReturnType2Inner<ts.ClassDeclaration, TestClassDeclaration, undefined>,
    TestClassDeclaration
  >
>(true)

expectType<
  Equals<
    _ParseReturnType2Inner<ts.ClassDeclaration, never, undefined>,
    TestClassDeclaration
  >
>(false)

expectType<
  Equals<
    _ParseReturnType2Inner<ts.ClassDeclaration, never, undefined>,
    UnregisteredSyntaxKindNode<ts.ClassDeclaration>
  >
>(true)

expectType<
  Equals<
    _ParseReturnType2Inner<ts.ClassDeclaration, never, 'test'>,
    'test'
  >
>(true)


expectType<
  Equals<
    ParseReturnType2<
      ts.ClassDeclaration,
      DefaultSyntaxKindToTSNodeDeclarationMap,
      TestDeclarationKindMap
    >,
    TestClassDeclaration
  >
>(true)

expectNotType<
  Equals<
    ParseReturnType2<
      ts.ClassDeclaration,
      DefaultSyntaxKindToTSNodeDeclarationMap,
      TestDeclarationKindMap
    >,
    TestClassDeclaration
  >
>(false)

expectType<
  Equals<
    ParseReturnType2<
      ts.NodeArray<ts.ClassDeclaration>,
      DefaultSyntaxKindToTSNodeDeclarationMap,
      TestDeclarationKindMap
    >,
    TestClassDeclaration[]
  >
>(true)

expectType<
  Equals<
    ParseReturnType2<
      ts.ClassDeclaration,
      DefaultSyntaxKindToTSNodeDeclarationMap,
      TestDeclarationKindMap
    >,
    TestEnumDeclaration
  >
>(false)


expectType<
  Equals<
    ParseReturnType2<
      ts.FunctionDeclaration,
      DefaultSyntaxKindToTSNodeDeclarationMap,
      TestDeclarationKindMap
    >,
    TestClassDeclaration
  >
>(false)

expectType<
  Equals<
    ParseReturnType2<
      ts.FunctionDeclaration,
      DefaultSyntaxKindToTSNodeDeclarationMap,
      TestDeclarationKindMap
    >,
    UnregisteredSyntaxKindNode<ts.FunctionDeclaration>
  >
>(true)

expectType<
  Equals<
    ParseReturnType2<
      ts.NodeArray<ts.FunctionDeclaration>,
      DefaultSyntaxKindToTSNodeDeclarationMap,
      TestDeclarationKindMap
    >,
    UnregisteredSyntaxKindNode<ts.FunctionDeclaration>[]
  >
>(true)

expectType<
  Equals<
    ParseReturnType2<
      ts.FunctionDeclaration,
      DefaultSyntaxKindToTSNodeDeclarationMap,
      TestDeclarationKindMap,
      'test'
    >,
    'test'
  >
>(true)

expectType<
  Equals<
    ParseReturnType2<
      ts.NodeArray<ts.FunctionDeclaration>,
      DefaultSyntaxKindToTSNodeDeclarationMap,
      TestDeclarationKindMap,
      'test'
    >,
    'test'[]
  >
>(true)

expectType<
  Equals<
    ParseReturnType2<
      ts.FunctionDeclaration,
      DefaultSyntaxKindToTSNodeDeclarationMap,
      TestDeclarationKindMap,
      'test'
    >,
    UnregisteredSyntaxKindNode<ts.FunctionDeclaration>
  >
>(false)