import * as ts from "typescript";
import {ngClassDeclaration, NgClassDeclaration, ngPropertyDeclaration} from "./definitions";
import {DeclarationDefinitionMap, defaultDeclarationDefinitionMap, DefaultDeclarationKindMap} from "../declarations";
import {DefaultSyntaxKindToTSNodeDeclarationMap} from "../syntax-kind";


export type NgSyntaxKindToDeclarationTypeMap = DefaultDeclarationKindMap & {
    [ts.SyntaxKind.ClassDeclaration]: NgClassDeclaration
}


export const ngDeclarationDefinitionMap: DeclarationDefinitionMap<DefaultSyntaxKindToTSNodeDeclarationMap, NgSyntaxKindToDeclarationTypeMap> = {
    ...defaultDeclarationDefinitionMap,
    [ts.SyntaxKind.ClassDeclaration]: ngClassDeclaration,
    [ts.SyntaxKind.PropertyDeclaration]: ngPropertyDeclaration,
}