import {DeclarationKind} from "../declaration-kind.types";
import * as ts from "typescript";
import {DeclarationDefinition} from "../declaration-definition.types";


export type TupleTypeNode = {
  elements: string
} & DeclarationKind<ts.TupleTypeNode>

export const tupleTypeNodeDefinition: DeclarationDefinition<TupleTypeNode> = {
  props: ["elements"]
}


export type NamedTupleMember = {
  name: string,
  type: string,
  rest: boolean,
  optional: boolean
} & DeclarationKind<ts.NamedTupleMember>

export const namedTupleMemberDefinition: DeclarationDefinition<NamedTupleMember> = {
  props: ["name", "type", "dotDotDotToken", "questionToken"],
  propHandlers: {
    dotDotDotToken: { propName: 'rest' },
    questionToken: { propName: 'optional' }
  }
}