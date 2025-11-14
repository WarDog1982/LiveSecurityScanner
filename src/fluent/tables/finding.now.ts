import '@servicenow/sdk/global'
import { Table, StringColumn, DateTimeColumn, ChoiceColumn, IntegerColumn, DecimalColumn, ReferenceColumn } from '@servicenow/sdk/core'

export const x_138679_livesecur_finding = Table({
    name: 'x_138679_livesecur_finding',
    label: 'Security Finding',
    schema: {
        advisory_ref: ReferenceColumn({
            label: 'Advisory Reference',
            referenceTable: 'x_138679_livesecur_advisory',
            mandatory: true
        }),
        instance_artifact: StringColumn({ 
            label: 'Instance Artifact', 
            mandatory: true,
            maxLength: 200 
        }),
        artifact_sys_id: StringColumn({ 
            label: 'Artifact Sys ID', 
            maxLength: 32 
        }),
        match_confidence: DecimalColumn({ 
            label: 'Match Confidence (0-1)',
            maxLength: 5 
        }),
        status: ChoiceColumn({
            label: 'Status',
            mandatory: true,
            choices: {
                new: { label: 'New', sequence: 0 },
                triage: { label: 'Triage', sequence: 1 },
                accepted: { label: 'Accepted', sequence: 2 },
                remediated: { label: 'Remediated', sequence: 3 },
                dismissed: { label: 'Dismissed', sequence: 4 },
                failed: { label: 'Failed', sequence: 5 }
            },
            dropdown: 'dropdown_with_none',
            default: 'new'
        }),
        remediation_text: StringColumn({ 
            label: 'Remediation Text', 
            maxLength: 8000 
        }),
        detected_on: DateTimeColumn({ 
            label: 'Detected On',
            mandatory: true
        }),
        risk_score: IntegerColumn({ 
            label: 'Risk Score',
            min: 0,
            max: 100
        }),
        priority: ChoiceColumn({
            label: 'Priority',
            choices: {
                low: { label: 'Low', sequence: 0 },
                medium: { label: 'Medium', sequence: 1 },
                high: { label: 'High', sequence: 2 },
                critical: { label: 'Critical', sequence: 3 }
            },
            dropdown: 'dropdown_with_none'
        })
    },
    display: 'instance_artifact',
    accessible_from: 'public',
    caller_access: 'tracking',
    actions: ['create', 'read', 'update', 'delete'],
    allow_web_service_access: true,
    audit: true,
    index: [
        { name: 'idx_artifact_sys_id', element: 'artifact_sys_id', unique: false },
        { name: 'idx_status', element: 'status', unique: false },
        { name: 'idx_priority', element: 'priority', unique: false }
    ]
})