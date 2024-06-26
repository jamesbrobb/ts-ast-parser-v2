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
  return checkPropertyForKeyWithValue(property, 'expression', 'Inject');
}

export function isInput(property: PropertyDeclaration): boolean {
  return checkPropertyForKeyWithValue(property, 'expression', 'Input');
}

export function isOutput(property: PropertyDeclaration): boolean {
  return checkPropertyForKeyWithValue(property, 'expression', 'Output');
}



export function checkPropertyForKeyWithValue(property: PropertyDeclaration, key: string, value: string): boolean {

  if(isDecoratedWith(value, property.modifiers)) {
    return true;
  }

  if (typeof property.initializedValue === 'string') {
    return property.initializedValue === value.toLowerCase();
  }

  return findKeyWithValue(property.initializedValue, key, value.toLowerCase());
}


function findKeyWithValue(obj: any, key: string, value: string): any {
  let res = false

  walkObjectTree(obj, (val: any) => {
    if(typeof val === 'string' && val === value) {
      res = true;
    }
  }, key);

  return res;
}
