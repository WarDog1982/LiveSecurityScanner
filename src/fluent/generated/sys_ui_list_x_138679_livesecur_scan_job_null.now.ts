import { List, default_view } from '@servicenow/sdk/core'

List({
    table: 'x_138679_livesecur_scan_job',
    view: default_view,
    columns: ['finished_at', 'job_status', 'scheduled_by', 'started_at', 'summary'],
})
