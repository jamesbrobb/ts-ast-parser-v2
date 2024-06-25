import * as ts from "typescript";
import {getModifierKeywords, getModifiers, Modifiers} from "./modifiers";
import {TypeParameterDeclaration} from "./type";
import {ParameterDeclaration} from "./parameter";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";


export type FunctionDeclaration = {
  name: string
  type?: string
  typeParameters?: TypeParameterDeclaration[]
  parameters: ParameterDeclaration[]
  modifiers?: Modifiers,
  asteriskToken?: boolean
  questionToken?: boolean
  exclamationToken?: boolean
} & DeclarationKind<ts.FunctionDeclaration>;

export const functionDeclarationDefinition: DeclarationDefinition<FunctionDeclaration> = {
  props: [
    'name',
    'type',
    'typeParameters',
    'parameters',
    'modifiers',
    'asteriskToken',
    'questionToken',
    'exclamationToken',
  ],
  propHandlers: {
    modifiers: getModifiers
  }
}


export type ArrowFunction = {
  type?: string
  typeParameters?: TypeParameterDeclaration[]
  parameters: ParameterDeclaration[]
  modifiers?: Modifiers
} & DeclarationKind<ts.ArrowFunction>

export const arrowFunctionDefinition: DeclarationDefinition<ArrowFunction> = {
  props: [
    'type',
    'typeParameters',
    'parameters',
    'modifiers',
    'body'
  ],
  propHandlers: {
    modifiers: getModifierKeywords
  }
}
