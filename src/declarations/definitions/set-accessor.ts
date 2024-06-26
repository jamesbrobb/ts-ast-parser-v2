import * as ts from "typescript";
import {getModifiers, Modifiers, setAccess} from "./modifiers";
import {DeclarationKind} from "../declaration-kind.types";
import {ParameterDeclaration} from "./parameter";
import {DeclarationDefinition} from "../declaration-definition.types";
import {TypeParameterDeclaration} from "./type";
import {AccessTypes} from "./common";


export type SetAccessorDeclaration = {
  name: string
  access: AccessTypes
  type?: string
  typeParameters?: TypeParameterDeclaration[]
  parameters: ParameterDeclaration[]
  modifiers?: Modifiers,
  asteriskToken?: boolean
  questionToken?: boolean
  exclamationToken?: boolean
} & DeclarationKind<ts.SetAccessorDeclaration>;


export const setAccessorDeclarationDefinition: DeclarationDefinition<SetAccessorDeclaration> = {
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
  },
  postProcess: [
    setAccess
  ]
}
