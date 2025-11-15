import '@servicenow/sdk/global'
import { Acl } from '@servicenow/sdk/core'
import { x_138679_livesecur_reader, x_138679_livesecur_user, x_138679_livesecur_admin } from '../roles/livesecurity-roles.now.ts'

// Advisory table ACLs
export const advisory_read_acl = Acl({
    $id: Now.ID['advisory_read'],
    active: true,
    admin_overrides: true,
    type: 'record',
    table: 'x_138679_livesecur_advisory',
    operation: 'read',
    roles: [x_138679_livesecur_reader],
    description: 'Allow readers to view security advisories'
})

export const advisory_write_acl = Acl({
    $id: Now.ID['advisory_write'],
    active: true,
    admin_overrides: true,
    type: 'record',
    table: 'x_138679_livesecur_advisory',
    operation: 'write',
    roles: [x_138679_livesecur_admin],
    description: 'Only admins can modify advisories',
    script: `
        var principal = gs.getUserName();
        var decision = gs.hasRole('x_138679_livesecur.admin');
        gs.info('[LSS-ACL] Advisory write access for user: ' + principal + ', decision: ' + decision);
        answer = decision;
    `
})

// Finding table ACLs
export const finding_read_acl = Acl({
    $id: Now.ID['finding_read'],
    active: true,
    admin_overrides: true,
    type: 'record',
    table: 'x_138679_livesecur_finding',
    operation: 'read',
    roles: [x_138679_livesecur_reader],
    description: 'Allow readers to view security findings'
})

export const finding_create_acl = Acl({
    $id: Now.ID['finding_create'],
    active: true,
    admin_overrides: true,
    type: 'record',
    table: 'x_138679_livesecur_finding',
    operation: 'create',
    roles: [x_138679_livesecur_user],
    description: 'Allow users to create findings'
})

export const finding_write_acl = Acl({
    $id: Now.ID['finding_write'],
    active: true,
    admin_overrides: true,
    type: 'record',
    table: 'x_138679_livesecur_finding',
    operation: 'write',
    roles: [x_138679_livesecur_user],
    description: 'Allow users to update findings'
})

export const finding_delete_acl = Acl({
    $id: Now.ID['finding_delete'],
    active: true,
    admin_overrides: true,
    type: 'record',
    table: 'x_138679_livesecur_finding',
    operation: 'delete',
    roles: [x_138679_livesecur_admin],
    description: 'Only admins can delete findings'
})

// Scan Job table ACLs
export const scan_job_read_acl = Acl({
    $id: Now.ID['scan_job_read'],
    active: true,
    admin_overrides: true,
    type: 'record',
    table: 'x_138679_livesecur_scan_job',
    operation: 'read',
    roles: [x_138679_livesecur_user],
    description: 'Allow users to view scan jobs'
})

export const scan_job_create_acl = Acl({
    $id: Now.ID['scan_job_create'],
    active: true,
    admin_overrides: true,
    type: 'record',
    table: 'x_138679_livesecur_scan_job',
    operation: 'create',
    roles: [x_138679_livesecur_user],
    description: 'Allow users to create scan jobs'
})

export const scan_job_write_acl = Acl({
    $id: Now.ID['scan_job_write'],
    active: true,
    admin_overrides: true,
    type: 'record',
    table: 'x_138679_livesecur_scan_job',
    operation: 'write',
    roles: [x_138679_livesecur_admin],
    description: 'Only admins can modify scan jobs'
})