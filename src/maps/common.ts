import {DependencyMap} from "./dependencies";
import {ImportsMap} from "./imports";
import {LocalMap} from "./local";


export type Maps = {
  project?: DependencyMap
  imports?: ImportsMap
  local?: LocalMap
}

export type AdditionalMapProps = {[key: PropertyKey]: unknown}
