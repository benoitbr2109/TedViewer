import * as vscode from 'vscode';
import { Instance, InstanceChild, InstanceProperty, InstanceReference } from './instance';
import { Concept, ConceptBusinessMapping, ConceptProperty, ConceptReference, ConceptTechnicalMapping } from './concept';

export interface TedItem {
    concept: string;
    instances: Array<Instance>;
}

export interface TedDefinitionItem {
    items: Array<Concept>;
}

export interface TedDefinition {
    concepts: TedDefinitionItem;
}

export interface TedTestCaseInterface {
    items: Array<TedItem>;
    nssos: Array<string>;
    companyIds: Array<string>;
    definitions: TedDefinition;
}

export interface UpdatedTedItems {
  tedItems: Array<TedItem>;
  isUpdated: boolean;
}

export class TedTestCase{
    interface: TedTestCaseInterface;

    private constructor(json: string){
        this.interface = JSON.parse(json);
    }

    public static fromJson(json: string) {
        return new TedTestCase(json);
    }

    public instancesToHtml(showAll: boolean = false): string {
        return this._instancesToHtml(this.interface.items, showAll);
    }

    public definitionsToHtml() {
        let htmlBody = "";
        let rootItems = this.interface.definitions.concepts.items.filter((item: { root: boolean; }) => item.root === true);
    
        for (let i = 0; i < rootItems.length; i++) {
            let rootItem = rootItems[i];
            htmlBody += this._definitionItemToHtml(rootItem, this.interface.definitions.concepts.items);
        }
    
        return htmlBody;
    }

    public async addConceptToInstance(concept: string, instanceId: string): Promise<boolean> {
        return await this._addConceptToInstance(this.interface.items, concept, instanceId);
    }

    public updateTedItem(updatedData: any, itemToUpdate?: TedTestCaseInterface): boolean {
      let isUpdated = false;
      let toTreat = itemToUpdate === undefined? this.interface : itemToUpdate;
      for (let k = 0; k < toTreat.items.length; k++) {
        let item = toTreat.items[k];
        for (let i = 0; i < item.instances.length; i++) {
          let instance = item.instances[i];
          if (instance.id === updatedData.instance) {
            for (let j = 0; j < instance.properties.length; j++) {
              if (instance.properties[j].name === updatedData.name) {
                if(updatedData.value === ''){
                  instance.properties[j].value = null;
                }
                else{
                  instance.properties[j].value = updatedData.value;
                  isUpdated = true;
                }
                break;
                }
              }
            break;
          }
          for (let j = 0; j < instance.children.length; j++) {
            let child = instance.children[j];
            const items: TedTestCaseInterface = {
              items : [child],
              companyIds: [],
              nssos: [],
              definitions: {concepts: {items:[]}}
            };
            let results = this.updateTedItem(updatedData, items);
            if (results) {
              isUpdated = true;
              break;
            }
          }
        }
        if (isUpdated === true) {
          this.interface.items[k] = item;
        }
      }
      return isUpdated;
    }

    private async _addConceptToInstance(instances: Array<TedItem>, concept: string, instanceId: string, hierarchy?: Map<string, string>): Promise<boolean> {
      let isUpdated = false;
      for (let i = 0; i < instances.length; i++) {
        let item = instances[i];
        for (let j = 0; j < item.instances.length; j++) {
            let instance = item.instances[j];
            if(hierarchy === undefined) {
              hierarchy = new Map<string, string>();
            }
            hierarchy.set(item.concept, instance.id);
            if (instance.id === instanceId) {
                const inputBox = vscode.window.showInputBox({
                  ignoreFocusOut: true,
                  prompt: 'Instance name',
                  title: concept,
                  placeHolder: concept
                });
                let instanceId = await inputBox;
                
                if (instanceId === undefined || instanceId === null || instanceId === '') {
                  return false;
                }
                hierarchy.set(concept, instanceId);
                let newInstance = this._generateInstance(instanceId, concept, hierarchy);
                if(newInstance === undefined) {
                  return false;
                }
                let existingChildConcept = instance.children.filter((child: InstanceChild) => child.concept === concept);
                if (existingChildConcept.length === 0) {
                    let instanceChild: InstanceChild = {
                        concept: concept,
                        instances: [newInstance]
                    };
                    instance.children.push(instanceChild);
                }
                else{
                  existingChildConcept[0].instances.push(newInstance);
                }
                return true;
            }
            else {
              isUpdated = await this._addConceptToInstance(instance.children, concept, instanceId, hierarchy);
            }
        }
      }
      return isUpdated;
    }

    private _getAuthorizedChilren(concept: string): Array<string> | undefined {
        return this.interface.definitions.concepts.items.filter((item: { name: string; }) => item.name === concept)[0].children;
    }

