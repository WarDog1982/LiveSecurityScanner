import '@servicenow/sdk/global'
import { RestApi } from '@servicenow/sdk/core'

export const LiveSecurityScannerAPI = RestApi({
    $id: Now.ID['livesecurityscannerapi'],
    name: 'LiveSecurityScannerAPI',
    service_id: 'x_138679_livesecur',
    active: true,
    short_description: 'REST API for LiveSecurityScanner live data operations',
    routes: [
        {
            $id: Now.ID['inventory_route'],
            name: 'Inventory',
            path: '/x_138679_livesecur/x_138679_livesecur/inventory',
            method: 'GET',
            script: Now.include('../../server/scripted-rest/inventory-handler.js'),
            short_description: 'Live instance inventory enumeration endpoint',
            consumes: 'application/json,application/xml,text/xml',
            produces: 'application/json,application/xml,text/xml',
        },
        {
            $id: Now.ID['ingest_route'],
            name: 'LiveDataIngest',
            path: '/x_138679_livesecur/x_138679_livesecur/ingest',
            method: 'POST',
            script: Now.include('../../server/scripted-rest/ingest-handler.js'),
            short_description: 'Live data ingestion from ServiceNow KB and NVD endpoints',
            consumes: 'application/json,application/xml,text/xml',
            produces: 'application/json,application/xml,text/xml',
        },
    ],
})