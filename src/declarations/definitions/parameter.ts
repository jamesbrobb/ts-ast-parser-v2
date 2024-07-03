import * as ts from "typescript";
import {getModifiers, Modifiers} from "./modifiers";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";
import {isTypeReferenceNode, TypeReferenceNode} from "./type";
import {Expression} from "./expressions";
import {convertExpressionToString} from "../../utils";


export type ParameterDeclaration = {
  name: string,
  optional: boolean,
  type?: string | TypeReferenceNode,
  initializer?: Expression,
  modifiers?: Modifiers,
  dotDotDotToken?: boolean
} & DeclarationKind<ts.ParameterDeclaration>;


export const parameterDeclarationDefinition: DeclarationDefinition<ParameterDeclaration> = {
  props: [
    'name',
    'questionToken',
    'type',
    'initializer',
    'modifiers',
    'dotDotDotToken'
  ],
  propHandlers: {
    questionToken: { propName: 'optional'},
    modifiers: getModifiers
  },
  signatureCreationFn: createParameterSignature
}


export function createParameterSignature(dec: ParameterDeclaration): string {

  let type: string | undefined;

  if (isTypeReferenceNode(dec.type)) {
    type = dec.type.signature;
  }else {
    type = dec.type;
  }

  let initializer: string | undefined = '';

  if (dec.initializer) {
    initializer = convertExpressionToString(dec.initializer);
  }

  if(type === 'string' && initializer) {
    initializer = `'${initializer}'`;
  }

  return `${dec.name}${dec.optional ? '?' : ''}${type ? ': ' + type : ''}${initializer ? ' = ' + initializer : ''}`;
}

export function getParametersAsString(parameters: ParameterDeclaration[], seperator = ', '): string {
  return parameters.map(param => param.signature).join(seperator);
}
