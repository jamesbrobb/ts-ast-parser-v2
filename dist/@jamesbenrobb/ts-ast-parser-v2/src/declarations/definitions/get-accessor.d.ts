import * as ts from "typescript";
import { Modifiers } from "./modifiers";
import { DeclarationKind } from "../declaration-kind.types";
import { DeclarationDefinition } from "../declaration-definition.types";
export type GetAccessorDeclaration = {
    name: string;
    type?: string;
} & DeclarationKind<ts.GetAccessorDeclaration> & Modifiers;
export declare const getAccessorDeclarationDefinition: DeclarationDefinition<GetAccessorDeclaration>;
