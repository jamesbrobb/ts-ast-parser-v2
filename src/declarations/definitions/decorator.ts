import * as ts from "typescript";
import {Parser} from "../declaration-parser";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";


export type DecoratorMetadata = {
  [key: string]: string | string[]
}

export type DecoratorMetadataTypes = DecoratorMetadata | string | (DecoratorMetadata | string)[]

export type Decorator = {
  type: string,
  metadata?: DecoratorMetadataTypes,
  raw: string,
  signature: string
} & DeclarationKind<ts.Decorator>

export const decoratorDefinition: DeclarationDefinition<Decorator> = {
  props: ['expression']

}


export type GetDecoratorMetadata<T extends {}> = {
  [K in keyof T]: T[K] extends infer K ? K extends Array<unknown> ? string[] : K extends undefined ? never : string : never
}

export type DecoratorDef<T extends string, M extends DecoratorMetadataTypes> = {
  type: T,
  metadata?: M,
  raw: string,
  signature: string
}


export function getDecorator<T extends Decorator>(node: ts.Decorator, sourceFile: ts.SourceFile, parser: Parser<any, any>): T {

  if(!ts.isCallLikeExpression(node)) {
    throw new Error("Decorator Node is not a call like expression");
  }

  let type: string = "",
    metadata: Decorator['metadata'] = {};

  if(ts.isIdentifier(node.expression)) {
    type = parser.parse(node.expression, sourceFile) as string;
  }

  if (ts.isCallExpression(node.expression)) {
    type = parser.parse(node.expression.expression, sourceFile) as string;
    metadata = getDecoratorMetadata<T['metadata']>(node.expression, sourceFile, parser);
  }

  const decorator = {
    type,
    metadata,
    signature: getDecoratorSignature(type, metadata),
    raw: node.getText(sourceFile)
  }

  return decorator as T;
}


function getDecoratorMetadata<T extends Decorator['metadata']>(node: ts.CallExpression, sourceFile: ts.SourceFile, parser: Parser<any, any>): T {

  let metadata: any | string | (any | string)[] | undefined;

  node.arguments.forEach(arg => {

    metadata = metadata || [];

    if (ts.isIdentifier(arg) || ts.isStringLiteral(arg)) {
      metadata.push(parser.parse(arg, sourceFile));
      return;
    }

    if (ts.isObjectLiteralExpression(arg)) {
      metadata.push(parser.parse(arg, sourceFile));
    }
  });

  if(metadata && Array.isArray(metadata) && metadata.length === 1) {
    metadata = metadata[0];
  }

  return metadata
}


function getDecoratorSignature(type: string, metaData: Decorator['metadata']): string {

  switch(typeof metaData) {
    case 'string':
      return `@${type}('${metaData}')`;
    case 'object':
      if(Array.isArray(metaData)) {
        return `@${type}(${
          metaData.map(item => {
            if (typeof item === 'string') {
              return `'${item}'`;
            }
            return convertMetadataToString(item);
          }).join(', ')
        })`;
      }
      return `@${type}(${convertMetadataToString(metaData)})`;
    default:
      return `@${type}()`;
  }
}

function convertMetadataToString(metaData: {}): string {
  return Reflect.ownKeys(metaData)
    .map(key => {
      const value = (metaData as any)[key];
      return [key, value];
    })
    .sort((a, b) => a.length - b.length)
    .reduce((accumulator: string, currentValue: string[], currentIndex: number, array: string[][]) => {

      if(currentValue.length === 1) {
        return `${accumulator}'${currentValue[0]}'${currentIndex === array.length - 1 ? '' : ', '}`;
      }

      return `${accumulator}${currentIndex === 0 || array[currentIndex - 1].length === 1 ? '{' : ''}${currentValue[0]}: ${currentValue[1]}${currentIndex === array.length - 1 ? '}' : ', '}`;
    }, '')
}
