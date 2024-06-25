import * as ts from "typescript";
import {getModifiers, Modifiers} from "./modifiers";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";


export type ParameterDeclaration = {
  name: string,
  optional: boolean,
  type?: string,
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
  }
}


/*export function getParametersAsString(parameters: Parameter[], seperator = ', '): string {
  return parameters.map(param => param.signature).join(seperator);
}

function getParameterSignature(name: string, type?: string, optional?: boolean, initializedValue?: string): string {
  return `${name}${optional ? '?' : ''}${type ? ': ' + type : ''}${initializedValue ? ' = ' + initializedValue : ''}`;
}*/