    private _generateInstance(instanceId: string, concept: string, hierarchy: Map<string, string>): Instance | undefined{
        let definition = this.interface.definitions.concepts.items.filter((item: { name: string; }) => item.name === concept)[0];
        if (definition === undefined) {
          vscode.window.showErrorMessage(`Concept ${concept} not in existing definitions`);
        }
        try{
          return {
            id: instanceId,
            properties: this._buildPropertiesForDefinition(definition),
            references: this._buildReferencedConceptsFromDefinitionAndHierarchy(definition, hierarchy),
            databases: this._listDistinctDefinitionDatabases(definition),
            children: []
        };
        }
        catch(e){
          if(e instanceof Error){
            vscode.window.showErrorMessage(e.message);
          }
          else{
            vscode.window.showErrorMessage('Unknown error');
          }
        }
    }

    private _buildPropertiesForDefinition(definition: Concept): Array<InstanceProperty> {
        let properties = Array<InstanceProperty>();
        for (let i = 0; i < definition.properties.length; i++) {
            let property = definition.properties[i];
            properties.push({
                name: property.name,
                value: null
            });
        }
        return properties;
    }

    private _buildReferencedConceptsFromDefinitionAndHierarchy(definition: Concept, hierarchy: Map<string, string>): Array<InstanceReference> {
        let referencedConcepts = Array<InstanceReference>();
        if (definition.referencedConcepts){
            for (let i = 0; i < definition.referencedConcepts.length; i++) {
                let referencedConcept = definition.referencedConcepts[i];
                let instanceId = hierarchy.get(referencedConcept.referenceName);
                if (instanceId === undefined) {
                  throw new Error(`Referenced concept ${referencedConcept.referenceName} not in hierarchy`);
                }
                else{
                  referencedConcepts.push({
                      'referenceName': referencedConcept.referenceName,
                      'instanceId': instanceId
                  });
                }
            }
        }
        return referencedConcepts;
    }

    private _listDistinctDefinitionDatabases(definition: Concept): Array<string>{
      let databases = Array<string>();
      for (let i = 0; i < definition.tables.length; i++) {
        let table = definition.tables[i];
        if (databases.indexOf(table.db) === -1) {
          databases.push(table.db);
        }
      }
      return databases;
    }

    private _instancesToHtml(instances: Array<TedItem>, showAll: boolean = false): string {
        let htmlBody = "";
        for (let i = 0; i < instances.length; i++) {
            let item = instances[i];
            for (let j = 0; j < item.instances.length; j++) {
                let instance = item.instances[j];
                htmlBody += this._instanceToHtml(item.concept, instance, showAll);
            }
        }
        return htmlBody;
    }

    private _instanceToHtml(concept: string, instance: Instance, showAll: boolean = false): string {
        let authorizedChildren = this._getAuthorizedChilren(concept);
        let htmlBody = `
        <div id="accordion${instance.id}" class="accordion accordion-borderless">
        <div class="card">
            <div id="heading${instance.id}">
                <div>
                    <h5 class="mb-0 d-flex justify-content-between align-items-center">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col">
                                    <a class="accordion-button" data-toggle="collapse" data-target="#collapse${instance.id}" aria-expanded="true" aria-controls="collapse${instance.id}">
                                        ${instance.id}
                                    </a>
                                </div>
                                <div class="col-auto align-self-center dropleft">
                                    <button type="button"
                                    class="btn btn-sm btn-outline-primary dropdown-toggle"
                                    id="addIn${instance.id}" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">ADD</button>
                                    <div class="dropdown-menu" aria-labelledby="addIn${instance.id}">`;
                                        if (authorizedChildren) {
                                            for(let i = 0; i < authorizedChildren.length; i++) {
                                                htmlBody += `<a class="dropdown-item" onclick="addItem('${instance.id}', '${authorizedChildren[i]}')">${authorizedChildren[i]}</a>`;
                                            }
                                        }
                                    htmlBody += `</div>
                                </div>
                            </div>
                        </div>
                    </h5>
                </div>
            </div>
    
            <div id="collapse${instance.id}" class="accordion-collapse collapse show" aria-labelledby="heading${instance.id}" data-parent="#accordion${instance.id}">
                <div class="card-body">
                    <div id="${instance.id}" class="_instance_">
                    ${this._propertiesToHtml(instance.id, instance.properties, showAll)}
                    ${this._instancesToHtml(instance.children, showAll)}
                    </div>
                </div>
            </div>
            </div>
        </div>
        `;
        return htmlBody;
    }

