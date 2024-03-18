export interface ConceptProperty {
    name: string;
    type: string;
    generator?: string;
    generatorProperty?: string;
}

export interface ConceptTable {
    db: string;
    table: string;
}

export interface ConceptBusinessMapping {
    property: string;
    db: string;
    table: string;
    column: string;
    converter?: string;
}

export interface ConceptTechnicalMapping {
    db: string;
    table: string;
    column: string;
    generator: string;
    generatorProperty?: string;
}

export interface ConceptReferenceDetail {
    db: string;
    table: string;
    column: string;
    referencedDb: string;
    referencedTable: string;
    referencedColumn: string;
}

export interface ConceptReference {
    referenceConcept: string;
    referenceName: string;
    useAncestor: boolean;
    details: Array<ConceptReferenceDetail>;
}

export interface Concept {
    name: string;
    root: boolean;
    properties: Array<ConceptProperty>;
    children?: Array<string>;
    tables: Array<ConceptTable>;
    businessMappings?: Array<ConceptBusinessMapping>;
    technicalMappings?: Array<ConceptTechnicalMapping>;
    referencedConcepts?: Array<ConceptReference>;
}