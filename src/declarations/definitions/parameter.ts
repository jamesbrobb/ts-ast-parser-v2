import * as ts from "typescript";
import {Modifiers} from "./modifiers";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";


export type ParameterDeclaration = {
  name: string,
  optional: boolean,
  signature: string
  type?: string,
  initializer?: string,
  //dotDotDotToken?: DotDotDotToken // TODO
  raw: string
} & DeclarationKind<ts.ParameterDeclaration> & Modifiers;


export const parameterDeclarationDefinition: DeclarationDefinition<ParameterDeclaration> = {
  props: ['name', 'questionToken', 'type', 'initializer', 'modifiers'],
  propHandlers: {
    questionToken: {
      propName: 'optional',
      parseFn: (value: ts.QuestionToken) => !!value
    }
  }
}


/*export function getParametersAsString(parameters: Parameter[], seperator = ', '): string {
  return parameters.map(param => param.signature).join(seperator);
}

function getParameterSignature(name: string, type?: string, optional?: boolean, initializedValue?: string): string {
  return `${name}${optional ? '?' : ''}${type ? ': ' + type : ''}${initializedValue ? ' = ' + initializedValue : ''}`;
}*/
