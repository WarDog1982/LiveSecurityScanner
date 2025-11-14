import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'
import { onFindingCreated } from '../../server/business-rules/finding-flow-trigger.js'

export const FindingFlowTrigger = BusinessRule({
    $id: Now.ID['finding_flow_trigger'],
    name: 'LiveSecurityScanner - Finding Flow Trigger',
    table: 'x_138679_livesecur_finding',
    when: 'after',
    action: ['insert'],
    script: onFindingCreated,
    order: 100,
    active: true,
    description: 'Triggers Flow automation when new security findings are created'
})