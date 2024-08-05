import * as ts from "typescript";
import {ParameterDeclaration} from "./parameter";
import {getModifiers, Modifiers} from "./modifiers";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";


export type ConstructorDeclaration = {
  parameters: ParameterDeclaration[],
  modifiers?: Modifiers
} & DeclarationKind<ts.ConstructorDeclaration>


const props = ['parameters', 'modifiers'] as const;


export const constructorDeclarationDefinition: DeclarationDefinition<
  ConstructorDeclaration,
  typeof props
> = {
  props,
  propHandlers: {
    modifiers: getModifiers
  }
}
