import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Sample Security Advisory Records
export const sampleAdvisory1 = Record({
    $id: Now.ID['sample_advisory_1'],
    table: 'x_138679_livesecur_advisory',
    data: {
        source: 'servicenow',
        advisory_id: 'KB1226057',
        title: 'ServiceNow Security Advisory - Multiple Vulnerabilities in Platform Components',
        description: 'ServiceNow has identified multiple security vulnerabilities affecting various platform components. These vulnerabilities could allow unauthorized access, privilege escalation, or data exposure.',
        published_date: '2024-01-15',
        severity: 'high',
        cve_ids: 'CVE-2024-0001,CVE-2024-0002',
        product_list: '[{"vendor":"ServiceNow","product":"ServiceNow Platform","version":"Utah","range":">=Utah"},{"vendor":"ServiceNow","product":"Now Platform","version":"Vancouver","range":">=Vancouver"}]',
        raw_payload: '{"source":"servicenow_kb","fetched":"2024-01-20 10:30:00","classification":"security_advisory"}'
    },
    $meta: { installMethod: 'demo' }
})

export const sampleAdvisory2 = Record({
    $id: Now.ID['sample_advisory_2'],
    table: 'x_138679_livesecur_advisory',
    data: {
        source: 'nvd',
        advisory_id: 'CVE-2024-1234',
        title: 'ServiceNow Platform Remote Code Execution Vulnerability',
        description: 'A critical vulnerability in ServiceNow platform allows remote code execution via crafted API requests. An authenticated attacker could exploit this to execute arbitrary code with elevated privileges.',
        published_date: '2024-01-20',
        severity: 'critical',
        cve_ids: 'CVE-2024-1234',
        product_list: '[{"vendor":"ServiceNow","product":"ServiceNow Platform","version":"Utah","cpe":"cpe:2.3:a:servicenow:servicenow:utah:*:*:*:*:*:*:*","range":">=Utah"}]',
        raw_payload: '{"source":"nvd_api","fetched":"2024-01-20 14:15:00","cvss_score":"9.8","cvss_vector":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"}'
    },
    $meta: { installMethod: 'demo' }
})

// Sample Scan Job Record
export const sampleScanJob = Record({
    $id: Now.ID['sample_scan_job'],
    table: 'x_138679_livesecur_scan_job',
    data: {
        scheduled_by: 'admin',
        started_at: '2024-01-20 02:00:00',
        finished_at: '2024-01-20 02:15:30',
        job_status: 'success',
        summary: 'Nightly scan completed successfully. ServiceNow Advisories: 2, NVD CVEs: 1, Advisories Processed: 3, Findings Created: 2'
    },
    $meta: { installMethod: 'demo' }
})