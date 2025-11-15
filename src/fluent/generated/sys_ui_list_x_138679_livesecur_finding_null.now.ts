import { List, default_view } from '@servicenow/sdk/core'

List({
    table: 'x_138679_livesecur_finding',
    view: default_view,
    columns: [
        'advisory_ref',
        'artifact_sys_id',
        'detected_on',
        'instance_artifact',
        'match_confidence',
        'priority',
        'remediation_text',
        'risk_score',
        'status',
    ],
})
