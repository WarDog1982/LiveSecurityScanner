import { gs, GlideRecord } from '@servicenow/glide';

/**
 * Business Rule script for Finding creation - triggers Flow automation
 * Creates security review tasks when new findings are created
 */
export function onFindingCreated(current, previous) {
    try {
        gs.log('[LSS-FLOW] Finding created: ' + current.getUniqueValue() + ' with status: ' + current.getValue('status'), 'LiveSecurityScanner');
        
        if (current.getValue('status') === 'new') {
            // Create security review task
            var taskGr = new GlideRecord('x_138679_livesecur_sec_task');
            taskGr.initialize();
            
            // Get advisory details
            var advisoryGr = new GlideRecord('x_138679_livesecur_advisory');
            if (advisoryGr.get(current.getValue('advisory_ref'))) {
                var shortDesc = '[LiveSecurityScanner] Advisory ' + advisoryGr.getValue('advisory_id') + 
                               ' matched ' + current.getValue('instance_artifact');
                
                var description = 'Security Advisory: ' + advisoryGr.getValue('title') + '\n' +
                                'Instance Artifact: ' + current.getValue('instance_artifact') + '\n' +
                                'Match Confidence: ' + current.getValue('match_confidence') + '\n' +
                                'Risk Score: ' + current.getValue('risk_score') + '\n' +
                                'Priority: ' + current.getValue('priority') + '\n\n' +
                                'Remediation Text: ' + (current.getValue('remediation_text') || 'Pending enrichment') + '\n\n' +
                                'Advisory Link: ' + gs.getProperty('glide.servlet.uri') + 'x_138679_livesecur_advisory.do?sys_id=' + advisoryGr.getUniqueValue() + '\n' +
                                'Finding Link: ' + gs.getProperty('glide.servlet.uri') + 'x_138679_livesecur_finding.do?sys_id=' + current.getUniqueValue();
                
                taskGr.setValue('short_description', shortDesc);
                taskGr.setValue('description', description);
                taskGr.setValue('finding_ref', current.getUniqueValue());
                taskGr.setValue('priority', mapPriorityToTask(current.getValue('priority')));
                taskGr.setValue('state', 'new');
                taskGr.setValue('assigned_to', getSecurityGroupMember());
                
                var taskSysId = taskGr.insert();
                
                if (taskSysId) {
                    gs.log('[LSS-FLOW] Created security review task: ' + taskSysId, 'LiveSecurityScanner');
                    
                    // Update finding status to triage
                    current.setValue('status', 'triage');
                    current.update();
                    
                    // Send notification to security group
                    sendSecurityNotification(taskSysId, shortDesc, advisoryGr.getValue('severity'));
                    
                } else {
                    gs.error('[LSS-FLOW] Failed to create security review task for finding: ' + current.getUniqueValue(), 'LiveSecurityScanner');
                    current.setValue('status', 'failed');
                    current.update();
                }
            } else {
                gs.error('[LSS-FLOW] Advisory not found for finding: ' + current.getUniqueValue(), 'LiveSecurityScanner');
            }
        }
        
    } catch (error) {
        gs.error('[LSS-FLOW] Error in Finding creation business rule: ' + error.message + '\nStack: ' + error.stack, 'LiveSecurityScanner');
        current.setValue('status', 'failed');
        current.update();
    }
}

/**
 * Map finding priority to task priority
 * @param {String} findingPriority - Finding priority level
 * @returns {String} Task priority
 */
function mapPriorityToTask(findingPriority) {
    switch (findingPriority) {
        case 'critical': return '1';
        case 'high': return '2';
        case 'medium': return '3';
        case 'low': return '4';
        default: return '3';
    }
}

/**
 * Get a member of the security group to assign tasks
 * @returns {String} User sys_id or empty string
 */
function getSecurityGroupMember() {
    try {
        // Look for security group members
        var groupGr = new GlideRecord('sys_user_group');
        groupGr.addQuery('name', 'LIKE', 'security');
        groupGr.addQuery('active', true);
        groupGr.query();
        
        if (groupGr.next()) {
            var memberGr = new GlideRecord('sys_user_grmember');
            memberGr.addQuery('group', groupGr.getUniqueValue());
            memberGr.query();
            if (memberGr.next()) {
                return memberGr.getValue('user');
            }
        }
        
        // Fallback to admin user
        var adminGr = new GlideRecord('sys_user');
        adminGr.addQuery('user_name', 'admin');
        adminGr.query();
        if (adminGr.next()) {
            return adminGr.getUniqueValue();
        }
        
    } catch (error) {
        gs.warn('[LSS-FLOW] Could not find security group member: ' + error.message, 'LiveSecurityScanner');
    }
    
    return '';
}

/**
 * Send notification to security group
 * @param {String} taskSysId - Task sys_id
 * @param {String} shortDesc - Task short description
 * @param {String} severity - Advisory severity
 */
function sendSecurityNotification(taskSysId, shortDesc, severity) {
    try {
        gs.eventQueue('x_138679_livesecur.security_task_created', null, taskSysId, shortDesc, severity);
        gs.log('[LSS-FLOW] Queued security notification event for task: ' + taskSysId, 'LiveSecurityScanner');
    } catch (error) {
        gs.warn('[LSS-FLOW] Failed to queue security notification: ' + error.message, 'LiveSecurityScanner');
    }
}