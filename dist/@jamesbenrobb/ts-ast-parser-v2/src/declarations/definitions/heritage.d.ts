import * as ts from "typescript";
import { DeclarationKind } from "../declaration-kind.types";
import { DeclarationDefinition } from "../declaration-definition.types";
export type HeritageClauseType = 'extends' | 'implements';
export type HeritageClause = {
    token: HeritageClauseType;
    types: string[];
} & DeclarationKind<ts.HeritageClause>;
export declare const heritageClauseDefinition: DeclarationDefinition<HeritageClause>;
export declare function getHeritageClausesByType(type: HeritageClauseType, clauses: HeritageClause[]): string[][];
