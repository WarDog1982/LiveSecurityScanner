import '@servicenow/sdk/global'
import { RestApi } from '@servicenow/sdk/core'
import { getInventory } from '../../server/scripted-rest/inventory-handler.js'

export const LiveSecurityInventoryAPI = RestApi({
    $id: Now.ID['inventory_api'],
    name: 'LiveSecurity Inventory API',
    service_id: 'inventory',
    short_description: 'API to retrieve instance inventory for security scanning',
    consumes: 'application/json',
    produces: 'application/json',
    routes: [
        {
            $id: Now.ID['inventory_route'],
            name: 'Get Inventory',
            path: '/',
            method: 'GET',
            script: getInventory,
            short_description: 'Retrieve complete instance inventory including plugins, apps, and modules',
            authorization: true,
            authentication: true,
            active: true
        }
    ],
    active: true,
    enforce_acl: []
})