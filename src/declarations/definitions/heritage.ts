import * as ts from "typescript";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";


export type HeritageClauseType = 'extends' | 'implements';


export type HeritageClause = {
  token: HeritageClauseType,
  types: string[]
} & DeclarationKind<ts.HeritageClause>


export const heritageClauseDefinition: DeclarationDefinition<HeritageClause> = {
  props: ['token', 'types']
}


export function getHeritageClausesByType(type: HeritageClauseType, clauses: HeritageClause[]): string[][] {

  return clauses.filter(clause => clause.token === type)
    .map(clause => clause.types);
}
