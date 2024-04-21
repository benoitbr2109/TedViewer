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
exports.TedTestCase = void 0;
const vscode = __importStar(require("vscode"));
const instance_1 = require("./instance");
const definition_1 = require("./definition/definition");
class TedTestCase {
    interface;
    instances;
    definitions;
    globalDefinition;
    constructor(json, jsonDefinition) {
        this.interface = JSON.parse(json);
        this.definitions = new definition_1.Definitions(this.interface.definitions);
        this.globalDefinition = new definition_1.Definitions(jsonDefinition);
        this.instances = new instance_1.Instances(this.interface.items, this.globalDefinition);
    }
    static fromJson(json, jsonDefinition) {
        return new TedTestCase(json, jsonDefinition);
    }
    async addConceptToInstance(concept, instanceId) {
        return await this._addConceptToInstance(this.instances.items, concept, instanceId);
    }
    updateSingleTedItemInstance(tedItem) {
        let currentTedItem = this.instances.findTedItemByConcept(tedItem.concept);
        if (currentTedItem !== undefined) {
            let currentInstance = currentTedItem.instances.filter((item) => item.id === tedItem.instances[0].id)[0];
            currentInstance.properties = tedItem.instances[0].properties;
            for (let i = 0; i < tedItem.instances[0].references.length; ++i) {
                let newReference = tedItem.instances[0].references[i];
                for (let j = 0; j < currentInstance.references.length; ++j) {
                    if (currentInstance.references[j].referenceName === newReference.referenceName) {
                        currentInstance.references[j].instanceId = newReference.instanceId;
                    }
                }
            }
        }
    }
    deleteItem(tedItem) {
        let currentTedItem = this.instances.findTedItemByConcept(tedItem.concept);
        if (currentTedItem !== undefined) {
            let currentInstance = currentTedItem.instances.filter((item) => item.id === tedItem.instances[0].id)[0];
            const index = currentTedItem.instances.indexOf(currentInstance);
            if (index > -1) {
                currentTedItem.instances.splice(index, 1);
            }
        }
    }
    async _addConceptToInstance(instances, concept, instanceId, hierarchy) {
        let isUpdated = false;
        for (let i = 0; i < instances.length; i++) {
            let item = instances[i];
            for (let j = 0; j < item.instances.length; j++) {
                let instance = item.instances[j];
                if (hierarchy === undefined) {
                    hierarchy = new Map();
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
                    let existingChildConcept = instance.children.filter((child) => child.concept === concept);
                    if (existingChildConcept.length === 0) {
                        let instanceChild = {
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
                    if (isUpdated) {
                        break;
                    }
                    isUpdated = await this._addConceptToInstance(instance.children, concept, instanceId, hierarchy);
                }
            }
        }
        return isUpdated;
    }
}
exports.TedTestCase = TedTestCase;
//# sourceMappingURL=tedTestCase.js.map