import { gs, GlideRecord } from '@servicenow/glide';

var EnrichmentService = Class.create();
EnrichmentService.prototype = {
    initialize: function() {},

    /**
     * Enrich security findings with LLM-generated remediation guidance
     * @param {String} findingSysId - Finding record sys_id
     * @returns {Object} Enrichment result
     */
    enrichFinding: function(findingSysId) {
        gs.log('[LSS-ENR] Starting enrichment for finding: ' + findingSysId, 'LiveSecurityScanner');
        
        var result = {
            success: false,
            remediation_text: '',
            confidence: 0.0,
            rationale: '',
            error: null
        };
        
        try {
            // Get finding and advisory details
            var findingGr = new GlideRecord('x_138679_livesecur_finding');
            if (!findingGr.get(findingSysId)) {
                result.error = 'Finding not found: ' + findingSysId;
                return result;
            }
            
            var advisoryGr = new GlideRecord('x_138679_livesecur_advisory');
            if (!advisoryGr.get(findingGr.getValue('advisory_ref'))) {
                result.error = 'Advisory not found for finding';
                return result;
            }
            
            // Check if ServiceNow Generative AI is available
            if (!this._isGenerativeAIAvailable()) {
                gs.log('[LSS-ENR] ServiceNow Generative AI not available, using fallback enrichment', 'LiveSecurityScanner');
                return this._fallbackEnrichment(findingGr, advisoryGr);
            }
            
            // Prepare context for LLM
            var context = this._prepareContext(findingGr, advisoryGr);
            
            // Call ServiceNow Generative AI (simulated - would use actual API)
            var aiResult = this._callGenerativeAI(context);
            
            if (aiResult.success) {
                result.success = true;
                result.remediation_text = aiResult.remediation_text;
                result.confidence = Math.min(findingGr.getValue('match_confidence') * 1.1, 1.0); // Slight confidence boost
                result.rationale = aiResult.rationale;
                
                gs.log('[LSS-ENR] Successfully enriched finding with AI: ' + findingSysId, 'LiveSecurityScanner');
            } else {
                gs.warn('[LSS-ENR] AI enrichment failed, using fallback: ' + aiResult.error, 'LiveSecurityScanner');
                return this._fallbackEnrichment(findingGr, advisoryGr);
            }
            
        } catch (error) {
            gs.error('[LSS-ENR] Error during enrichment: ' + error.message, 'LiveSecurityScanner');
            result.error = error.message;
            
            // Try fallback on error
            try {
                return this._fallbackEnrichment(findingGr, advisoryGr);
            } catch (fallbackError) {
                result.error += '; Fallback also failed: ' + fallbackError.message;
            }
        }
        
        return result;
    },

    /**
     * Batch enrich multiple findings
     * @param {Array} findingSysIds - Array of finding sys_ids
     * @returns {Object} Batch enrichment results
     */
    batchEnrichFindings: function(findingSysIds) {
        gs.log('[LSS-ENR] Starting batch enrichment for ' + findingSysIds.length + ' findings', 'LiveSecurityScanner');
        
        var results = {
            total: findingSysIds.length,
            enriched: 0,
            failed: 0,
            details: []
        };
        
        for (var i = 0; i < findingSysIds.length; i++) {
            var findingId = findingSysIds[i];
            var enrichResult = this.enrichFinding(findingId);
            
            if (enrichResult.success) {
                // Update the finding record
                var findingGr = new GlideRecord('x_138679_livesecur_finding');
                if (findingGr.get(findingId)) {
                    findingGr.setValue('remediation_text', enrichResult.remediation_text);
                    findingGr.setValue('match_confidence', enrichResult.confidence);
                    findingGr.update();
                    results.enriched++;
                }
            } else {
                results.failed++;
            }
            
            results.details.push({
                finding_id: findingId,
                success: enrichResult.success,
                error: enrichResult.error
            });
        }
        
        gs.log('[LSS-ENR] Batch enrichment completed. Enriched: ' + results.enriched + 
               ', Failed: ' + results.failed, 'LiveSecurityScanner');
        
        return results;
    },

    /**
     * Check if ServiceNow Generative AI is available
     * @returns {Boolean} True if available
     */
    _isGenerativeAIAvailable: function() {
        // Check for Generative AI plugin and configuration
        var genAIEnabled = gs.getProperty('sn_generativeai.enabled', 'false') === 'true';
        var hasPlugin = gs.tableExists('sn_generativeai_configuration');
        
        return genAIEnabled && hasPlugin;
    },

    /**
     * Prepare context for LLM enrichment
     * @param {GlideRecord} findingGr - Finding record
     * @param {GlideRecord} advisoryGr - Advisory record
     * @returns {Object} Context object
     */
    _prepareContext: function(findingGr, advisoryGr) {
        return {
            advisory: {
                id: advisoryGr.getValue('advisory_id'),
                title: advisoryGr.getValue('title'),
                description: advisoryGr.getValue('description'),
                severity: advisoryGr.getValue('severity'),
                cve_ids: advisoryGr.getValue('cve_ids')
            },
            finding: {
                artifact: findingGr.getValue('instance_artifact'),
                confidence: findingGr.getValue('match_confidence'),
                risk_score: findingGr.getValue('risk_score'),
                priority: findingGr.getValue('priority')
            },
            prompt: 'Provide detailed remediation guidance for this security finding, including specific steps to mitigate the vulnerability and assess impact.'
        };
    },

    /**
     * Call ServiceNow Generative AI (simulated implementation)
     * @param {Object} context - Context for AI processing
     * @returns {Object} AI response
     */
    _callGenerativeAI: function(context) {
        // Simulate ServiceNow Generative AI call
        // In production, this would use actual sn_generativeai APIs
        
        var response = {
            success: true,
            remediation_text: '',
            rationale: '',
            error: null
        };
        
        try {
            // Simulate AI processing delay
            gs.sleep(100);
            
            // Generate contextual remediation text
            var severity = context.advisory.severity || 'medium';
            var artifact = context.finding.artifact || 'Unknown component';
            
            response.remediation_text = this._generateRemediationText(severity, artifact, context.advisory);
            response.rationale = 'Generated based on advisory severity (' + severity + ') and affected component (' + artifact + ')';
            
            gs.log('[LSS-ENR] AI enrichment simulation completed for advisory: ' + context.advisory.id, 'LiveSecurityScanner');
            
        } catch (error) {
            response.success = false;
            response.error = 'AI processing error: ' + error.message;
        }
        
        return response;
    },

    /**
     * Generate remediation text based on context
     * @param {String} severity - Advisory severity
     * @param {String} artifact - Affected artifact
     * @param {Object} advisory - Advisory details
     * @returns {String} Generated remediation text
     */
    _generateRemediationText: function(severity, artifact, advisory) {
        var baseText = 'SECURITY ADVISORY REMEDIATION\n\n';
        
        // Severity-based urgency
        switch (severity) {
            case 'critical':
                baseText += 'IMMEDIATE ACTION REQUIRED - Critical vulnerability detected.\n\n';
                break;
            case 'high':
                baseText += 'HIGH PRIORITY - Address within 24-48 hours.\n\n';
                break;
            case 'medium':
                baseText += 'MODERATE PRIORITY - Address within 1 week.\n\n';
                break;
            case 'low':
                baseText += 'LOW PRIORITY - Address during next maintenance window.\n\n';
                break;
            default:
                baseText += 'UNKNOWN SEVERITY - Assess and prioritize accordingly.\n\n';
        }
        
        // Component-specific guidance
        baseText += 'AFFECTED COMPONENT: ' + artifact + '\n\n';
        
        if (artifact.toLowerCase().indexOf('plugin') >= 0) {
            baseText += 'PLUGIN REMEDIATION STEPS:\n';
            baseText += '1. Review plugin configuration and dependencies\n';
            baseText += '2. Check for available plugin updates\n';
            baseText += '3. Assess impact of disabling plugin if necessary\n';
            baseText += '4. Test in non-production environment first\n\n';
        } else if (artifact.toLowerCase().indexOf('application') >= 0) {
            baseText += 'APPLICATION REMEDIATION STEPS:\n';
            baseText += '1. Review application version and update history\n';
            baseText += '2. Check ServiceNow HI (High Importance) security bulletins\n';
            baseText += '3. Plan upgrade or patch installation\n';
            baseText += '4. Backup configuration before changes\n\n';
        } else {
            baseText += 'GENERAL REMEDIATION STEPS:\n';
            baseText += '1. Assess the security impact and exposure\n';
            baseText += '2. Review ServiceNow security bulletins and patches\n';
            baseText += '3. Plan and test remediation in development environment\n';
            baseText += '4. Implement fix during approved maintenance window\n\n';
        }
        
        // Additional guidance
        baseText += 'ADDITIONAL RECOMMENDATIONS:\n';
        baseText += '• Monitor ServiceNow Security Center for updates\n';
        baseText += '• Review system logs for signs of exploitation\n';
        baseText += '• Update security baseline and documentation\n';
        baseText += '• Consider implementing additional monitoring\n\n';
        
        baseText += 'REFERENCE: ' + advisory.id + ' - ' + advisory.title;
        
        return baseText;
    },

    /**
     * Fallback enrichment when AI is not available
     * @param {GlideRecord} findingGr - Finding record
     * @param {GlideRecord} advisoryGr - Advisory record
     * @returns {Object} Fallback enrichment result
     */
    _fallbackEnrichment: function(findingGr, advisoryGr) {
        gs.log('[LSS-ENR] Using fallback enrichment for finding: ' + findingGr.getUniqueValue(), 'LiveSecurityScanner');
        
        var result = {
            success: true,
            remediation_text: this._generateRemediationText(
                advisoryGr.getValue('severity'),
                findingGr.getValue('instance_artifact'),
                {
                    id: advisoryGr.getValue('advisory_id'),
                    title: advisoryGr.getValue('title')
                }
            ),
            confidence: parseFloat(findingGr.getValue('match_confidence')) || 0.5,
            rationale: 'Generated using rule-based fallback system (ServiceNow Generative AI not available)',
            error: null
        };
        
        return result;
    },

    type: 'EnrichmentService'
};