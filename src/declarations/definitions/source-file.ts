import * as ts from "typescript";
import {DeclarationKind} from "../declaration-kind.types";


export type SourceFile = { //<O extends AdditionalMapProps = {}> = {
  fileName: string,
  path: string,
  //imports: ImportsMap<O>,
  //exports: Declaration<any>[],
} & DeclarationKind<ts.SourceFile>;


