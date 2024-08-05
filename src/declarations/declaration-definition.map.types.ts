import {
  DeclarationKind,
  DeclarationKindMap,
  DeclarationParseFn,
  GetDeclarationTSNodeType
} from "./declaration-kind.types";
import {SyntaxKindToTSNodeDeclarationMap} from "../syntax-kind";
import {DeclarationDefinition, GetReadOnlyNodePropsArray,} from "./declaration-definition.types";


export type DeclarationDefinitionMapEntry<
  T extends DeclarationKind<any>
> = DeclarationDefinition<T, GetReadOnlyNodePropsArray<GetDeclarationTSNodeType<T>>> | DeclarationParseFn<T>

export type DeclarationDefinitionMap<
  T extends SyntaxKindToTSNodeDeclarationMap,
  M extends DeclarationKindMap<T>
> = {
  [K in keyof M]: M[K] extends DeclarationKind<any> ? DeclarationDefinitionMapEntry<M[K]> : never
}
