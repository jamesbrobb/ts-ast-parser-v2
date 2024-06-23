import * as ts from "typescript";
import {DeclarationDefinition} from "../declaration-definition.types";
import {DeclarationKind} from "../declaration-kind.types";
import {Modifiers} from "./modifiers";


export type EnumDeclaration = {
  name: string
  members: string[]
} & DeclarationKind<ts.EnumDeclaration> & Modifiers


export const enumDeclarationDefinition: DeclarationDefinition<EnumDeclaration> = {
  kind: "EnumDeclaration",
  props: ["name", "members", "modifiers"]
}


export type EnumMember = {
  name: string,
  initializer?: string,
} & DeclarationKind<ts.EnumMember>


export const enumMemberDefinition: DeclarationDefinition<EnumMember> = {
  kind: "EnumMember",
  props: ["name", "initializer"]
}