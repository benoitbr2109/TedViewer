"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TedTestCase = void 0;
class TedTestCase {
    instances;
    definitions;
    constructor(instances, definitions) {
        this.instances = instances;
        this.definitions = definitions;
    }
    static fromJson(json) {
        return new TedTestCase(json.items, json.definitions.concepts.items);
    }
    instancesToHtml(instances = {}, showAll = false) {
        let htmlBody = "";
        for (let i = 0; i < instances.length; i++) {
            let item = instances[i];
            for (let j = 0; j < item.instances.length; j++) {
                let instance = item.instances[j];
                htmlBody += this.instanceToHtml(instance, showAll);
            }
        }
        return htmlBody;
    }
    instanceToHtml(instance = {}, showAll = false) {
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
                                <div class="col-auto align-self-center">
                                    <button type="button"
                                    class="btn btn-sm btn-outline-primary dropdown-toggle"
                                    id="dropdownMenuButton" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">myButton</button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="#">Action</a>
                                        <a class="dropdown-item" href="#">Another action</a>
                                        <a class="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </h5>
                </div>
            </div>
    
            <div id="collapse${instance.id}" class="accordion-collapse collapse show" aria-labelledby="heading${instance.id}" data-parent="#accordion${instance.id}">
                <div class="card-body">
                    <div id="${instance.id}" class="_instance_">
                    ${this.propertiesToHtml(instance.id, instance.properties, showAll)}
                    ${this.instancesToHtml(instance.children, showAll)}
                    </div>
                </div>
            </div>
            </div>
        </div>
        `;
        return htmlBody;
    }
    propertiesToHtml(instanceName, properties = {}, showAll = false) {
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
}
exports.TedTestCase = TedTestCase;
//# sourceMappingURL=instances.js.map