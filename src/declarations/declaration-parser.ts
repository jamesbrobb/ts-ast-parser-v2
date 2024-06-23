
export class Parser<T> {

  parse(node: any, sourceFile: any): T {
    return node.getText(sourceFile);
  }
}



/*import * as ts from "typescript";



export type ParseOverload<N extends ts.Node, R> = {
  (node: N, sourceFile: ts.SourceFile, debug?: boolean): R,
  (node: N[], sourceFile: ts.SourceFile, debug?: boolean): R[]
}

export type NoParseFunctionReturnType = {
  raw: string,
  kind: ts.SyntaxKind,
  type: string
}


export class Parser<M extends SyntaxKindToTypeMap<unknown>> {

  readonly #map: DeclarationParseFunctionMap<M>;
  readonly #debug: boolean;

  constructor(map: DeclarationParseFunctionMap<M>, debug: boolean = false) {
    this.#map = map;
    this.#debug = debug;
  }

  readonly parse = <N extends ts.Node, D>(
    node: N | ts.NodeArray<N> | undefined,
    sourceFile: ts.SourceFile,
    defaultValue?: D,
  ): GetDeclarationTypeForSyntaxKind<N['kind'], M> | NoParseFunctionReturnType => {

    if(!node) {
      return defaultValue;
    }

    if(isNodeArray(node)) {
      return node.map(value => this.parse(value, sourceFile));
    }

    const parseFunc: GetDeclarationFn<N['kind'], M> | undefined = this.#map[node.kind];

    if(!parseFunc) {
      if(this.#debug) {
        console.warn(`No parse function registered for ${ts.SyntaxKind[node.kind]} - kind: ${node.kind}`);
      }

      return {
        raw: node.getText(sourceFile),
        kind: node.kind,
        type: ts.SyntaxKind[node.kind]
      }
    }

    return parseFunc(node as any, sourceFile, this);
  }
}*/
