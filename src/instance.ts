export interface InstanceProperty {
    name: string;
    value: string | null;
}

export interface InstanceReference {
    referenceName: string;
    instanceId: string;
}

export interface InstanceChild {
    concept: string;
    instances: Array<Instance>;
}

export interface Instance {
    id: string;
    properties: Array<InstanceProperty>;
    references: Array<InstanceReference>;
    children: Array<InstanceChild>;
    databases?: Array<string>;
}
