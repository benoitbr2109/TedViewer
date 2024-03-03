
export function instancesToHtml(instances: any = {}) {
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
    <div id="accordion${instance.id}" class="accordion accordion-borderless">
      <div class="card">
        <div id="heading${instance.id}">
          <h5 class="mb-0 d-flex justify-content-between align-items-center">
            <button class="accordion-button collapsed" data-toggle="collapse" data-target="#collapse${instance.id}" aria-expanded="false" aria-controls="collapse${instance.id}">
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
    <table class="table table-sm">
    <tbody>
    `;

    for (let i = 0; i < properties.length; i++) {
        let property = properties[i];
        if (property.value !== null) {
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