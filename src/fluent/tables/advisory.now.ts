import '@servicenow/sdk/global'
import { Table, StringColumn, DateColumn, ChoiceColumn } from '@servicenow/sdk/core'

export const x_138679_livesecur_advisory = Table({
    name: 'x_138679_livesecur_advisory',
    label: 'Security Advisory',
    schema: {
        source: StringColumn({ 
            label: 'Source', 
            mandatory: true,
            maxLength: 100,
            choices: {
                servicenow: { label: 'ServiceNow', sequence: 0 },
                nvd: { label: 'NVD CVE', sequence: 1 }
            },
            dropdown: 'dropdown_with_none'
        }),
        advisory_id: StringColumn({ 
            label: 'Advisory ID', 
            mandatory: true, 
            maxLength: 200 
        }),
        title: StringColumn({ 
            label: 'Title', 
            mandatory: true, 
            maxLength: 500 
        }),
        description: StringColumn({ 
            label: 'Description', 
            maxLength: 8000
        }),
        published_date: DateColumn({ 
            label: 'Published Date' 
        }),
        severity: ChoiceColumn({
            label: 'Severity',
            choices: {
                unknown: { label: 'Unknown', sequence: 0 },
                low: { label: 'Low', sequence: 1 },
                medium: { label: 'Medium', sequence: 2 },
                high: { label: 'High', sequence: 3 },
                critical: { label: 'Critical', sequence: 4 }
            },
            dropdown: 'dropdown_with_none'
        }),
        cve_ids: StringColumn({ 
            label: 'CVE IDs', 
            maxLength: 1000 
        }),
        product_list: StringColumn({ 
            label: 'Product List (JSON)', 
            maxLength: 8000 
        }),
        raw_payload: StringColumn({ 
            label: 'Raw Payload (JSON)', 
            maxLength: 8000 
        })
    },
    display: 'title',
    accessible_from: 'public',
    caller_access: 'tracking',
    actions: ['create', 'read', 'update', 'delete'],
    allow_web_service_access: true,
    audit: true,
    index: [
        { name: 'idx_advisory_id', element: 'advisory_id', unique: true },
        { name: 'idx_source', element: 'source', unique: false },
        { name: 'idx_published_date', element: 'published_date', unique: false }
    ]
})