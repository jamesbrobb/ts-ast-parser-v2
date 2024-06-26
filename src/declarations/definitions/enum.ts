import * as ts from "typescript";
import {DeclarationDefinition} from "../declaration-definition.types";
import {DeclarationKind} from "../declaration-kind.types";
import {getModifiers, Modifiers, setAccess} from "./modifiers";
import {AccessTypes} from "./common";


export type EnumDeclaration = {
  name: string
  access: AccessTypes
  members: string[]
  modifiers?: Modifiers,
} & DeclarationKind<ts.EnumDeclaration>


export const enumDeclarationDefinition: DeclarationDefinition<EnumDeclaration> = {
  props: ["name", "members", "modifiers"],
  propHandlers: {
    modifiers: getModifiers
  },
  postProcess: [
    setAccess
  ]
}


export type EnumMember = {
  name: string,
  initializer?: string,
} & DeclarationKind<ts.EnumMember>


export const enumMemberDefinition: DeclarationDefinition<EnumMember> = {
  kind: "EnumMember",
  props: ["name", "initializer"]
}