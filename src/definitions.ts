
export function definitionsToHtml(definitions: any = {}) {
    let htmlBody = "";
    // filter definition.items where item.root == true
    let rootItems = definitions.filter((item: { root: boolean; }) => item.root === true);

    for (let i = 0; i < rootItems.length; i++) {
        let rootItem = rootItems[i];
        htmlBody += definitionItemToHtml(rootItem, definitions);
    }

    return htmlBody;
}


function definitionItemToHtml(definition: any = {}, allDefinitions: any = {}) {
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
                    ${defPropertiesToHtml(definition.properties)}
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
                    <div class="card-body">
                      ${businessMappingsToHtml(definition.businessMappings)}
                    </div>
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
                    <div class="card-body">
                      ${technicalMappingsToHtml(definition.technicalMappings)}
                    </div>
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
                    <div class="card-body">
                      ${referenceConceptMappingsToHtml(definition.referencedConcepts)}
                    </div>
                  </div>
                </div>
              </div>
  
            </div>
          </div>
        </div>
    </div>
    `;


    for (let i = 0; i < definition.children.length; i++) {
        let childItem = definition.children[i];
        // filter defintions.items where item.name == childItem
        let childDefinition = allDefinitions.filter((item: { name: string; }) => item.name === childItem)[0];
        if (childDefinition !== undefined) {
            htmlBody += definitionItemToHtml(childDefinition, allDefinitions);
        }
    }
    return htmlBody;
}

function defPropertiesToHtml(properties: any = {}) {
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

function businessMappingsToHtml(businessMappings: any = {}) {
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

function technicalMappingsToHtml(technicalMappings: any = {}) {
    let htmlBody = `
    <table class="table table-sm">
    <thead>
      <tr>
        <th scope="col">Db</th>
        <th scope="col">Table</th>
        <th scope="col">Column</th>
        <th scope="col">Generator</th>
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
          <td>${technicalMapping.generator}</td>
        </tr>`;
    }
    htmlBody += '</tbody></table>';
    return htmlBody;
}

function referenceConceptMappingsToHtml(referenceConceptMappings: any = {}) {
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