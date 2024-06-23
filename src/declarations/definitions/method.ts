import * as ts from "typescript";
import {ParameterDeclaration} from "./parameter";
import {Modifiers} from "./modifiers";
import {TypeParameterDeclaration} from "./type";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";


export type MethodDeclaration = {
  name: string,
  parameters: ParameterDeclaration[],
  type?: string,
  typeParameters?: TypeParameterDeclaration[]
} & DeclarationKind<ts.MethodDeclaration> & Modifiers;


export const methodDeclarationDefinition: DeclarationDefinition<MethodDeclaration> = {
  props: ['name', 'parameters', 'type', 'typeParameters', 'modifiers']
}


/*export function getPublicMethodSignatures(methods: MethodDeclaration[]): string[] {
  return methods
    .filter(mthd => isPublic(mthd.name, mthd))
    .map(mthd => mthd.signature);
}*/


/*function getMethodSignature(name: string, parameters: Parameter[], modifiers?: Modifiers, type: string = 'void'): string {

  const params = getParametersAsString(parameters),
    decorators = getDecoratorsAsString(modifiers),
    keywords = getKeywordsAsString(modifiers);

  return `${decorators}${keywords}${name}(${params}): ${type === 'void' && keywords.includes('async') ? 'Promise<void>' : type}`;
}*/
