import '@servicenow/sdk/global'
import { Table, StringColumn, DateTimeColumn, ChoiceColumn, ReferenceColumn } from '@servicenow/sdk/core'

export const x_138679_livesecur_scan_job = Table({
    name: 'x_138679_livesecur_scan_job',
    label: 'Scan Job',
    schema: {
        scheduled_by: ReferenceColumn({
            label: 'Scheduled By',
            referenceTable: 'sys_user',
            mandatory: true,
            attributes: {
                encode_utf8: false,
            },
        }),
        started_at: DateTimeColumn({
            label: 'Started At',
        }),
        finished_at: DateTimeColumn({
            label: 'Finished At',
        }),
        job_status: ChoiceColumn({
            label: 'Job Status',
            mandatory: true,
            choices: {
                queued: { label: 'Queued', sequence: 0 },
                running: { label: 'Running', sequence: 1 },
                success: { label: 'Success', sequence: 2 },
                partial: { label: 'Partial', sequence: 3 },
                failed: { label: 'Failed', sequence: 4 },
            },
            dropdown: 'dropdown_with_none',
            default: 'queued',
        }),
        summary: StringColumn({
            label: 'Summary',
            maxLength: 1000,
        }),
    },
    display: 'job_status',
    accessibleFrom: 'public',
    callerAccess: 'tracking',
    actions: ['read', 'update', 'delete', 'create'],
    allowWebServiceAccess: true,
    audit: true,
    index: [
        { name: 'index', element: 'job_status', unique: false },
        { name: 'index3', element: 'started_at', unique: false },
        {
            name: 'index',
            unique: false,
            element: 'scheduled_by',
        },
    ],
    allowClientScripts: false,
    allowNewFields: false,
    allowUiActions: false,
})
