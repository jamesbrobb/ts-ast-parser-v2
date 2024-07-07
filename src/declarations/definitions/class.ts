import * as ts from "typescript";
import {DeclarationDefinition} from "../declaration-definition.types";
import {DeclarationKind} from "../declaration-kind.types";
import {isPublicPropertyDeclaration, PropertyDeclaration} from "./property";
import {isPublicMethodDeclaration, MethodDeclaration} from "./method";
import {GetAccessorDeclaration, isPublicGetAccessorDeclaration} from "./get-accessor";
import {isPublicSetAccessorDeclaration, SetAccessorDeclaration} from "./set-accessor";
import {ConstructorDeclaration} from "./constructor";
import {TypeParameterDeclaration} from "./type";
import {HeritageClause} from "./heritage";
import {getModifiers, Modifiers} from "./modifiers";



export type ClassElement = PropertyDeclaration | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | ConstructorDeclaration


export type ClassDeclaration = {
  name: string
  typeParameters?: TypeParameterDeclaration[]
  heritage?: HeritageClause[]
  members?: ClassElement[]
  modifiers?: Modifiers
  properties?: PropertyDeclaration[]
  accessors?: (GetAccessorDeclaration | SetAccessorDeclaration)[]
  methods?: MethodDeclaration[]
} & DeclarationKind<ts.ClassDeclaration>


export const classDeclarationDefinition: DeclarationDefinition<ClassDeclaration> = {
  props: ['name', 'typeParameters', 'members', 'heritageClauses', 'modifiers'],
  propHandlers: {
    modifiers: getModifiers,
    members: {

    }
  },
  postProcess: [
    addProperties,
    addMethods,
    addAccessors,
    filterMembers
  ]
}


export function isClassDeclaration(dec: DeclarationKind<any>): dec is ClassDeclaration {
  return dec.kind === ts.SyntaxKind[ts.SyntaxKind.ClassDeclaration];
}


function addProperties(dec: ClassDeclaration): ClassDeclaration {
  const properties = dec.members?.filter(isPublicPropertyDeclaration);

  if(properties && properties.length > 0) {
    dec.properties = properties
  }

  return dec;
}

function addMethods(dec: ClassDeclaration): ClassDeclaration {
  const methods = dec.members?.filter(isPublicMethodDeclaration);

  if(methods && methods.length > 0) {
    dec.methods = methods
  }

  return dec;
}

function addAccessors(dec: ClassDeclaration): ClassDeclaration {
  const accessors = [
    ...dec.members?.filter(isPublicSetAccessorDeclaration) || [],
    ...dec.members?.filter(isPublicGetAccessorDeclaration) || []
  ]

  if(accessors && accessors.length > 0) {
    dec.accessors = accessors
  }

  return dec;
}

function filterMembers(dec: ClassDeclaration): ClassDeclaration {
  dec.members = dec.members?.filter(arg => !dec.properties?.includes(arg as any))
    .filter(arg => !dec.methods?.includes(arg as any))
    .filter(arg => !dec.accessors?.includes(arg as any));

  if (!dec.members || dec.members.length === 0) {
    delete dec.members;
  }

  return dec;
}