import * as ts from "typescript";
import {DeclarationDefinition, PropHandlerEntry} from "./declaration-definition.types";
import {SyntaxKindToTSNodeDeclarationMap} from "../syntax-kind";
import {DeclarationKindMap} from "./declaration-kind.types";
import {isNode, isNodeArray} from "../utils";
import {UnregisteredSyntaxKindNode, unregisteredSyntaxKindParser} from "../syntax-kind/syntax-kind.parser";
import {Maps} from "../maps";
import {DeclarationDefinitionMap, DeclarationDefinitionMapEntry} from "./declaration-definition.map.types";


/*export type ParseOverload<N extends ts.Node, R> = {
  (node: N, sourceFile: ts.SourceFile, debug?: boolean): R,
  (node: N[], sourceFile: ts.SourceFile, debug?: boolean): R[]
}*/


export function addRawText<TThis extends Parser<any, any>, Fn extends (...args: any[]) => any>(
  originalMethod: Fn,
  context: ClassMethodDecoratorContext<ThisParameterType<Fn>, Fn>
) {
  if (context.kind === "method") {
    return function(this: TThis, ...args: any[]) {
      const res: ParseReturnType = originalMethod.apply(this, args),
        node = args[0],
        source = args[1],
        options = args[4];

      if(!options?.debug) {
        return res;
      }

      if(isNode(node)) {
        if (res && typeof res !== 'string' && typeof res !== 'boolean' && 'kind' in res && !res.raw) {
          res.raw = node.getText(source);
        }
      }

      return res;
    }
  }
  return originalMethod;
}

export type ParserOptions = { // TODO - add user extendable options
  debug?: boolean
}

export type ParseReturnType<D = undefined> = Record<PropertyKey, any> | UnregisteredSyntaxKindNode | D | undefined


export class Parser<T extends SyntaxKindToTSNodeDeclarationMap, M extends DeclarationKindMap<T>> {

  readonly #map: DeclarationDefinitionMap<T, M>;

  constructor(map: DeclarationDefinitionMap<T, M>) {
    this.#map = map;
  }

  @addRawText
  parse<N extends ts.Node, D>(
    node: N | ts.NodeArray<N> | undefined,
    sourceFile: ts.SourceFile,
    defaultValue?: D,
    maps?: Maps,
    options?: ParserOptions
  ): ParseReturnType<D> {

    // get DecType by T[N['kind']]
    // get return type by M[DecType]
    if(!node) {
      return defaultValue;
    }

    if(isNodeArray(node)) {
      return node.map(value => this.parse(value, sourceFile, defaultValue, maps, options));
    }

    // TODO - limit this to only the keys in M
    // (M[N['kind']] extends DeclarationDefinition<infer U> ? DeclarationDefinition<U> : never) | undefined
    const def: DeclarationDefinitionMapEntry<any> | undefined = this.#map[node.kind] as any;

    if(!def) {
      // TODO - make unregisteredSyntaxKindParser a dependency
      return unregisteredSyntaxKindParser(node, sourceFile, !!options?.debug);
    }

    if(def instanceof Function) {
      return def(node, sourceFile, this, maps);
    }

    return this.#processDef(def, node, sourceFile, maps, options);
  }

  #processDef<N extends ts.Node, D extends DeclarationDefinition<any>>(
    def: D,
    node: N,
    sourceFile: ts.SourceFile,
    maps?: Maps,
    options?: ParserOptions
  ): D['__resultType'] {
    const res: D['__resultType'] = {}

    if(!!options?.debug || !def.removeKind) {
      res.kind = ts.SyntaxKind[node.kind];
    }

    def.props.forEach((prop: keyof N) => {

      const propHandler: PropHandlerEntry<N, keyof N, D['__resultType']> | undefined = def.propHandlers?.[prop],
        cNode = node[prop] as any;

      if(!cNode && !isNodeArray(cNode) && !isNode(cNode)) {
        return;
      }

      if(!propHandler) {
        res[prop] = this.parse(cNode, sourceFile, undefined, maps, options);
        return;
      }

      if(propHandler instanceof Function) {
        res[prop] = propHandler(cNode, sourceFile, this, maps);
        return;
      }

      const propName = propHandler.propName ?? prop;

      if(propHandler.parseFn) {
        res[propName] = propHandler.parseFn(cNode, sourceFile, this, maps);
      } else {
        res[propName] = this.parse(cNode, sourceFile, propHandler.defaultValue, maps, options);
      }

      if(propHandler.postProcess) {
        propHandler.postProcess.forEach((handler) => {
          handler(node, cNode, res, sourceFile, this, maps);
        });
      }
    });

    if(def.postProcess) {
      def.postProcess.forEach((handler) => {
        handler(res, node, sourceFile, this, maps);
      })
    }

    if(def.signatureCreationFn) {
      res.signature = def.signatureCreationFn(res, node, sourceFile);
    }

    return res;
  }
}


/*export class Parser<T> {

  parse(node: any, sourceFile: any): T {
    return node.getText(sourceFile);
  }
}*/
