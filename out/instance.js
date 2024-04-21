"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instances = void 0;
const vscode = __importStar(require("vscode"));
const definition_1 = require("./definition/definition");
class Instances {
    items;
    globalDefinition;
    constructor(items, globalDefinition) {
        this.items = items;
        this.globalDefinition = globalDefinition;
    }
    toHtml(definitions, collapseAll = false) {
        return this.instancesToHtml(this.items, definitions, collapseAll);
    }
    generateInstance(instanceId, concept, hierarchy) {
        let conceptDefinition = this.globalDefinition.items.filter((item) => item.name === concept)[0];
        if (conceptDefinition === undefined) {
            vscode.window.showErrorMessage(`Concept ${concept} not in existing definitions`);
            return;
        }
        try {
            return {
                id: instanceId,
                properties: Instances.buildPropertiesForConcept(conceptDefinition),
                references: Instances.buildReferencedConceptsFromDefinitionAndHierarchy(conceptDefinition, hierarchy),
                databases: definition_1.Definitions.listDistinctDefinitionDatabases(conceptDefinition),
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
    findTedItemByConcept(concept) {
        for (let i = 0; i < this.items.length; i++) {
            let tedItem = this.items[i];
            if (tedItem.concept === concept) {
                return tedItem;
            }
            else {
                return Instances.findTedItemByConceptInInstances(tedItem, concept);
            }
        }
    }
    static findTedItemByConceptInInstances(tedItem, searchConcept) {
        if (tedItem.concept === searchConcept) {
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
    instancesToHtml(instances, definitions, collapseAll = false) {
        let htmlBody = "";
        for (let i = 0; i < instances.length; i++) {
            let item = instances[i];
            for (let j = 0; j < item.instances.length; j++) {
                let instance = item.instances[j];
                let conceptDefinition = this.globalDefinition.getConceptDefintion(item.concept);
                if (conceptDefinition === undefined) {
                    htmlBody += this.instanceToHtml(item.concept, undefined, instance, definitions, collapseAll);
                }
                else {
                    htmlBody += this.instanceToHtml(item.concept, conceptDefinition.children, instance, definitions, collapseAll);
                }
            }
        }
        return htmlBody;
    }
    instanceToHtml(conceptName, authorizedChildren, instance, definitions, collapseAll = false) {
        let htmlBody = `
        <div id="accordion${instance.id}" class="accordion">
        <div class="card shadow-none border rounded-0">
            <div id="heading${instance.id}">
                <div>
                    <h5 class="mb-0 d-flex justify-content-between align-items-center">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col">
                                    <a class="accordion-button bg-primary ${collapseAll === true ? "collapsed" : ""}" style="--mdb-bg-opacity: 0.2;" data-toggle="collapse" data-target="#collapse${instance.id}" aria-expanded="${!collapseAll}" aria-controls="collapse${instance.id}">
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
                                    <a class="dropdown-item bg-primary" style="--mdb-bg-opacity: 0.4;" data-bs-toggle="modal" data-bs-target="#editInstance${instance.id}">Edit</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item bg-danger" style="--mdb-bg-opacity: 0.4;" type="button" data-bs-toggle="modal" data-bs-target="#deleteInstance${instance.id}">Delete</a>
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

                                    <div class="modal fade" id="deleteInstance${instance.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="staticBackdropLabel">${instance.id}</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>

                                                <div class="modal-body" id="deleteModal${instance.id}">
                                                    <div class="card-body">
                                                        <div id="${instance.id}" data-concept="${conceptName}" class="_instance_">
                                                            <div class="container-fluid">
                                                                <p>Confirm delete?</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" class="btn btn-danger" onclick="deleteConfirm(deleteModal${instance.id})">Confirm</button>
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
    
            <div id="collapse${instance.id}" class="accordion-collapse collapse ${collapseAll === false ? "show" : ""}" aria-labelledby="heading${instance.id}" data-parent="#accordion${instance.id}">
                
            ${this.generateCardInstance(instance, conceptName, definitions, true, false, collapseAll)}

            </div>
            </div>
        </div>
        `;
        return htmlBody;
    }
    generateCardInstance(instance, conceptName, definitions, withChildren = true, editMode = false, collapseAll = false) {
        let conceptDef = definitions.getConceptDefintion(conceptName);
        return `
        <div class="card-body">
            <div id="${instance.id}" data-concept="${conceptName}" class="_instance_">
                ${Instances.propertiesToHtml(instance.id, instance.properties, conceptDef, editMode)}
                <hr class="hr" />
                ${Instances.instanceReferenceToHtml(instance.id, conceptName, instance.references, definitions, editMode)}
                ${withChildren ? this.instancesToHtml(instance.children, definitions, collapseAll) : ''}
            </div>
        </div>
        `;
    }
    static instanceReferenceToHtml(instanceName, conceptName, instanceReference, definition, showAll = false) {
        let htmlBody = `<div class="container-fluid">`;
        let conceptReferences = definition.items.filter((item) => item.name === conceptName)[0].referencedConcepts;
        if (conceptReferences !== undefined) {
            for (let i = 0; i < instanceReference.length; i++) {
                let refConcept = instanceReference[i].referenceName;
                let conceptReference = conceptReferences.filter((item) => item.referencedConcept === refConcept)[0];
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
    static propertiesToHtml(instanceName, properties, concept, editMode = false) {
        let htmlBody = `<div class="container-fluid">`;
        for (let i = 0; i < properties.length; i++) {
            let property = properties[i];
            let conceptProperty = concept.properties.filter((item) => item.name === property.name)[0];
            let value = property.value !== null ? property.value : '';
            if (property.value !== null || editMode === true) {
                htmlBody += `
                <div class="form-group row">
                    <label class="col-sm-6 col-form-label">${property.name}</label>
                    <div class="col-sm-6">


                        <div class="input-group">
                            <input data-instance="${instanceName}" placeholder="${conceptProperty.generatorProperty === undefined ? '' : conceptProperty.generatorProperty}" data-type="property" type="text" class="input-sm form-control${editMode ? '' : '-plaintext'}" name="${property.name}" value="${value}" ${editMode ? '' : 'readonly'}/>`;
                if (editMode) {
                    htmlBody += `<span class="input-group-text bg-light" id="basic-addon1">${conceptProperty.type}</span>`;
                }
                htmlBody += `
                        </div>
                    </div>
                </div>`;
            }
        }
        htmlBody += `</div>`;
        return htmlBody;
    }
    static buildPropertiesForConcept(concept) {
        let properties = Array();
        for (let i = 0; i < concept.properties.length; i++) {
            let property = concept.properties[i];
            properties.push({
                name: property.name,
                value: null
            });
        }
        return properties;
    }
    static buildReferencedConceptsFromDefinitionAndHierarchy(definition, hierarchy) {
        let referencedConcepts = Array();
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
exports.Instances = Instances;
//# sourceMappingURL=instance.js.map