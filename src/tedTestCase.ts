import * as vscode from 'vscode';
import { Instance, InstanceReference, Instances, TedItem } from './instance';
import { ConceptReference, Definitions, TedDefinition } from './definition/definition';

export interface TedTestCaseInterface {
  items: Array<TedItem>;
  nssos: Array<string>;
  companyIds: Array<string>;
  definitions: TedDefinition;
}

export class TedTestCase {
  interface: TedTestCaseInterface;
  instances: Instances;
  definitions: Definitions;
  globalDefinition: Definitions;

  private constructor(json: string, jsonDefinition?: string) {
    this.interface = JSON.parse(json);
    this.definitions = new Definitions(this.interface.definitions);
    this.globalDefinition = new Definitions(jsonDefinition);
    this.instances = new Instances(this.interface.items, this.globalDefinition);
  }

  public static fromJson(json: string, jsonDefinition?: string) {
    return new TedTestCase(json, jsonDefinition);
  }

  public async addConceptToInstance(concept: string, instanceId: string): Promise<boolean> {
    return await this._addConceptToInstance(this.instances.items, concept, instanceId);
  }

  public updateSingleTedItemInstance(tedItem: TedItem){
    let currentTedItem = this.instances.findTedItemByConcept(tedItem.concept);
    if(currentTedItem !== undefined){
      let currentInstance = currentTedItem.instances.filter((item: Instance) => item.id === tedItem.instances[0].id)[0];
      currentInstance.properties = tedItem.instances[0].properties;
      for(let i=0; i < tedItem.instances[0].references.length; ++i){
        let newReference = tedItem.instances[0].references[i];
        for(let j=0; j < currentInstance.references.length; ++j){
          if(currentInstance.references[j].referenceName === newReference.referenceName){
            currentInstance.references[j].instanceId = newReference.instanceId;
          }
        }
      }
    }
  }

  public deleteItem(tedItem: TedItem){
    let currentTedItem = this.instances.findTedItemByConcept(tedItem.concept);
    if (currentTedItem!== undefined) {
      let currentInstance = currentTedItem.instances.filter((item: Instance) => item.id === tedItem.instances[0].id)[0];
      const index = currentTedItem.instances.indexOf(currentInstance);
      if (index > -1) {
        currentTedItem.instances.splice(index, 1);
     }
    }
  }


  private async _addConceptToInstance(instances: Array<TedItem>, concept: string, instanceId: string, hierarchy?: Map<string, string>): Promise<boolean> {
    let isUpdated = false;
    for (let i = 0; i < instances.length; i++) {
      let item = instances[i];
      for (let j = 0; j < item.instances.length; j++) {
        let instance = item.instances[j];
        if (hierarchy === undefined) {
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
          let newInstance = this.instances.generateInstance(instanceId, concept, hierarchy);
          if (newInstance === undefined) {
            return false;
          }
          let existingChildConcept = instance.children.filter((child: TedItem) => child.concept === concept);
          if (existingChildConcept.length === 0) {
            let instanceChild: TedItem = {
              concept: concept,
              instances: [newInstance]
            };
            instance.children.push(instanceChild);
          }
          else {
            existingChildConcept[0].instances.push(newInstance);
          }
          return true;
        }
        else {
          if(isUpdated){
            break;
          }
          isUpdated = await this._addConceptToInstance(instance.children, concept, instanceId, hierarchy);
        }
      }
    }
    return isUpdated;
  }

}
