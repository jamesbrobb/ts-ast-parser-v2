import * as ts from "typescript";
import { Modifiers } from "./modifiers";
import { DeclarationKind } from "../declaration-kind.types";
import { DeclarationDefinition } from "../declaration-definition.types";
export type PropertyDeclaration = {
    name: string;
    optional: boolean;
    exclamation: boolean;
    signature: string;
    raw: string;
    type?: string;
    initializedValue?: string;
} & DeclarationKind<ts.PropertyDeclaration> & Modifiers;
export declare const propertyDeclarationDefinition: DeclarationDefinition<PropertyDeclaration>;
export type PropertySignature = {
    name: string;
    optional: boolean;
    type?: string;
    signature: string;
    raw: string;
} & DeclarationKind<ts.PropertySignature> & Modifiers;
export declare const propertySignatureDefinition: DeclarationDefinition<PropertySignature>;