    private _propertiesToHtml(instanceName: String, properties: Array<InstanceProperty>, showAll: boolean = false): string {

        let htmlBody = `
        <table class="table table-sm">
        <tbody>
        `;

        for (let i = 0; i < properties.length; i++) {
            let property = properties[i];
            let value = property.value !== null ? property.value : '';
            if (property.value !== null || showAll === true) {
                htmlBody += `
            <tr>
            <td>${property.name}</td>
            <td data-instance="${instanceName}" contenteditable="true" class="_property_value_" name="${property.name}">${value}</td>
            </tr>`;
            }
        }
        htmlBody += '</tbody></table>';
        return htmlBody;
    }

    private _definitionItemToHtml(definition: Concept, allDefinitions: Array<Concept>): string {
        let htmlBody = `
        <div id="accordion${definition.name}" class="accordion accordion-borderless">
          <div class="card">
            <div id="heading${definition.name}">
              <h5 class="mb-0 d-flex justify-content-between align-items-center">
                <button class="accordion-button collapsed" data-toggle="collapse" data-target="#collapse${definition.name}" aria-expanded="false" aria-controls="collapse${definition.name}">
                ${definition.name}
                </button>
                </h5>
              </div>
      
              <div id="collapse${definition.name}" class="collapse" aria-labelledby="heading${definition.name}" data-parent="#accordion${definition.name}">
                <div class="card-body">
      
      
                <div id="accordion${definition.name}Properties" class="accordion accordion-borderless">
                  <div class="card">
                    <div id="heading${definition.name}Properties">
                      <h5 class="mb-0 d-flex justify-content-between align-items-center">
                        <button class="accordion-button collapsed" data-toggle="collapse" data-target="#collapse${definition.name}Properties" aria-expanded="false" aria-controls="collapse${definition.name}Properties">
                        Properties
                        </button>
                      </h5>
                    </div>
      
                    <div id="collapse${definition.name}Properties" class="collapse" aria-labelledby="heading${definition.name}Properties" data-parent="#accordion${definition.name}Properties">
                      <div class="card-body">
                        ${this._defPropertiesToHtml(definition.properties)}
                      </div>
                    </div>
                  </div>
                </div>
                
      
                  <div id="accordion${definition.name}BusinessMapping" class="accordion accordion-borderless">
                    <div class="card">
                      <div id="heading${definition.name}BusinessMapping">
                        <h5 class="mb-0 d-flex justify-content-between align-items-center">
                          <button class="accordion-button collapsed" data-toggle="collapse" data-target="#collapse${definition.name}BusinessMapping" aria-expanded="false" aria-controls="collapse${definition.name}BusinessMapping">
                          BusinessMapping
                          </button>
                        </h5>
                      </div>
      
                      <div id="collapse${definition.name}BusinessMapping" class="collapse" aria-labelledby="heading${definition.name}BusinessMapping" data-parent="#accordion${definition.name}BusinessMapping">
                        <div class="card-body">`;
                          if (definition.businessMappings) {
                            htmlBody += this._businessMappingsToHtml(definition.businessMappings);
                          }
                          htmlBody += `</div>
                      </div>
                    </div>
                  </div>
      
                  <div id="accordion${definition.name}TechnicalMapping" class="accordion accordion-borderless">
                    <div class="card">
                      <div id="heading${definition.name}TechnicalMapping">
                        <h5 class="mb-0 d-flex justify-content-between align-items-center">
                          <button class="accordion-button collapsed" data-toggle="collapse" data-target="#collapse${definition.name}TechnicalMapping" aria-expanded="false" aria-controls="collapse${definition.name}TechnicalMapping">
                          TechnicalMapping
                          </button>
                        </h5>
                      </div>
      
                      <div id="collapse${definition.name}TechnicalMapping" class="collapse" aria-labelledby="heading${definition.name}TechnicalMapping" data-parent="#accordion${definition.name}TechnicalMapping">
                        <div class="card-body">`;
                          if (definition.technicalMappings) {
                              htmlBody += this._technicalMappingsToHtml(definition.technicalMappings);
                          }
                          htmlBody += `</div>
                      </div>
                    </div>
                  </div>
      
      
                  <div id="accordion${definition.name}ReferenceConceptMapping" class="accordion accordion-borderless">
                    <div class="card">
                      <div id="heading${definition.name}ReferenceConceptMapping">
                        <h5 class="mb-0 d-flex justify-content-between align-items-center">
                          <button class="accordion-button collapsed" data-toggle="collapse" data-target="#collapse${definition.name}ReferenceConceptMapping" aria-expanded="false" aria-controls="collapse${definition.name}ReferenceConceptMapping">
                          ReferenceConceptMapping
                          </button>
                        </h5>
                      </div>
      
                      <div id="collapse${definition.name}ReferenceConceptMapping" class="collapse" aria-labelledby="heading${definition.name}ReferenceConceptMapping" data-parent="#accordion${definition.name}ReferenceConceptMapping">
                        <div class="card-body">`;
                          if (definition.referencedConcepts) {
                              htmlBody += this._referenceConceptMappingsToHtml(definition.referencedConcepts);
                          }
                        htmlBody += `</div>
                      </div>
                    </div>
                  </div>
      
                </div>
              </div>
            </div>
        </div>
        `;
    
        if (definition.children) {
          for (let i = 0; i < definition.children.length; i++) {
              let childItem = definition.children[i];
              // filter defintions.items where item.name == childItem
              let childDefinition = allDefinitions.filter((item: { name: string; }) => item.name === childItem)[0];
              if (childDefinition !== undefined) {
                  htmlBody += this._definitionItemToHtml(childDefinition, allDefinitions);
              }
          }
        }
        return htmlBody;
    }

