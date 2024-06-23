import * as ts from "typescript";
import { DeclarationKind } from "../declaration-kind.types";
export type SourceFile = {
    fileName: string;
    path: string;
} & DeclarationKind<ts.SourceFile>;
