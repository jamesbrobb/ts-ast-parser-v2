import * as deepmerge from "deepmerge";
import {DeclarationDefinition, DeclarationKind, Expression} from "../declarations";


export function extendDefinition<
  B extends DeclarationKind<any>,
  D extends DeclarationKind<any> & B
>(
  baseDefinition: DeclarationDefinition<B>,
  definition: Partial<DeclarationDefinition<D>>
): DeclarationDefinition<D> {
  return deepmerge.all([baseDefinition, definition]) as DeclarationDefinition<D>;
}

export function convertExpressionToString(obj: Expression): string {
  let str = '';

  switch(typeof obj) {
    case 'string':
      str = obj;
      break;
    case 'object':
      if('signature' in obj) {
        str = obj.signature || '';
      } else {
        str = `{ ${Object.entries(obj).map(([key, value]) => {
          return `${key}: ${convertExpressionToString(value)}`;
        }).join(', ')} }`;
      }
  }
  return str;
}

