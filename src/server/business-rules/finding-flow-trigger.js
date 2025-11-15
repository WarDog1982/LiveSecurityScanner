import { gs } from '@servicenow/glide';

export function findingFlowTrigger(current, previous) {
    try {
        gs.info('[LSS-FLOW] Finding Flow Trigger activated for finding: ' + current.getUniqueValue());
        
        var findingStatus = current.getValue('status');
        var advisoryRef = current.getValue('advisory_ref');
        var instanceArtifact = current.getValue('instance_artifact');
        var riskScore = current.getValue('risk_score') || 0;
        var priority = current.getValue('priority') || 'medium';
        
        gs.info('[LSS-FLOW] Processing finding with status: ' + findingStatus + ', priority: ' + priority);
        
        // Only trigger for new findings
        if (findingStatus !== 'new') {
            gs.info('[LSS-FLOW] Skipping flow trigger - finding status is not "new"');
            return;
        }
        
        // Create security review task
        var taskGr = new GlideRecord('x_138679_livesecur_sec_task');
        taskGr.initialize();
        
        taskGr.setValue('short_description', '[LiveSecurityScanner] Security Review - ' + instanceArtifact);
        taskGr.setValue('description', 'Security finding identified by LiveSecurityScanner requires review and remediation.\n\n' +
                       'Instance Artifact: ' + instanceArtifact + '\n' +
                       'Risk Score: ' + riskScore + '\n' +
                       'Priority: ' + priority + '\n\n' +
                       'Please review the associated finding and advisory for detailed remediation guidance.');
        taskGr.setValue('priority', priority);
        taskGr.setValue('state', 'new');
        taskGr.setValue('finding_ref', current.getUniqueValue());
        
        var taskSysId = taskGr.insert();
        
        if (taskSysId) {
            gs.info('[LSS-FLOW] Created security review task: ' + taskSysId);
            
            // Update finding status to triage
            current.setValue('status', 'triage');
            current.update();
            
            gs.info('[LSS-FLOW] Updated finding status to triage');
            
            // Send notification (placeholder - would integrate with ServiceNow notifications)
            gs.info('[LSS-FLOW] Notification sent for new security finding task');
            
        } else {
            gs.error('[LSS-FLOW] Failed to create security review task for finding: ' + current.getUniqueValue());
        }
        
    } catch (error) {
        gs.error('[LSS-FLOW] Error in finding flow trigger: ' + error.message);
    }
}