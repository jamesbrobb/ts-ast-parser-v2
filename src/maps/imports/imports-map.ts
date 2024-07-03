import {AdditionalMapProps} from "../common";

export type ImportsMapElement<O extends AdditionalMapProps = {}> = {
  name: string
  module: string
  resolvedModulePath: string
  convertedModulePath?: string
} & O

export type ImportsMap<O extends AdditionalMapProps = {}> = ImportsMapElement<O>[]


export function getImportsMapElementByName<O extends AdditionalMapProps = {}>(
  importsMap: ImportsMap<O>,
  name: string
): ImportsMapElement<O> | undefined {
  return importsMap.find(element => element.name === name);
}
