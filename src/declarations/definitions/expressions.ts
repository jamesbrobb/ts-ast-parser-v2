import * as ts from "typescript";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";


export type Expression = CallExpression | PropertyAccessExpression | NewExpression


export type CallExpression = {
  expression: Expression | string,
  questionDotToken?: string,
  typeArguments?: string,
  arguments: Expression[],
} & DeclarationKind<ts.CallExpression>


export const callExpressionDefinition: DeclarationDefinition<CallExpression> = {
  removeKind: true,
  props: ['expression', 'questionDotToken', 'typeArguments', 'arguments']
}


export type PropertyAccessExpression = {
  name: string,
  expression: string,
  optional: boolean
} & DeclarationKind<ts.PropertyAccessExpression>

export const propertyAccessExpressionDefinition: DeclarationDefinition<PropertyAccessExpression> = {
  removeKind: true,
  props: ['name', 'expression', 'questionDotToken'],
  propHandlers: {
    questionDotToken: { propName: 'optional' }
  }
}


export type NewExpression = {
  expression: string,
  typeArguments?: string,
  arguments?: string,
} & DeclarationKind<ts.NewExpression>

export const newExpressionDefinition: DeclarationDefinition<NewExpression> = {
  removeKind: true,
  props: ['expression', 'typeArguments', 'arguments']
}


export type BinaryExpression = {
  left: string,
  right: string,
} & DeclarationKind<ts.BinaryExpression>

export const binaryExpressionDefinition: DeclarationDefinition<BinaryExpression> = {
  removeKind: true,
  props: ['left', 'right']
}
