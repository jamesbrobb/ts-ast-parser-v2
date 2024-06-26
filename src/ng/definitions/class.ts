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
import {extendDefinition} from "../../utils/declarations";


export type NgClassElement = NgPropertyDeclaration | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | ConstructorDeclaration


export type NgClassDeclaration = ClassDeclaration & {
    isUI: boolean,
    members: NgClassElement[]
}


export const ngClassDeclarationDefinition: DeclarationDefinition<NgClassDeclaration> = extendDefinition(
  classDeclarationDefinition , {
    postProcess: [addUIFlag]
  }
);


function addUIFlag(classDeclaration: NgClassDeclaration): NgClassDeclaration {

    if(isUIClass(classDeclaration)) {
        classDeclaration.isUI = true;
    }

    return classDeclaration;
}