    private _defPropertiesToHtml(properties: Array<ConceptProperty>): string {
        let htmlBody = `
        <table class="table table-sm">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
        `;
    
        for (let i = 0; i < properties.length; i++) {
            let property = properties[i];
            htmlBody += `
            <tr>
              <td>${property.name}</td>
              <td>${property.type}</td>`;
            if (property.generatorProperty !== undefined) {
                htmlBody += `<td>${property.generatorProperty}</td>`;
            }
            else {
                htmlBody += `<td></td>`;
            }
            htmlBody += `</tr>`;
        }
        htmlBody += '</tbody></table>';
        return htmlBody;
    }
    
    private _businessMappingsToHtml(businessMappings: Array<ConceptBusinessMapping>): string {
        let htmlBody = `
        <table class="table table-sm">
        <thead>
          <tr>
            <th scope="col">Db</th>
            <th scope="col">Table</th>
            <th scope="col">Column</th>
            <th scope="col">Property</th>
          </tr>
        </thead>
        <tbody>
        `;
    
        for (let i = 0; i < businessMappings.length; i++) {
            let businessMapping = businessMappings[i];
            htmlBody += `
            <tr>
              <td>${businessMapping.db}</td>
              <td>${businessMapping.table}</td>
              <td>${businessMapping.column}</td>
              <td>${businessMapping.property}</td>
            </tr>`;
        }
        htmlBody += '</tbody></table>';
        return htmlBody;
    }
    
    private _technicalMappingsToHtml(technicalMappings: Array<ConceptTechnicalMapping>) {
        let htmlBody = `
        <table class="table table-sm">
        <thead>
          <tr>
            <th scope="col">Db</th>
            <th scope="col">Table</th>
            <th scope="col">Column</th>
            <th scope="col">Generator</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
        `;
    
        for (let i = 0; i < technicalMappings.length; i++) {
            let technicalMapping = technicalMappings[i];
            htmlBody += `
            <tr>
              <td>${technicalMapping.db}</td>
              <td>${technicalMapping.table}</td>
              <td>${technicalMapping.column}</td>
              <td>${technicalMapping.generator}</td>`;
              if (technicalMapping.generatorProperty !== null && technicalMapping.generatorProperty!== undefined) {
                  htmlBody += `<td>${technicalMapping.generatorProperty}</td>`;
              }
              else {
                  htmlBody += `<td></td>`;
              }
              htmlBody += `</tr>`;
        }
        htmlBody += '</tbody></table>';
        return htmlBody;
    }
    
    private _referenceConceptMappingsToHtml(referenceConceptMappings: Array<ConceptReference>) {
        let htmlBody = `
        <table class="table table-sm">
        <thead>
          <tr>
            <th scope="col">Db</th>
            <th scope="col">Table</th>
            <th scope="col">Column</th>
            <th scope="col">FromDb</th>
            <th scope="col">FromTable</th>
            <th scope="col">FromColumn</th>
            <th scope="col">UseAncestor</th>
          </tr>
        </thead>
        <tbody>
        `;
    
        for (let i = 0; i < referenceConceptMappings.length; i++) {
            let referenceConceptMapping = referenceConceptMappings[i];
            for (let j = 0; j < referenceConceptMapping.details.length; j++) {
                let detail = referenceConceptMapping.details[j];
                htmlBody += `
            <tr>
              <td>${detail.db}</td>
              <td>${detail.table}</td>
              <td>${detail.column}</td>
              <td>${detail.referencedDb}</td>
              <td>${detail.referencedTable}</td>
              <td>${detail.referencedColumn}</td>
              <td>${referenceConceptMapping.useAncestor}</td>
            </tr>`;
            }
        }
        htmlBody += '</tbody></table>';
        return htmlBody;
    }
}
