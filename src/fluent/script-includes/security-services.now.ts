import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

export const InventoryService = ScriptInclude({
    $id: Now.ID['InventoryService'],
    name: 'InventoryService',
    script: Now.include('../../server/script-includes/inventory-service.js'),
    description: 'Service to enumerate live instance inventory including plugins, apps, and modules',
    apiName: 'x_138679_livesecur.InventoryService',
    callerAccess: 'tracking',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true
})

export const LiveDataIngestionService = ScriptInclude({
    $id: Now.ID['LiveDataIngestionService'],
    name: 'LiveDataIngestionService', 
    script: Now.include('../../server/script-includes/live-data-ingestion.js'),
    description: 'Service to fetch live security data from ServiceNow KB and NVD CVE 2.0 API endpoints',
    apiName: 'x_138679_livesecur.LiveDataIngestionService',
    callerAccess: 'tracking',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true
})