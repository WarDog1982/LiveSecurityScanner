import '@servicenow/sdk/global'
import { Table, StringColumn } from '@servicenow/sdk/core'

export const x_138679_livesecur_advisory_is_servicenow = Table({
    name: 'x_138679_livesecur_advisory_is_servicenow',
    label: 'ServiceNow Advisory Import Set',
    schema: {
        source: StringColumn({ 
            label: 'Source', 
            maxLength: 100 
        }),
        advisory_id: StringColumn({ 
            label: 'Advisory ID', 
            maxLength: 200 
        }),
        title: StringColumn({ 
            label: 'Title', 
            maxLength: 500 
        }),
        description: StringColumn({ 
            label: 'Description', 
            maxLength: 8000
        }),
        published_date: StringColumn({ 
            label: 'Published Date', 
            maxLength: 50 
        }),
        severity: StringColumn({ 
            label: 'Severity', 
            maxLength: 50 
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
        }),
        import_state: StringColumn({ 
            label: 'Import State', 
            maxLength: 50,
            default: 'pending'
        }),
        error_message: StringColumn({ 
            label: 'Error Message', 
            maxLength: 1000 
        })
    },
    display: 'advisory_id',
    accessible_from: 'public',
    caller_access: 'tracking',
    actions: ['create', 'read', 'update', 'delete'],
    allow_web_service_access: true
})