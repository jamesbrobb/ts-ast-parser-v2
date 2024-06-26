import {DeclarationDefinition, DeclarationKind} from "../declarations";
import * as deepmerge from "deepmerge";


export function extendDefinition<
  B extends DeclarationKind<any>,
  D extends DeclarationKind<any> & B
>(
  baseDefinition: DeclarationDefinition<B>,
  definition: Partial<DeclarationDefinition<D>>
): DeclarationDefinition<D> {
  return deepmerge.all([baseDefinition, definition]) as DeclarationDefinition<D>;
}

