import * as ts from "typescript";
import {
  DeclarationDefinition,
  DeclarationDefinitionMap,
  DeclarationDefinitionMapEntry,
  PropHandlerEntry
} from "./declaration-definition.types";
import {SyntaxKindToTSNodeDeclarationMap} from "../syntax-kind";
import {DeclarationKindMap} from "./declaration-kind.types";
import {isNode, isNodeArray} from "../utils/node";


export type ParseOverload<N extends ts.Node, R> = {
  (node: N, sourceFile: ts.SourceFile, debug?: boolean): R,
  (node: N[], sourceFile: ts.SourceFile, debug?: boolean): R[]
}

export type NoParseFunctionReturnType = {
  raw: string,
  kind: ts.SyntaxKind,
  type: string
}


export class Parser<T extends SyntaxKindToTSNodeDeclarationMap, M extends DeclarationKindMap<T>> {

  readonly #map: DeclarationDefinitionMap<T, M>;
  readonly #debug: boolean;

  constructor(map: DeclarationDefinitionMap<T, M>, debug: boolean = false) {
    this.#map = map;
    this.#debug = debug;
  }

  readonly parse = <N extends ts.Node, D>(
    node: N | ts.NodeArray<N> | undefined,
    sourceFile: ts.SourceFile,
    defaultValue?: D,
  ): Record<PropertyKey, any> | NoParseFunctionReturnType | D | undefined => {

    // get DecType by T[N['kind']]
    // get return type by M[DecType]
    if(!node) {
      return defaultValue;
    }

    if(isNodeArray(node)) {
      return node.map(value => this.parse(value, sourceFile, defaultValue));
    }

    // TODO - limit this to only the keys in M
    // (M[N['kind']] extends DeclarationDefinition<infer U> ? DeclarationDefinition<U> : never) | undefined
    const def: DeclarationDefinitionMapEntry<any> | undefined = this.#map[node.kind] as any;

    if(!def) {
      return this.#createNoDefResult(node, sourceFile);
    }

    if(def instanceof Function) {
      return def(node, sourceFile, this);
    }

    return this.#createDefResult(def, node, sourceFile);
  }

  #createNoDefResult(node: ts.Node, sourceFile: ts.SourceFile): NoParseFunctionReturnType {
    if(this.#debug) {
      console.warn(`No parse function registered for ${ts.SyntaxKind[node.kind]} - kind: ${node.kind}`);
    }

    return {
      raw: node.getText(sourceFile),
      kind: node.kind,
      type: ts.SyntaxKind[node.kind]
    }
  }

  #createDefResult<D extends DeclarationDefinition<any>, N extends ts.Node>(def: D, node: N, sourceFile: ts.SourceFile): D['__resultType'] {
    const res: D['__resultType'] = {}

    def.props.forEach((prop: keyof N) => {

      const propHandler: PropHandlerEntry<N, keyof N> | undefined = def.propHandlers?.[prop],
        cNode = node[prop] as any;

      if(!cNode && !isNodeArray(cNode) && !isNode(cNode)) {
        return;
      }

      if(!propHandler) {
        res[prop] = this.parse(cNode, sourceFile);
        return;
      }

      if(propHandler instanceof Function) {
        res[prop] = propHandler(cNode, sourceFile, this);
        return;
      }

      const propName = propHandler.propName ?? prop;

      if(propHandler.parseFn) {
        res[propName] = propHandler.parseFn(cNode, sourceFile, this);
        return;
      }

      res[propName] = this.parse(cNode, sourceFile, propHandler.defaultValue);
    });

    return res;
  }
}


/*export class Parser<T> {

  parse(node: any, sourceFile: any): T {
    return node.getText(sourceFile);
  }
}*/
