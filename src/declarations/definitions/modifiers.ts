import * as ts from "typescript";
import {Decorator, getDecorator} from "./decorator";
import {Parser} from "../declaration-parser";
import {Modifier, ModifierLike, NodeArray} from "typescript";
import {DeclarationKind} from "../declaration-kind.types";
import {HasAccess, HasModifiers, HasName} from "./common";


export type ModifierKeywords = 'private' | 'protected' | 'public' | 'readonly' | 'static' | 'abstract' | 'async' | 'const' | 'declare' | 'default' | 'export';


export type Modifiers = {
  keywords?: ModifierKeywords[],
  decorators?: Decorator[]
}


const modifiersMap: {[key: number]: ModifierKeywords} = {
  [ts.SyntaxKind.PrivateKeyword]: 'private',
  [ts.SyntaxKind.ProtectedKeyword]: 'protected',
  [ts.SyntaxKind.PublicKeyword]: 'public',
  [ts.SyntaxKind.StaticKeyword]: 'static',
  [ts.SyntaxKind.ReadonlyKeyword]: 'readonly',
  [ts.SyntaxKind.AbstractKeyword]: 'abstract',
  [ts.SyntaxKind.AsyncKeyword]: 'async',
  [ts.SyntaxKind.ConstKeyword]: 'const',
  [ts.SyntaxKind.DeclareKeyword]: 'declare',
  [ts.SyntaxKind.DefaultKeyword]: 'default',
  [ts.SyntaxKind.ExportKeyword]: 'export'
}


export function getModifierKeywords(nodes: NodeArray<Modifier>): ModifierKeywords[] {
  return nodes.map(node => modifiersMap[node.kind])
}


export function getModifiers(nodes: NodeArray<ModifierLike>, sourceFile: ts.SourceFile, parser: Parser<any, any>): Modifiers {

  const modifiers: Modifiers = {};

  nodes.forEach(node => {
    if(ts.isDecorator(node)) {
      if(!modifiers.decorators) {
        modifiers.decorators = [];
      }
      modifiers.decorators.push(getDecorator(node, sourceFile, parser));
      return;
    }

    const keyword = modifiersMap[node.kind];

    if(keyword) {
      if(!modifiers.keywords) {
        modifiers.keywords = [];
      }
      modifiers.keywords.push(keyword);
    }
  });

  return modifiers;
}



export function setAccess<N extends ts.Node, D extends DeclarationKind<N>>(dec: D & HasModifiers & HasName & HasAccess, _node: N): void {
  switch(true) {
    case isPrivate(dec):
      dec.access = 'private';
      break;
    case isProtected(dec):
      dec.access = 'protected';
      break;
    case isPublic(dec):
      dec.access = 'public';
      break;
  }
}


export function isPublic<D extends DeclarationKind<any>>(dec: D & HasModifiers & HasName): boolean {
  return !(isPrivate(dec) || isProtected(dec));
}


export function isPrivate<D extends DeclarationKind<any>>(dec: D & HasModifiers & HasName): boolean {

  if(dec.name.startsWith('#')) {
    return true;
  }

  return hasKeyword('private', dec.modifiers);
}

export function isProtected<D extends DeclarationKind<any>>(dec: D & HasModifiers & HasName): boolean {

    if(isPrivate(dec)) {
      return false;
    }

    return hasKeyword('protected', dec.modifiers);
}

export function isStatic(modifiers?: Modifiers): boolean {
  return hasKeyword('static', modifiers);
}

export function isReadonly(modifiers?: Modifiers): boolean {
  return hasKeyword('readonly', modifiers);
}

export function isAbstract(modifiers?: Modifiers): boolean {
  return hasKeyword('abstract', modifiers);
}

export function isAsync(modifiers?: Modifiers): boolean {
  return hasKeyword('async', modifiers);
}

export function isConst(modifiers?: Modifiers): boolean {
  return hasKeyword('const', modifiers);
}

export function isDeclare(modifiers?: Modifiers): boolean {
  return hasKeyword('declare', modifiers);
}

export function isDefault(modifiers?: Modifiers): boolean {
  return hasKeyword('default', modifiers);
}

export function isExport(modifiers?: Modifiers): boolean {
  return hasKeyword('export', modifiers);
}


export function isDecorated(modifiers?: Modifiers): modifiers is Modifiers & {decorators: Decorator[]} {

  return !(!modifiers || !modifiers.decorators || !modifiers.decorators.length);
}

export function isDecoratedWith(type: string, modifiers?: Modifiers): boolean {

  if(!isDecorated(modifiers)) {
    return false;
  }

  return modifiers.decorators.some(decorator => decorator.type.toLowerCase() === type.toLowerCase());
}

export function getDecoratorsAsString(modifiers?: Modifiers, separator: string = '\n'): string {

    if(!isDecorated(modifiers)) {
      return '';
    }

    return `${modifiers.decorators
        .map(decorator => decorator.signature)
        .join(separator)
      }${separator}`;
}


export function hasKeywords(modifiers?: Modifiers): modifiers is Modifiers & {keywords: ModifierKeywords[]} {

  return !(!modifiers || !modifiers.keywords || !modifiers.keywords.length);
}


export function hasKeyword(keyword: ModifierKeywords, modifiers?: Modifiers): boolean {

  if(!hasKeywords(modifiers)) {
    return false;
  }

  return modifiers.keywords.indexOf(keyword) !== -1;
}

export function getKeywordsAsString(modifiers?: Modifiers, seperator: string = ' ', showPublic: boolean = false): string {

  if(!hasKeywords(modifiers)) {
    return '';
  }

  return `${modifiers.keywords
      .filter(keyword => showPublic || keyword !== 'public')
      .join(seperator)
    }${seperator}`;
}
