import {BasePathHandler} from "./path-handler";
import {IgnorePathsMap} from "../../maps";


export class CommonPathHandler extends BasePathHandler {
  override getIgnorePathsMap(): IgnorePathsMap {
    return [
      /*
        TODO - rethink where this goes - it ignores all index.d.ts files - but not angular as we need those.
         Obviously this might need to apply to other libraries as well.
         So maybe have an include index.d.ts flag for each handler?
       */
      /^(?!.*@angular).*?\/index((\.d)*?\.ts)*?$/g,
      'tslib',
      'public-api',
      '.spec.ts',
      '.mock.ts'
    ]
  }
}
