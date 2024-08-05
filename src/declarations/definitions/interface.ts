import * as ts from "typescript";
import {getModifiers, Modifiers} from "./modifiers";
import {TypeParameterDeclaration} from "./type";
import {HeritageClause} from "./heritage";
import {ClassElement} from "typescript";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";


export type InterfaceDeclaration = {
  name: string
  typeParameters?: TypeParameterDeclaration[]
  heritage?: HeritageClause[]
  modifiers?: Modifiers
  members: ClassElement[]
} & DeclarationKind<ts.InterfaceDeclaration>

const props = [
  'name',
  'typeParameters',
  'members',
  'heritageClauses',
  'modifiers'
] as const;

export const interfaceDeclarationDefinition: DeclarationDefinition<
  InterfaceDeclaration,
  typeof props
> = {
  props,
  propHandlers: {
    modifiers: getModifiers,
    heritageClauses: {
      propName: 'heritage'
    }
  }
}
