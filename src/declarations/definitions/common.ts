import {Modifiers} from "./modifiers";


export type HasName = {
  name: string
}

export type HasModifiers = {
  modifiers?: Modifiers
}

export type HasType = {
  type?: string
}

export type HasTypeParameters = {
  typeParameters?: string[]
}

export type HasParameters = {
  parameters?: string[]
}

export type AccessTypes = 'public' | 'protected' | 'private'

export type HasAccess = {
  access: AccessTypes
}



export function hasName(dec: any): dec is HasName {
  return 'name' in dec;
}

export function hasModifiers(dec: any): dec is HasModifiers {
  return 'modifiers' in dec;
}

export function hasType(dec: any): dec is HasType {
  return 'type' in dec;
}

export function hasTypeParameters(dec: any): dec is HasTypeParameters {
  return 'typeParameters' in dec;
}

export function hasParameters(dec: any): dec is HasParameters {
  return 'parameters' in dec;
}

export function hasAccess(dec: any): dec is HasAccess {
  return 'access' in dec;
}