// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { instancesToHtml } from './instances';
import { definitionsToHtml } from './definitions';


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

      panel.webview.onDidReceiveMessage(
        message => {
          switch (message.command) {
            case 'search':
              console.log(message.text);
              return;
          }
        },
        undefined,
        context.subscriptions
      );
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
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <div class="container-fluid">
                  <a class="navbar-brand" href="#">${fileName}</a>
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
              <section class="jumbotron text-center bg-light">
                <h1 class="jumbotron-heading">Instances</h1>
              </section>
              ${instancesToHtml(jsonData.items)}
            </div>
          </div>

          <div class="collapse" id="collapseDefinition" data-parent="#accordion">
            <div class="container-fluid">
              <section class="jumbotron text-center bg-light">
                <h1 class="jumbotron-heading">Definitions</h1>
              </section>
                ${definitionsToHtml(jsonData.definitions.concepts.items)}
            </div>
          </div>

        </div>
      </main>
    </div>

    <script>
      const vscode = acquireVsCodeApi();
      function search(){
        const input = document.getElementById("searchText");
        let text_ = input.value;
        vscode.postMessage({command: 'search',text: text_})
      }
    </script>

  </body>
</html>`;
}


// This method is called when your extension is deactivated
export function deactivate() { }
