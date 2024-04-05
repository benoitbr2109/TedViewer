import * as vscode from 'vscode';
import { Concept, Definitions } from "./definition/definition";

export interface InstanceProperty {
    name: string;
    value: string | null;
}

export interface InstanceReference {
    referenceName: string;
    instanceId: string | null;
}

export interface TedItem {
    concept: string;
    instances: Array<Instance>;
}

export interface Instance {
    id: string;
    properties: Array<InstanceProperty>;
    references: Array<InstanceReference>;
    children: Array<TedItem>;
    databases?: Array<string>;
}

export class Instances {
    items: Array<TedItem>;
    globalDefinition: Definitions;

    constructor(items: Array<TedItem>, globalDefinition: Definitions) {
        this.items = items;
        this.globalDefinition = globalDefinition;
    }

    public toHtml(definitions: Definitions, showAll: boolean = false): string {
        return this.instancesToHtml(this.items, definitions, showAll);
    }

    public generateInstance(instanceId: string, concept: string, hierarchy: Map<string, string>): Instance | undefined {
        let conceptDefinition = this.globalDefinition.items.filter((item: { name: string; }) => item.name === concept)[0];
        if (conceptDefinition === undefined) {
            vscode.window.showErrorMessage(`Concept ${concept} not in existing definitions`);
            return
        }
        try {
            return {
                id: instanceId,
                properties: Instances.buildPropertiesForConcept(conceptDefinition),
                references: Instances.buildReferencedConceptsFromDefinitionAndHierarchy(conceptDefinition, hierarchy),
                databases: Definitions.listDistinctDefinitionDatabases(conceptDefinition),
                children: []
            };
        }
        catch (e) {
            if (e instanceof Error) {
                vscode.window.showErrorMessage(e.message);
            }
            else {
                vscode.window.showErrorMessage('Unknown error');
            }
        }
    }

    public findTedItemByConcept(concept: string): TedItem | undefined {
        for (let i = 0; i < this.items.length; i++) {
            let tedItem = this.items[i];
            if (tedItem.concept == concept) {
                return tedItem;
            }
            else {
                return Instances.findTedItemByConceptInInstances(tedItem, concept);
            }
        }
    }

    private static findTedItemByConceptInInstances(tedItem: TedItem, searchConcept: string): TedItem | undefined {
        if (tedItem.concept == searchConcept) {
            return tedItem;
        }
        for (let i = 0; i < tedItem.instances.length; ++i) {
            let instance = tedItem.instances[i];
            for (let j = 0; j < instance.children.length; ++j) {
                let childTedItem = instance.children[j];
                return Instances.findTedItemByConceptInInstances(childTedItem, searchConcept);
            }
        }
    }

    private instancesToHtml(instances: Array<TedItem>, definitions: Definitions, showAll: boolean = false): string {
        let htmlBody = "";
        for (let i = 0; i < instances.length; i++) {
            let item = instances[i];
            for (let j = 0; j < item.instances.length; j++) {
                let instance = item.instances[j];
                let conceptDefinition = this.globalDefinition.getConceptDefintion(item.concept);
                if (conceptDefinition === undefined) {
                    htmlBody += this.instanceToHtml(item.concept, undefined, instance, definitions, showAll);
                }
                else {
                    htmlBody += this.instanceToHtml(item.concept, conceptDefinition.children, instance, definitions, showAll);
                }
            }
        }
        return htmlBody;
    }

    private instanceToHtml(conceptName: string, authorizedChildren: string[] | undefined, instance: Instance, definitions: Definitions, showAll: boolean = false): string {
        let htmlBody = `
        <div id="accordion${instance.id}" class="accordion">
        <div class="card shadow-none border rounded-0">
            <div id="heading${instance.id}">
                <div>
                    <h5 class="mb-0 d-flex justify-content-between align-items-center">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col">
                                    <a class="accordion-button bg-primary" style="--mdb-bg-opacity: 0.2;" data-toggle="collapse" data-target="#collapse${instance.id}" aria-expanded="true" aria-controls="collapse${instance.id}">
                                        ${instance.id}
                                    </a>
                                </div>
                                
                                <div class="col-auto align-self-center dropleft">

                                    <a type="button"
                                    id="addIn${instance.id}" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                                        </svg>
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="addIn${instance.id}">
                                    <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#editInstance${instance.id}">Edit</a>
                                    <div class="dropdown-divider"></div>
                                    `;
        if (authorizedChildren) {
            for (let i = 0; i < authorizedChildren.length; i++) {
                htmlBody += `<a class="dropdown-item" onclick="addItem('${instance.id}', '${authorizedChildren[i]}')">${authorizedChildren[i]}</a>`;
            }
        }
        htmlBody += `
                                    
                                    </div>

                                    <div class="modal fade" id="editInstance${instance.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
                                        <div class="modal-dialog modal-xl">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="staticBackdropLabel">${instance.id}</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>

                                                <div class="modal-body" id="editModal${instance.id}">
                                                    ${this.generateCardInstance(instance, conceptName, definitions, false, true)}
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" class="btn btn-primary" onclick="editConfirm(editModal${instance.id})">Confirm</button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </h5>
                </div>
            </div>
    
            <div id="collapse${instance.id}" class="accordion-collapse collapse show" aria-labelledby="heading${instance.id}" data-parent="#accordion${instance.id}">
                
            ${this.generateCardInstance(instance, conceptName, definitions)}

            </div>
            </div>
        </div>
        `;
        return htmlBody;
    }

