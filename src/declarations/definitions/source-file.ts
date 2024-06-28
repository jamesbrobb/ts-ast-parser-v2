import * as ts from "typescript";
import {DeclarationKind} from "../declaration-kind.types";
import {AdditionalMapProps, ImportsMap} from "../../maps";


export type SourceFile<O extends AdditionalMapProps = {}> = {
  fileName: string,
  path: string,
  imports: ImportsMap<O>,
  exports: DeclarationKind<any>[],
} & DeclarationKind<ts.SourceFile>;


