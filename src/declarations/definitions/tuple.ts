import {DeclarationKind} from "../declaration-kind.types";
import * as ts from "typescript";
import {DeclarationDefinition} from "../declaration-definition.types";


export type TupleTypeNode = {
  elements: string
} & DeclarationKind<ts.TupleTypeNode>

export const tupleTypeNodeDefinition: DeclarationDefinition<TupleTypeNode, ["elements"]> = {
  props: ["elements"]
}


export type NamedTupleMember = {
  name: string,
  type: string,
  rest: boolean,
  optional: boolean
} & DeclarationKind<ts.NamedTupleMember>

const props = [
  "name", "type", "dotDotDotToken", "questionToken"
] as const;

export const namedTupleMemberDefinition: DeclarationDefinition<
  NamedTupleMember,
  typeof props
> = {
  props,
  propHandlers: {
    dotDotDotToken: { propName: 'rest' },
    questionToken: { propName: 'optional' }
  }
}