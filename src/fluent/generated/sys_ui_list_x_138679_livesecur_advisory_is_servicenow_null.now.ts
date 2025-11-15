import { List, default_view } from '@servicenow/sdk/core'

List({
    table: 'x_138679_livesecur_advisory_is_servicenow',
    view: default_view,
    columns: [
        'advisory_id',
        'cve_ids',
        'description',
        'error_message',
        'import_state',
        'product_list',
        'published_date',
        'raw_payload',
        'severity',
        'source',
    ],
})
