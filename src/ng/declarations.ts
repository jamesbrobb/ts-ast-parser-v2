import * as ts from "typescript";
import {
    ngClassDeclarationDefinition,
    NgClassDeclaration,
    ngPropertyDeclarationDefinition,
    NgPropertyDeclaration
} from "./definitions";
import {DeclarationDefinitionMap, defaultDeclarationDefinitionMap, DefaultDeclarationKindMap} from "../declarations";
import {DefaultSyntaxKindToTSNodeDeclarationMap} from "../syntax-kind";
import {NgMethodDeclaration, ngMethodDeclarationDefinition} from "./definitions/method";


export type NgSyntaxKindToDeclarationTypeMap = DefaultDeclarationKindMap & {
    [ts.SyntaxKind.ClassDeclaration]: NgClassDeclaration
    [ts.SyntaxKind.PropertyDeclaration]: NgPropertyDeclaration
    [ts.SyntaxKind.MethodDeclaration]: NgMethodDeclaration
}


export const ngDeclarationDefinitionMap: DeclarationDefinitionMap<DefaultSyntaxKindToTSNodeDeclarationMap, NgSyntaxKindToDeclarationTypeMap> = {
    ...defaultDeclarationDefinitionMap,
    [ts.SyntaxKind.ClassDeclaration]: ngClassDeclarationDefinition,
    [ts.SyntaxKind.PropertyDeclaration]: ngPropertyDeclarationDefinition,
    [ts.SyntaxKind.MethodDeclaration]: ngMethodDeclarationDefinition
}