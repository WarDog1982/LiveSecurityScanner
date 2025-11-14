import '@servicenow/sdk/global'
import { Role } from '@servicenow/sdk/core'

// Reader role - read-only access
export const x_138679_livesecur_reader = Role({
    name: 'x_138679_livesecur.reader',
    description: 'Read-only access to LiveSecurityScanner data and dashboards'
})

// User role - can run scans and create tasks
export const x_138679_livesecur_user = Role({
    name: 'x_138679_livesecur.user',
    description: 'User access to run scans, view dashboard, and create security tasks',
    contains_roles: [x_138679_livesecur_reader]
})

// Admin role - full administration access
export const x_138679_livesecur_admin = Role({
    name: 'x_138679_livesecur.admin',
    description: 'Full administrative access to LiveSecurityScanner application',
    contains_roles: [x_138679_livesecur_user]
})