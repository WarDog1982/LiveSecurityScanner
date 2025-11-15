import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

export const InventoryService = ScriptInclude({
    $id: Now.ID['InventoryService'],
    name: 'InventoryService',
    script: Now.include('../../server/script-includes/inventory-service.js'),
    description: 'Service to enumerate instance inventory including plugins, apps, and modules',
    apiName: 'x_138679_livesecur.InventoryService',
    callerAccess: 'tracking',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true
})