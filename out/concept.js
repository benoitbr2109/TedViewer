"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listDistinctDefinitionDatabases = void 0;
function listDistinctDefinitionDatabases(definition) {
    let databases = Array();
    for (let i = 0; i < definition.tables.length; i++) {
        let table = definition.tables[i];
        if (databases.indexOf(table.db) === -1) {
            databases.push(table.db);
        }
    }
    return databases;
}
exports.listDistinctDefinitionDatabases = listDistinctDefinitionDatabases;
//# sourceMappingURL=concept.js.map