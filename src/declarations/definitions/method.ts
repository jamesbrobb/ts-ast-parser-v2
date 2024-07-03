import * as ts from "typescript";
import {getParametersAsString, ParameterDeclaration} from "./parameter";
import {getDecoratorsAsString, getKeywordsAsString, getModifiers, Modifiers, setAccess} from "./modifiers";
import {TypeNode, TypeParameterDeclaration} from "./type";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";
import {AccessTypes} from "./common";
import {Parser} from "../declaration-parser";



export type MethodDeclaration = {
  name: string
  access: AccessTypes
  returnType?: TypeNode | string
  typeParameters?: TypeParameterDeclaration[]
  parameters: ParameterDeclaration[]
  modifiers?: Modifiers,
  asteriskToken?: boolean
  questionToken?: boolean
  exclamationToken?: boolean
} & DeclarationKind<ts.MethodDeclaration>;


export const methodDeclarationDefinition: DeclarationDefinition<MethodDeclaration> = {
  props: [
    'name',
    'type',
    'typeParameters',
    'parameters',
    'modifiers',
    'asteriskToken',
    'questionToken',
    'exclamationToken',
  ],
  propHandlers: {
    modifiers: getModifiers,
    type: {
      propName: 'returnType'
    }
  },
  postProcess: [
    setAccess,
    setMissingReturnType
  ],
  signatureCreationFn: createMethodSignature
}


export function isMethodDeclaration(dec: DeclarationKind<any>): dec is MethodDeclaration {
  return dec.kind === ts.SyntaxKind[ts.SyntaxKind.MethodDeclaration];
}

export function isPublicMethodDeclaration(dec: MethodDeclaration): dec is MethodDeclaration & { access: 'public' } {
  return isMethodDeclaration(dec) && dec.access === 'public';
}



export function setMissingReturnType(
  dec: MethodDeclaration,
  node: ts.MethodDeclaration,
  sourceFile: ts.SourceFile,
  parser: Parser<any, any>
): void {

  if(dec.returnType) {
    return;
  }

  const returnStatement = node.body?.statements.filter(statement => statement.kind === ts.SyntaxKind.ReturnStatement)
    .map((statement: ts.ReturnStatement) => {
      return statement.expression?.getText(sourceFile);
    });

  //TODO - determine return type from return statement?

  dec.returnType = returnStatement && returnStatement.length > 0 ? '' : 'void';
}

export function createMethodSignature(dec: MethodDeclaration): string {

  const params = getParametersAsString(dec.parameters),
    decorators = getDecoratorsAsString(dec.modifiers),
    keywords = getKeywordsAsString(dec.modifiers),
    returnType = getReturnType(dec, keywords);

  return `${decorators}${keywords}${dec.name}(${params})${returnType}`;
}

function getReturnType(dec: MethodDeclaration, keywords: string): string {

  if(dec.returnType && typeof dec.returnType !== 'string') {
    return `: ${dec.returnType.signature}`;
  }

  return !dec.returnType ? '' : `: ${dec.returnType === 'void' && keywords.includes('async') ? 'Promise<void>' : dec.returnType}`
}
