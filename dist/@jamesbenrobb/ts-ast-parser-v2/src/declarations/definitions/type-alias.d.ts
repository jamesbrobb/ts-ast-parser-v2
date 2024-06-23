import * as ts from "typescript";
import { DeclarationKind } from "../declaration-kind.types";
import { DeclarationDefinition } from "../declaration-definition.types";
export type TypeAliasDeclaration = {} & DeclarationKind<ts.TypeAliasDeclaration>;
export declare const typeAliasDeclarationDefinition: DeclarationDefinition<TypeAliasDeclaration>;
