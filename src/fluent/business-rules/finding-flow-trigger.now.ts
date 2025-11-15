import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'

export const FindingFlowTrigger = BusinessRule({
    $id: Now.ID['finding_flow_trigger'],
    name: 'LiveSecurityScanner - Finding Flow Trigg',
    table: 'x_138679_livesecur_finding',
    when: 'after',
    action: ['insert'],
    script: Now.include('../../server/business-rules/finding-flow-trigger.js'),
    order: 100,
    active: true,
    description: 'Triggers Flow automation when new security findings are created',
})
