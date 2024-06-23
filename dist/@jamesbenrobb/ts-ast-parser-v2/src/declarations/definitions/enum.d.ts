import * as ts from "typescript";
import { DeclarationDefinition } from "../declaration-definition.types";
import { DeclarationKind } from "../declaration-kind.types";
import { Modifiers } from "./modifiers";
export type EnumDeclaration = {
    name: string;
    members: string[];
} & DeclarationKind<ts.EnumDeclaration> & Modifiers;
export declare const enumDeclarationDefinition: DeclarationDefinition<EnumDeclaration>;
export type EnumMember = {
    name: string;
    initializer?: string;
} & DeclarationKind<ts.EnumMember>;
export declare const enumMemberDefinition: DeclarationDefinition<EnumMember>;
