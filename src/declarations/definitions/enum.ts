import * as ts from "typescript";
import {DeclarationDefinition} from "../declaration-definition.types";
import {DeclarationKind} from "../declaration-kind.types";
import {getModifiers, Modifiers} from "./modifiers";


export type EnumDeclaration = {
  name: string
  members: string[]
  modifiers: Modifiers
} & DeclarationKind<ts.EnumDeclaration>


export const enumDeclarationDefinition: DeclarationDefinition<EnumDeclaration> = {
  props: ["name", "members", "modifiers"],
  propHandlers: {
    modifiers: getModifiers
  }
}


export type EnumMember = {
  name: string,
  initializer?: string,
} & DeclarationKind<ts.EnumMember>


export const enumMemberDefinition: DeclarationDefinition<EnumMember> = {
  kind: "EnumMember",
  props: ["name", "initializer"]
}