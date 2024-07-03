import * as ts from "typescript";
import {getModifiers, Modifiers} from "./modifiers";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";
import {isTypeReferenceNode, TypeReferenceNode} from "./type";


export type ParameterDeclaration = {
  name: string,
  optional: boolean,
  type?: string | TypeReferenceNode,
  initializer?: string,
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

  return `${dec.name}${dec.optional ? '?' : ''}${type ? ': ' + type : ''}${dec.initializer ? ' = ' + dec.initializer : ''}`;
}

export function getParametersAsString(parameters: ParameterDeclaration[], seperator = ', '): string {
  return parameters.map(param => param.signature).join(seperator);
}
