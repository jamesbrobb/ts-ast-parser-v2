import * as ts from "typescript";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";
import {TypeNode} from "./type";



export type Expression = CallExpression | PropertyAccessExpression | NewExpression


export type CallExpression = {
  expression: Expression | string
  questionDotToken?: string
  typeArguments?: TypeNode[]
  arguments: Expression[]
} & DeclarationKind<ts.CallExpression>


export const callExpressionDefinition: DeclarationDefinition<CallExpression> = {
  removeKind: true,
  props: ['expression', 'questionDotToken', 'typeArguments', 'arguments'],
  signatureCreationFn: (dec: CallExpression) => {
    const args = dec.arguments.map(arg => arg.signature).join(', '),
      typeArgs = dec.typeArguments && dec.typeArguments.length ? `<${dec.typeArguments.map(arg => arg.signature).join(', ')}>` : '';

    return `${typeof dec.expression === 'string' ? dec.expression : dec.expression.signature}${typeArgs}(${args})`;
  }
}


export type PropertyAccessExpression = {
  name: string
  expression: string
  optional?: boolean
} & DeclarationKind<ts.PropertyAccessExpression>

export const propertyAccessExpressionDefinition: DeclarationDefinition<PropertyAccessExpression> = {
  removeKind: true,
  props: ['name', 'expression', 'questionDotToken'],
  propHandlers: {
    questionDotToken: { propName: 'optional' }
  },
  signatureCreationFn: (dec: PropertyAccessExpression) => {
    return `${dec.expression}.${dec.name}`;
  }
}


export type NewExpression = {
  expression: string
  typeArguments?: TypeNode[]
  arguments?: Expression[]
} & DeclarationKind<ts.NewExpression>

export const newExpressionDefinition: DeclarationDefinition<NewExpression> = {
  removeKind: true,
  props: ['expression', 'typeArguments', 'arguments'],
  signatureCreationFn: (dec: NewExpression) => {
    return `new ${dec.expression}(${dec.arguments ? dec.arguments.map(arg => arg.signature).join(', ') : ''})`;
  }
}


export type BinaryExpression = {
  left: Expression
  right: Expression
} & DeclarationKind<ts.BinaryExpression>

export const binaryExpressionDefinition: DeclarationDefinition<BinaryExpression> = {
  removeKind: true,
  props: ['left', 'right'],
   signatureCreationFn: (dec: BinaryExpression) => {
     return `${dec.left.signature} | ${dec.right.signature}`;
   }
}
