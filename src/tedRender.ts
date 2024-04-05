import * as vscode from 'vscode';
import { TedTestCase, TedTestCaseInterface } from './tedTestCase';
import { Webview, WebviewPanelOptions, WebviewPanel } from 'vscode';
import { TedItem } from './instance';

export class TedRenderProvider implements vscode.CustomTextEditorProvider {

  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new TedRenderProvider(context);
    const webviewOptions: WebviewPanelOptions = {
      retainContextWhenHidden: true
    };
    const providerRegistration = vscode.window.registerCustomEditorProvider(TedRenderProvider.viewType, provider, {webviewOptions});
    return providerRegistration;
  }

  private static readonly viewType = 'tedviewer.render';
  tedTestCase!: TedTestCase;
  showAll: boolean;

  constructor(
    private readonly context: vscode.ExtensionContext
  ) { 
    this.showAll = false;
  }

  public async resolveCustomTextEditor(
    document: vscode.TextDocument,
    webviewPanel: vscode.WebviewPanel,
    _token: vscode.CancellationToken
  ): Promise<void> {
    // Setup initial content for the webview
    webviewPanel.webview.options = {
      enableScripts: true,
    };
    const fileName = document.fileName.replace(/^.*[\\/]/, '');
    const workbenchConfig = vscode.workspace.getConfiguration('tedViewer');
    let definitionPath = workbenchConfig.get('definitionLocation');
    let definition = undefined;
    if (typeof(definitionPath) === 'string' && definitionPath != ''){
      const vsPath = vscode.Uri.file(definitionPath);
      let defintitionDoc = await vscode.workspace.openTextDocument(vsPath);
      definition = defintitionDoc.getText();
    }

    this.tedTestCase = TedTestCase.fromJson(document.getText(), definition);
    webviewPanel.webview.html = this.getWebviewContent(fileName);

    webviewPanel.webview.onDidReceiveMessage(async e => {
      switch (e.command) {
        case 'showAll':
          this.showAll = !this.showAll;
          webviewPanel.webview.html = this.getWebviewContent(fileName);
          return;
        case 'editItem':
          var updatedData: TedItem = JSON.parse(e.content);
          this.tedTestCase.updateSingleTedItemInstance(updatedData);
          this.updateTextDocument(document);
          webviewPanel.webview.html = this.getWebviewContent(fileName);
          return;
        case 'addItem':
          let addedItem = JSON.parse(e.content);
          let isAdded = await this.tedTestCase.addConceptToInstance(addedItem.addedconcept, addedItem.instanceId);
          if (isAdded){
            this.updateTextDocument(document);
            webviewPanel.webview.html = this.getWebviewContent(fileName);
          }
          return;
      }
    });

    vscode.workspace.onDidChangeTextDocument(e => {
      this.tedTestCase = TedTestCase.fromJson(document.getText());
      webviewPanel.webview.html = this.getWebviewContent(fileName);
    });

  }

  private updateTextDocument(document: vscode.TextDocument) {
		const edit = new vscode.WorkspaceEdit();

		// Just replace the entire document every time for this example extension.
		// A more complete extension should compute minimal edits instead.
		edit.replace(
			document.uri,
			new vscode.Range(0, 0, document.lineCount, 0),
			JSON.stringify(this.tedTestCase.interface, null, 2));

		return vscode.workspace.applyEdit(edit);
	}
  

  private getWebviewContent(fileName: string = ''): string {
    return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"/>
          <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"/>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
      
          <!-- Font Awesome -->
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
          <!-- Google Fonts -->
          <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
          <!-- MDB -->
          <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/7.1.0/mdb.min.css" rel="stylesheet" />
          
          <!-- MDB -->
          <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/7.1.0/mdb.umd.min.js"></script>
      
      
      </head>
        <body>
          <div class="container-fluid">
            <header>
                <nav class="navbar navbar-expand-lg shadow-none">
                    <div class="container-fluid">
                        <p class="navbar-brand" href="#">${fileName}</p>
                        <nav class="nav nav-masthead justify-content-center">
                            <ul class="navbar-nav bd-navbar-nav flex-row">
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="collapse" role="button" href="#collapseInstance" aria-expanded="true" aria-controls="collapseInstance">Instances</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="collapse" role="button" href="#collapseDefinition" aria-expanded="true" aria-controls="collapseDefinition">Definitions</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </nav>
            </header>
            <main>

              <div id="accordion" class="pt-3">
                <div class="collapse show" id="collapseInstance" data-parent="#accordion">
                  <div class="container-fluid">      
                    ${this.tedTestCase.instances.toHtml(this.tedTestCase.definitions, this.showAll)}
                  </div>
                </div>
      
                <div class="collapse" id="collapseDefinition" data-parent="#accordion">
                  <div class="container-fluid">
                      ${this.tedTestCase.globalDefinition.toHtml()}
                  </div>
                </div>
      
              </div>
            </main>
          </div>
      
          <script>
            const vscode = acquireVsCodeApi();

            function addItem(instanceId, addedconcept){
                const dataMap = {
                    'instanceId': instanceId,  
                    'addedconcept': addedconcept
                };
                vscode.postMessage({command: 'addItem',content: JSON.stringify(dataMap)});
            }

            function editConfirm(modalId){
              const input = document.getElementById(modalId);
              var instance = modalId.getElementsByClassName("_instance_")[0];
              var groups = modalId.getElementsByClassName("form-group row");
              var properties = [];
              var references = [];
              var instanceId = instance.attributes['id'].value
              var concept = instance.attributes['data-concept'].value
              for (var i = 0; i < groups.length; i++) {
                var group = groups[i];
                var inputGroup = group.getElementsByTagName("input")[0];

                var propertyType = inputGroup.attributes['data-type'].value;
                var property = {};

                if (propertyType == "property") {
                  property['name'] = inputGroup.attributes['name'].value;
                  property['value'] = inputGroup.value == ""? null : inputGroup.value;
                  properties.push(property);
                }
                else if (propertyType == "reference") {
                  property['referenceName'] = inputGroup.attributes['name'].value;
                  property['instanceId'] = inputGroup.value == ""? null : inputGroup.value;
                  references.push(property);
                }
              }

              var tedInstance = {
                'id': instanceId,
                'properties': properties,
                'references': references};
              var tedItem = {
                'concept': concept,
                'instances': [tedInstance]
              };
              vscode.postMessage({command: 'editItem',content: JSON.stringify(tedItem)});
            }


          </script>
      
        </body>
      </html>`;
  }
}

