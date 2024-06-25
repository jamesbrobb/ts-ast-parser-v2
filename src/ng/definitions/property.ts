import {DeclarationDefinition, PropertyDeclaration, propertyDeclarationDefinition} from "../../declarations";
import {isInjectedDependency, isInput, isOutput} from "../ng-helpers";


export type NgPropertyDeclaration = PropertyDeclaration & {
  injectedDependency?: boolean
  isInput?: boolean
  isOutput?: boolean
  isPublic?: boolean
}


export const ngPropertyDeclaration: DeclarationDefinition<NgPropertyDeclaration> = {
  ...propertyDeclarationDefinition,
  postProcess: [
    addInjectedFlag,
    addInputFlag,
    addOutputFlag
  ]
}


function addInjectedFlag(property: NgPropertyDeclaration): NgPropertyDeclaration {
  let addFlag = isInjectedDependency(property);

  if(addFlag) {
    property.injectedDependency = true;
  }

  return property;
}


function addInputFlag(property: NgPropertyDeclaration): NgPropertyDeclaration {
  let addFlag = isInput(property);

  if(addFlag) {
    property.isInput = true;
  }

  return property;
}

function addOutputFlag(property: NgPropertyDeclaration): NgPropertyDeclaration {
  let addFlag = isOutput(property);

  if(addFlag) {
    property.isOutput = true;
  }

  return property;
}