import * as ts from "typescript";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";
import {getModifiers, Modifiers} from "./modifiers";
import {TypeParameterDeclaration} from "./type";
import {ParameterDeclaration} from "./parameter";


export type GetAccessorDeclaration = {
  name: string
  type?: string
  typeParameters?: TypeParameterDeclaration[]
  parameters: ParameterDeclaration[]
  modifiers?: Modifiers,
  asteriskToken?: boolean
  questionToken?: boolean
  exclamationToken?: boolean
} & DeclarationKind<ts.GetAccessorDeclaration>;


export const getAccessorDeclarationDefinition: DeclarationDefinition<GetAccessorDeclaration> = {
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
