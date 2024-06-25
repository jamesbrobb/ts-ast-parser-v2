import {isUIClass} from "../ng-helpers";
import {
    ClassDeclaration,
    ConstructorDeclaration,
    DeclarationDefinition,
    GetAccessorDeclaration,
    MethodDeclaration,
    SetAccessorDeclaration,
    classDeclarationDefinition
} from "../../declarations";
import {NgPropertyDeclaration} from "./property";


export type NgClassElement = NgPropertyDeclaration | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | ConstructorDeclaration


export type NgClassDeclaration = ClassDeclaration & {
    isUI: boolean,
    members: NgClassElement[]
}


export const ngClassDeclaration: DeclarationDefinition<NgClassDeclaration> = {
    props: classDeclarationDefinition.props,
    propHandlers: classDeclarationDefinition.propHandlers,
    postProcess: [addUIFlag]
}


function addUIFlag(classDeclaration: NgClassDeclaration): NgClassDeclaration {
    classDeclaration.isUI = isUIClass(classDeclaration);
    return classDeclaration;
}
