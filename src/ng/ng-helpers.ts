import {ClassDeclaration, isDecoratedWith, PropertyDeclaration} from "../declarations";
import {walkObjectTree} from "../utils";


export function isUIClass(classDeclaration: ClassDeclaration): boolean {

  if(!classDeclaration?.modifiers?.decorators) {
    return false;
  }

  return classDeclaration.modifiers.decorators
    .some(modifier => ['Directive', 'Component'].includes(modifier.type));
}

export function isInjectedDependency(property: PropertyDeclaration): boolean {

  // check if property is injected
  // if so
  // check property for 'type' value
  // if none, walk initializedValue for arguments array
  // Array of either strings - if so get first value in array
  // or objects with expression set as type

  return checkProperty(property, 'Inject');
}

export function isInput(property: PropertyDeclaration): boolean {
  return checkProperty(property, 'Input');
}

export function isOutput(property: PropertyDeclaration): boolean {
  return checkProperty(property, 'Output');
}



export function checkProperty(property: PropertyDeclaration, value: string): boolean {

  if(isDecoratedWith(value, property.modifiers)) {
    return true;
  }

  if (typeof property.initializedValue === 'string') {
    return property.initializedValue === value.toLowerCase();
  }

  return findExpressionValue(property.initializedValue, value.toLowerCase());
}


function findExpressionValue(obj: any, key: string): any {
  let res = false

  walkObjectTree(obj, (value: any) => {
    if(typeof value === 'string' && value === key) {
      res = true;
    }
  }, 'expression');

  return res;
}




/*export function getInputs(properties: PropertyDeclaration[]): PropertyDeclaration[] {
  return properties
    .filter(prop => isDecoratedWith('Input', prop))
}

export function getOutputs(properties: PropertyDeclaration[]): string[] {
  return properties
    .filter(prop => isDecoratedWith('Output', prop))
    .map(prop => prop.signature);
}

export function getPublicProperties(properties: PropertyDeclaration[]): string[] {
  return properties
    .filter(prop => isPublic(prop.name, prop))
    .filter(prop => !isDecoratedWith('Input', prop) && !isDecoratedWith('Output', prop))
    .map(prop => prop.signature);
}*/
