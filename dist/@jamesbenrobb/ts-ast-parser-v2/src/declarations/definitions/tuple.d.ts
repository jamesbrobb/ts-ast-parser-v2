import { DeclarationKind } from "../declaration-kind.types";
import * as ts from "typescript";
import { DeclarationDefinition } from "../declaration-definition.types";
export type TupleTypeNode = {
    elements: string;
} & DeclarationKind<ts.TupleTypeNode>;
export declare const tupleTypeNodeDefinition: DeclarationDefinition<TupleTypeNode>;
export type NamedTupleMember = {
    name: string;
    type: string;
    rest: boolean;
    optional: boolean;
} & DeclarationKind<ts.NamedTupleMember>;
export declare const namedTupleMemberDefinition: DeclarationDefinition<NamedTupleMember>;
