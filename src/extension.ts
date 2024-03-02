// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('tedviewer.renderDataset', () => {
      // Create and show a new webview
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const documentContent = editor.document.getText();
      //get name of file from full path
      const fileName = editor.document.fileName.replace(/^.*[\\/]/, '');
      let jsonData = JSON.parse(documentContent);
      const panel = vscode.window.createWebviewPanel(
        'TedDataset', // Identifies the type of the webview. Used internally
        'Ted dataset', // Title of the panel displayed to the user
        vscode.ViewColumn.Beside, // Editor column to show the new webview panel in.
        {
          enableScripts: true,
          retainContextWhenHidden: true
        } // Webview options. More on these later.
      );

      panel.webview.html = getWebviewContent(jsonData, editor.document.fileName.replace(/^.*[\\/]/, ''));
    })
  );
}

function getWebviewContent(jsonData: any = {}, fileName: string = '') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <title>${fileName}</title>
</head>
  <body>
    <div class="container">
    <header>
        <div class="navbar navbar-dark bg-dark box-shadow">
            <div class="container d-flex justify-content-between">
                <strong class="masthead-brand">${fileName}</strong>
                <nav class="nav nav-masthead justify-content-center">
                    <a class="nav-link" data-toggle="collapse" href="#collapseInstance" role="button"
                        aria-expanded="true" aria-controls="collapseInstance" href="#">Instances</a>
                    <a class="nav-link" data-toggle="collapse" href="#collapseDefinition" role="button"
                        aria-expanded="false" aria-controls="collapseDefinition" href="#">Definitions</a>
                </nav>
            </div>
        </div>
    </header>

      <div class="collapse show" id="collapseInstance">
        <main>
          <body data-bs-theme="dark">
            <div class="container">
              <section class="jumbotron text-center bg-dark">
                <h1 class="jumbotron-heading">Instances</h1>
              </section>
              ${instancesToHtml(jsonData.items)}
            </div>
          </body>
        </main>
      </div>

      <div class="collapse" id="collapseDefinition">
      <main>
        <body data-bs-theme="dark">
          <div class="container">
            <section class="jumbotron text-center bg-dark">
              <h1 class="jumbotron-heading">Defintions</h1>
            </section>
            ${definitionsToHtml(jsonData.definitions.concepts.items)}
          </div>
        </body>
      </main>
    </div>

    </div>
  </body>
</html>`;
}

function instancesToHtml(instances: any = {}) {
  let htmlBody = "";
  for (let i = 0; i < instances.length; i++) {
    let item = instances[i];
    for (let j = 0; j < item.instances.length; j++) {
      let instance = item.instances[j];
      htmlBody += instanceToHtml(instance);
    }
  }
  return htmlBody;
}

function instanceToHtml(instance: any = {}, headerLevel: number = 1) {
  let htmlBody = `
  <div id="accordion${instance.id}">
    <div class="card">
      <div class="card-header" id="heading${instance.id}">
        <h5 class="mb-0 d-flex justify-content-between align-items-center">
          <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse${instance.id}" aria-expanded="false" aria-controls="collapse${instance.id}">
          ${instance.id}
          </button>
          </h5>
        </div>

        <div id="collapse${instance.id}" class="collapse" aria-labelledby="heading${instance.id}" data-parent="#accordion${instance.id}">
          <div class="card-body">
          ${propertiesToHtml(instance.properties)}
          ${instancesToHtml(instance.children)}
          </div>
        </div>
      </div>
  </div>
  `;
  return htmlBody;
}


function propertiesToHtml(properties: any = {}) {

  let htmlBody = `
  <table class="table">
  <thead>
    <tr>
      <th scope="col">Property</th>
      <th scope="col">Value</th>
    </tr>
  </thead>
  <tbody>
  `;

  for (let i = 0; i < properties.length; i++) {
    let property = properties[i];
    if (property.value !== null){
      htmlBody += `
      <tr>
        <td>${property.name}</td>
        <td>${property.value}</td>
      </tr>`;
    }
  }
  htmlBody += '</tbody></table>';
  return htmlBody;
}


function definitionsToHtml(definitions: any = {}) {
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
  <div id="accordion${definition.name}">
    <div class="card">
      <div class="card-header" id="heading${definition.name}">
        <h5 class="mb-0 d-flex justify-content-between align-items-center">
          <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse${definition.name}" aria-expanded="false" aria-controls="collapse${definition.name}">
          ${definition.name}
          </button>
          </h5>
        </div>

        <div id="collapse${definition.name}" class="collapse" aria-labelledby="heading${definition.name}" data-parent="#accordion${definition.name}">
          <div class="card-body">


          <div id="accordion${definition.name}Properties">
            <div class="card">
              <div class="card-header" id="heading${definition.name}Properties">
                <h5 class="mb-0 d-flex justify-content-between align-items-center">
                  <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse${definition.name}Properties" aria-expanded="false" aria-controls="collapse${definition.name}Properties">
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
          

            <div id="accordion${definition.name}BusinessMapping">
              <div class="card">
                <div class="card-header" id="heading${definition.name}BusinessMapping">
                  <h5 class="mb-0 d-flex justify-content-between align-items-center">
                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse${definition.name}BusinessMapping" aria-expanded="false" aria-controls="collapse${definition.name}BusinessMapping">
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

            <div id="accordion${definition.name}TechnicalMapping">
              <div class="card">
                <div class="card-header" id="heading${definition.name}TechnicalMapping">
                  <h5 class="mb-0 d-flex justify-content-between align-items-center">
                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse${definition.name}TechnicalMapping" aria-expanded="false" aria-controls="collapse${definition.name}TechnicalMapping">
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


            <div id="accordion${definition.name}ReferenceConceptMapping">
              <div class="card">
                <div class="card-header" id="heading${definition.name}ReferenceConceptMapping">
                  <h5 class="mb-0 d-flex justify-content-between align-items-center">
                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse${definition.name}ReferenceConceptMapping" aria-expanded="false" aria-controls="collapse${definition.name}ReferenceConceptMapping">
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
    if (childDefinition!== undefined){
      htmlBody += definitionItemToHtml(childDefinition, allDefinitions);
    }
  }
  return htmlBody;
}

function defPropertiesToHtml(properties: any = {}) {
  let htmlBody = `
  <table class="table">
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
        if (property.generatorProperty!== undefined) {
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
  <table class="table">
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
  <table class="table">
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
  <table class="table">
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
    for (let j = 0; j < referenceConceptMapping.details.length; j++){
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

// This method is called when your extension is deactivated
export function deactivate() { }
