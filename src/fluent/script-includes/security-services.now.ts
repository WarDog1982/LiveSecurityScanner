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

export const MatcherService = ScriptInclude({
    $id: Now.ID['MatcherService'],
    name: 'MatcherService',
    script: Now.include('../../server/script-includes/matcher-service.js'),
    description: 'Service to perform deterministic matching of advisories against inventory',
    apiName: 'x_138679_livesecur.MatcherService',
    callerAccess: 'tracking',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true
})

export const EnrichmentService = ScriptInclude({
    $id: Now.ID['EnrichmentService'],
    name: 'EnrichmentService',
    script: Now.include('../../server/script-includes/enrichment-service.js'),
    description: 'Service to enrich security findings with LLM-generated remediation guidance',
    apiName: 'x_138679_livesecur.EnrichmentService',
    callerAccess: 'tracking',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true
})