import {DeclarationDefinition, MethodDeclaration, methodDeclarationDefinition} from "../../declarations";
import {extendDefinition} from "../../utils/declarations";


export type NgMethodDeclaration = MethodDeclaration & {
  isLifeCycleMethod?: boolean
}


export const ngMethodDeclarationDefinition: DeclarationDefinition<NgMethodDeclaration> = extendDefinition(
  methodDeclarationDefinition, {
    postProcess: [
      addLifeCycleFlag
    ]
  }
);



const LIFE_CYCLE_METHODS = [
  'ngOnInit',
  'ngOnChanges',
  'ngDoCheck',
  'ngAfterContentInit',
  'ngAfterContentChecked',
  'ngAfterViewInit',
  'ngAfterViewChecked',
  'ngOnDestroy'
]


function addLifeCycleFlag(method: NgMethodDeclaration): NgMethodDeclaration {

  const addFlag = LIFE_CYCLE_METHODS.includes(method.name);

  if(addFlag) {
    method.isLifeCycleMethod = true;
  }

  return method;
}