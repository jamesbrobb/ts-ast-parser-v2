import {BasePathHandler} from "./path-handler";
import {PathConversionMap, PathConversionMapEntry} from "../resolvers";


export const NG_PATH_CONVERTOR: PathConversionMapEntry = [/^@angular\/(?!(?:material|cdk)\/)(.*?)$/g, 'https://angular.dev/api/$1/$name']


export class NgPathHandler extends BasePathHandler {

  override getPathConversionMap(): PathConversionMap {
    return [NG_PATH_CONVERTOR];
  }
}