    private generateCardInstance(instance: Instance, conceptName: string, definitions: Definitions, withChildren: Boolean = true, showAll: boolean = false): string {
        return `
        <div class="card-body">
            <div id="${instance.id}" data-concept="${conceptName}" class="_instance_">
                ${Instances.propertiesToHtml(instance.id, instance.properties, showAll)}
                <hr class="hr" />
                ${Instances.instanceReferenceToHtml(instance.id, conceptName, instance.references, definitions, showAll)}
                ${withChildren ? this.instancesToHtml(instance.children, definitions, showAll) : ''}
            </div>
        </div>
        `
    }

    private static instanceReferenceToHtml(instanceName: String, conceptName: String, instanceReference: Array<InstanceReference>, definition: Definitions, showAll: boolean = false): string {
        let htmlBody = `<div class="container-fluid">`;
        let conceptReferences = definition.items.filter((item: { name: string; }) => item.name === conceptName)[0].referencedConcepts;
        if (conceptReferences !== undefined) {
            for (let i = 0; i < instanceReference.length; i++) {
                let refConcept = instanceReference[i].referenceName;
                let conceptReference = conceptReferences.filter((item: { referencedConcept: String; }) => item.referencedConcept === refConcept)[0];
                if (conceptReference.useAncestor === false) {
                    let value = instanceReference[i].instanceId !== null ? instanceReference[i].instanceId : '';
                    if (instanceReference[i].instanceId !== null || showAll === true) {
                        htmlBody += `
                    <div class="form-group row">
                        <label class="col-sm-6 col-form-label">${refConcept}</label>
                        <div class="col-sm-6">
                            <input data-instance="${instanceName}" data-type="reference" type="text" class="input-sm form-control${showAll ? '' : '-plaintext'}" name="${refConcept}" value="${value}" ${showAll ? '' : 'readonly'}/>
                        </div>
                    </div>`;
                    }
                }
            }
        }
        htmlBody += `</div>`;
        return htmlBody;
    }

    private static propertiesToHtml(instanceName: String, properties: Array<InstanceProperty>, showAll: boolean = false): string {
        let htmlBody = `<div class="container-fluid">`;
        for (let i = 0; i < properties.length; i++) {
            let property = properties[i];
            let value = property.value !== null ? property.value : '';
            if (property.value !== null || showAll === true) {
                htmlBody += `
                <div class="form-group row">
                    <label class="col-sm-6 col-form-label">${property.name}</label>
                    <div class="col-sm-6">
                        <input data-instance="${instanceName}" data-type="property" type="text" class="input-sm form-control${showAll ? '' : '-plaintext'}" name="${property.name}" value="${value}" ${showAll ? '' : 'readonly'}/>
                    </div>
                </div>`;
            }
        }
        htmlBody += `</div>`;

        return htmlBody;
    }

    private static buildPropertiesForConcept(concept: Concept): Array<InstanceProperty> {
        let properties = Array<InstanceProperty>();
        for (let i = 0; i < concept.properties.length; i++) {
            let property = concept.properties[i];
            properties.push({
                name: property.name,
                value: null
            });
        }
        return properties;
    }

    private static buildReferencedConceptsFromDefinitionAndHierarchy(definition: Concept, hierarchy: Map<string, string>): Array<InstanceReference> {
        let referencedConcepts = Array<InstanceReference>();
        if (definition.referencedConcepts) {
            for (let i = 0; i < definition.referencedConcepts.length; i++) {
                let referencedConcept = definition.referencedConcepts[i];
                if (!referencedConcept.useAncestor) {
                    referencedConcepts.push({
                        'referenceName': referencedConcept.referenceName,
                        'instanceId': null
                    });
                    continue;
                }
                let instanceId = hierarchy.get(referencedConcept.referenceName);
                if (instanceId === undefined) {
                    throw new Error(`Referenced concept ${referencedConcept.referenceName} not in hierarchy`);
                }
                else {
                    referencedConcepts.push({
                        'referenceName': referencedConcept.referenceName,
                        'instanceId': instanceId
                    });
                }
            }
        }
        return referencedConcepts;
    }


}
