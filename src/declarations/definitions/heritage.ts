import * as ts from "typescript";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";


export type HeritageClauseType = 'extends' | 'implements';


export type HeritageClause = {
  token: HeritageClauseType,
  types: string[]
} & DeclarationKind<ts.HeritageClause>

const props = ['token', 'types'] as const;

export const heritageClauseDefinition: DeclarationDefinition<
  HeritageClause,
  typeof props
> = {
  props
}


export function getHeritageClausesByType(type: HeritageClauseType, clauses: HeritageClause[]): string[][] {

  return clauses.filter(clause => clause.token === type)
    .map(clause => clause.types);
}
