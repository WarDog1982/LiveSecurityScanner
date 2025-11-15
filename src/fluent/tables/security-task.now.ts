import '@servicenow/sdk/global'
import { Table, ReferenceColumn } from '@servicenow/sdk/core'

export const x_138679_livesecur_sec_task = Table({
    name: 'x_138679_livesecur_sec_task',
    label: 'Security Review Task',
    extends: 'task',
    schema: {
        finding_ref: ReferenceColumn({
            label: 'Security Finding',
            referenceTable: 'x_138679_livesecur_finding',
            attributes: {
                encode_utf8: false,
            },
        }),
    },
    accessibleFrom: 'public',
    callerAccess: 'tracking',
    actions: ['read', 'update', 'delete', 'create'],
    allowWebServiceAccess: true,
    audit: true,
    allowClientScripts: false,
    allowNewFields: false,
    allowUiActions: false,
})
