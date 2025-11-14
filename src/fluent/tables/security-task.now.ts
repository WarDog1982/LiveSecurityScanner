import '@servicenow/sdk/global'
import { Table, ReferenceColumn } from '@servicenow/sdk/core'

export const x_138679_livesecur_sec_task = Table({
    name: 'x_138679_livesecur_sec_task',
    label: 'Security Review Task',
    extends: 'task',
    schema: {
        finding_ref: ReferenceColumn({
            label: 'Security Finding',
            referenceTable: 'x_138679_livesecur_finding'
        })
    },
    display: 'short_description',
    accessible_from: 'public',
    caller_access: 'tracking',
    actions: ['create', 'read', 'update', 'delete'],
    allow_web_service_access: true,
    audit: true
})