import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'
import { nightlySecurityScan } from '../../server/scheduled-jobs/nightly-scan.js'

export const NightlySecurityScan = Record({
    $id: Now.ID['nightly_security_scan'],
    table: 'sysscript_schedule',
    data: {
        name: 'LiveSecurityScanner - Nightly Ingest and Scan',
        script: nightlySecurityScan,
        active: true,
        condition: 'true',
        repeat: 'daily',
        run_time: '02:00:00',
        run_start: '2024-01-01 00:00:00',
        time_zone: 'GMT'
    }
})