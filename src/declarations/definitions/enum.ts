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


const enumProps = ["name", "members", "modifiers"] as const


export const enumDeclarationDefinition: DeclarationDefinition<
  EnumDeclaration,
  typeof enumProps
> = {
  props: enumProps,
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


const enumMemProps = ["name", "initializer"] as const;

export const enumMemberDefinition: DeclarationDefinition<
  EnumMember,
  typeof enumMemProps
> = {
  kind: "EnumMember",
  props: enumMemProps
}