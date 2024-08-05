import * as ts from "typescript";
import {getModifierKeywords, getModifiers, ModifierKeywords, Modifiers, setAccess} from "./modifiers";
import {TypeParameterDeclaration} from "./type";
import {ParameterDeclaration} from "./parameter";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";
import {AccessTypes} from "./common";


export type FunctionDeclaration = {
  name: string
  access: AccessTypes
  type?: string
  typeParameters?: TypeParameterDeclaration[]
  parameters: ParameterDeclaration[]
  modifiers?: Modifiers,
  asteriskToken?: boolean
  questionToken?: boolean
  exclamationToken?: boolean
} & DeclarationKind<ts.FunctionDeclaration>

const funcProps = [
  'name',
  'type',
  'typeParameters',
  'parameters',
  'modifiers',
  'asteriskToken',
  'questionToken',
  'exclamationToken',
] as const

export const functionDeclarationDefinition: DeclarationDefinition<
  FunctionDeclaration,
  typeof funcProps
> = {
  props: funcProps,
  propHandlers: {
    modifiers: getModifiers
  },
  postProcess: [
    setAccess
  ]
}


export type ArrowFunction = {
  type?: string
  typeParameters?: TypeParameterDeclaration[]
  parameters: ParameterDeclaration[]
  modifiers?: ModifierKeywords[]
} & DeclarationKind<ts.ArrowFunction>

const arrowFuncProps = [
  'type',
  'typeParameters',
  'parameters',
  'modifiers',
] as const

export const arrowFunctionDefinition: DeclarationDefinition<
  ArrowFunction,
  typeof arrowFuncProps
> = {
  props: arrowFuncProps,
  propHandlers: {
    modifiers: getModifierKeywords
  }
}
