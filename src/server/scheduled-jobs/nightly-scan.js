import { gs, GlideRecord, GlideDateTime } from '@servicenow/glide';

/**
 * LiveSecurityScanner Nightly Ingest and Scan Job
 * Fetches ServiceNow advisories and NVD CVE data, performs matching, and creates findings
 */
export function nightlySecurityScan() {
    gs.log('[LSS-JOB] Starting nightly security scan job', 'LiveSecurityScanner');
    
    var startTime = new GlideDateTime();
    var jobSummary = {
        sn_advisories: 0,
        nvd_cves: 0,
        advisories_processed: 0,
        findings_created: 0,
        errors: []
    };
    
    // Create scan job record
    var scanJobGr = new GlideRecord('x_138679_livesecur_scan_job');
    scanJobGr.initialize();
    scanJobGr.setValue('scheduled_by', gs.getUserID());
    scanJobGr.setValue('started_at', startTime);
    scanJobGr.setValue('job_status', 'running');
    var jobSysId = scanJobGr.insert();
    
    try {
        gs.log('[LSS-JOB] Created scan job record: ' + jobSysId, 'LiveSecurityScanner');
        
        // Step 1: Fetch ServiceNow advisories
        gs.log('[LSS-JOB] Step 1: Fetching ServiceNow security advisories', 'LiveSecurityScanner');
        try {
            jobSummary.sn_advisories = fetchServiceNowAdvisories();
            gs.log('[LSS-JOB] Fetched ' + jobSummary.sn_advisories + ' ServiceNow advisories', 'LiveSecurityScanner');
        } catch (snError) {
            var snErrorMsg = 'ServiceNow advisory fetch failed: ' + snError.message;
            jobSummary.errors.push(snErrorMsg);
            gs.error('[LSS-JOB] ' + snErrorMsg, 'LiveSecurityScanner');
        }
        
        // Step 2: Fetch NVD CVE data
        gs.log('[LSS-JOB] Step 2: Fetching NVD CVE data', 'LiveSecurityScanner');
        try {
            jobSummary.nvd_cves = fetchNVDCVEData();
            gs.log('[LSS-JOB] Fetched ' + jobSummary.nvd_cves + ' NVD CVEs', 'LiveSecurityScanner');
        } catch (nvdError) {
            var nvdErrorMsg = 'NVD CVE fetch failed: ' + nvdError.message;
            jobSummary.errors.push(nvdErrorMsg);
            gs.error('[LSS-JOB] ' + nvdErrorMsg, 'LiveSecurityScanner');
        }
        
        // Step 3: Process advisories and run matching
        gs.log('[LSS-JOB] Step 3: Processing advisories and running matcher', 'LiveSecurityScanner');
        try {
            var matchResults = processAdvisoriesAndMatch();
            jobSummary.advisories_processed = matchResults.processed;
            jobSummary.findings_created = matchResults.findings;
            gs.log('[LSS-JOB] Processed ' + jobSummary.advisories_processed + ' advisories, created ' + 
                   jobSummary.findings_created + ' findings', 'LiveSecurityScanner');
        } catch (matchError) {
            var matchErrorMsg = 'Advisory processing failed: ' + matchError.message;
            jobSummary.errors.push(matchErrorMsg);
            gs.error('[LSS-JOB] ' + matchErrorMsg, 'LiveSecurityScanner');
        }
        
        // Step 4: Run enrichment service (optional)
        gs.log('[LSS-JOB] Step 4: Running LLM enrichment (if available)', 'LiveSecurityScanner');
        try {
            runEnrichmentService();
            gs.log('[LSS-JOB] LLM enrichment completed', 'LiveSecurityScanner');
        } catch (enrichError) {
            var enrichErrorMsg = 'Enrichment service error: ' + enrichError.message;
            jobSummary.errors.push(enrichErrorMsg);
            gs.warn('[LSS-JOB] ' + enrichErrorMsg, 'LiveSecurityScanner');
        }
        
        // Update job status
        var finalStatus = jobSummary.errors.length === 0 ? 'success' : 
                         (jobSummary.findings_created > 0 ? 'partial' : 'failed');
        
        updateScanJob(jobSysId, finalStatus, jobSummary, startTime);
        
        gs.log('[LSS-JOB] Nightly scan job completed with status: ' + finalStatus, 'LiveSecurityScanner');
        
    } catch (globalError) {
        gs.error('[LSS-JOB] Critical error in nightly scan job: ' + globalError.message, 'LiveSecurityScanner');
        updateScanJob(jobSysId, 'failed', { errors: [globalError.message] }, startTime);
    }
}

/**
 * Fetch ServiceNow security advisories via REST
 * @returns {Number} Number of advisories fetched
 */
function fetchServiceNowAdvisories() {
    // Simulate ServiceNow KB advisory fetch
    // In production, this would use actual REST message to ServiceNow Support KB
    gs.log('[LSS-JOB] Simulating ServiceNow advisory fetch (production would use real endpoint)', 'LiveSecurityScanner');
    
    try {
        // Mock data structure for demonstration
        var mockAdvisories = [
            {
                advisory_id: 'KB1226057',
                title: 'ServiceNow Security Advisory - Multiple Vulnerabilities',
                description: 'ServiceNow has identified multiple security vulnerabilities in various platform components.',
                published_date: '2024-01-15',
                severity: 'high',
                cve_ids: 'CVE-2024-0001,CVE-2024-0002',
                product_list: JSON.stringify([
                    { vendor: 'ServiceNow', product: 'ServiceNow Platform', version: '>=Utah', range: '>=Utah' }
                ]),
                raw_payload: JSON.stringify({ source: 'servicenow_kb', fetched: new GlideDateTime().getDisplayValue() })
            }
        ];
        
        // Stage into import set
        var importCount = 0;
        for (var i = 0; i < mockAdvisories.length; i++) {
            var advisory = mockAdvisories[i];
            var importGr = new GlideRecord('x_138679_livesecur_advisory_is_servicenow');
            importGr.initialize();
            importGr.setValue('source', 'servicenow');
            importGr.setValue('advisory_id', advisory.advisory_id);
            importGr.setValue('title', advisory.title);
            importGr.setValue('description', advisory.description);
            importGr.setValue('published_date', advisory.published_date);
            importGr.setValue('severity', advisory.severity);
            importGr.setValue('cve_ids', advisory.cve_ids);
            importGr.setValue('product_list', advisory.product_list);
            importGr.setValue('raw_payload', advisory.raw_payload);
            importGr.setValue('import_state', 'ready');
            
            if (importGr.insert()) {
                importCount++;
            }
        }
        
        // Transform import set to target table
        transformServiceNowImports();
        
        return importCount;
        
    } catch (error) {
        gs.error('[LSS-JOB] Error fetching ServiceNow advisories: ' + error.message, 'LiveSecurityScanner');
        throw error;
    }
}

/**
 * Fetch NVD CVE data via REST API
 * @returns {Number} Number of CVEs fetched
 */
function fetchNVDCVEData() {
    // Simulate NVD CVE API fetch
    // In production, this would use actual REST message to NVD CVE 2.0 API
    gs.log('[LSS-JOB] Simulating NVD CVE fetch (production would use real NVD API)', 'LiveSecurityScanner');
    
    try {
        // Mock NVD data for demonstration
        var mockCVEs = [
            {
                advisory_id: 'CVE-2024-1234',
                title: 'ServiceNow Platform Remote Code Execution',
                description: 'A vulnerability in ServiceNow platform allows remote code execution via crafted requests.',
                published_date: '2024-01-20',
                severity: 'critical',
                cve_ids: 'CVE-2024-1234',
                product_list: JSON.stringify([
                    { vendor: 'ServiceNow', product: 'ServiceNow Platform', version: 'Utah', cpe: 'cpe:2.3:a:servicenow:servicenow:utah:*:*:*:*:*:*:*' }
                ]),
                raw_payload: JSON.stringify({ source: 'nvd_api', fetched: new GlideDateTime().getDisplayValue() })
            }
        ];
        
        // Stage into import set
        var importCount = 0;
        for (var i = 0; i < mockCVEs.length; i++) {
            var cve = mockCVEs[i];
            var importGr = new GlideRecord('x_138679_livesecur_advisory_is_nvd');
            importGr.initialize();
            importGr.setValue('source', 'nvd');
            importGr.setValue('advisory_id', cve.advisory_id);
            importGr.setValue('title', cve.title);
            importGr.setValue('description', cve.description);
            importGr.setValue('published_date', cve.published_date);
            importGr.setValue('severity', cve.severity);
            importGr.setValue('cve_ids', cve.cve_ids);
            importGr.setValue('product_list', cve.product_list);
            importGr.setValue('raw_payload', cve.raw_payload);
            importGr.setValue('import_state', 'ready');
            
            if (importGr.insert()) {
                importCount++;
            }
        }
        
        // Transform import set to target table
        transformNVDImports();
        
        return importCount;
        
    } catch (error) {
        gs.error('[LSS-JOB] Error fetching NVD CVE data: ' + error.message, 'LiveSecurityScanner');
        throw error;
    }
}

/**
 * Transform ServiceNow import set records to advisory table
 */
function transformServiceNowImports() {
    gs.log('[LSS-JOB] Transforming ServiceNow import set records', 'LiveSecurityScanner');
    
    var importGr = new GlideRecord('x_138679_livesecur_advisory_is_servicenow');
    importGr.addQuery('import_state', 'ready');
    importGr.query();
    
    var transformCount = 0;
    while (importGr.next()) {
        try {
            // Check for existing advisory (coalesce on advisory_id)
            var advisoryGr = new GlideRecord('x_138679_livesecur_advisory');
            advisoryGr.addQuery('advisory_id', importGr.getValue('advisory_id'));
            advisoryGr.query();
            
            if (!advisoryGr.next()) {
                advisoryGr.initialize();
            }
            
            // Map fields
            advisoryGr.setValue('source', importGr.getValue('source'));
            advisoryGr.setValue('advisory_id', importGr.getValue('advisory_id'));
            advisoryGr.setValue('title', importGr.getValue('title'));
            advisoryGr.setValue('description', importGr.getValue('description'));
            advisoryGr.setValue('published_date', importGr.getValue('published_date'));
            advisoryGr.setValue('severity', importGr.getValue('severity'));
            advisoryGr.setValue('cve_ids', importGr.getValue('cve_ids'));
            advisoryGr.setValue('product_list', importGr.getValue('product_list'));
            advisoryGr.setValue('raw_payload', importGr.getValue('raw_payload'));
            
            if (advisoryGr.insert() || advisoryGr.update()) {
                transformCount++;
                importGr.setValue('import_state', 'processed');
                importGr.update();
            } else {
                importGr.setValue('import_state', 'error');
                importGr.setValue('error_message', 'Failed to transform record');
                importGr.update();
            }
            
        } catch (transformError) {
            gs.error('[LSS-JOB] Error transforming ServiceNow import: ' + transformError.message, 'LiveSecurityScanner');
            importGr.setValue('import_state', 'error');
            importGr.setValue('error_message', transformError.message);
            importGr.update();
        }
    }
    
    gs.log('[LSS-JOB] Transformed ' + transformCount + ' ServiceNow import records', 'LiveSecurityScanner');
}

/**
 * Transform NVD import set records to advisory table
 */
function transformNVDImports() {
    gs.log('[LSS-JOB] Transforming NVD import set records', 'LiveSecurityScanner');
    
    var importGr = new GlideRecord('x_138679_livesecur_advisory_is_nvd');
    importGr.addQuery('import_state', 'ready');
    importGr.query();
    
    var transformCount = 0;
    while (importGr.next()) {
        try {
            // Check for existing advisory (coalesce on advisory_id)
            var advisoryGr = new GlideRecord('x_138679_livesecur_advisory');
            advisoryGr.addQuery('advisory_id', importGr.getValue('advisory_id'));
            advisoryGr.query();
            
            if (!advisoryGr.next()) {
                advisoryGr.initialize();
            }
            
            // Map fields with NVD-specific handling
            advisoryGr.setValue('source', importGr.getValue('source'));
            advisoryGr.setValue('advisory_id', importGr.getValue('advisory_id'));
            advisoryGr.setValue('title', importGr.getValue('title'));
            advisoryGr.setValue('description', importGr.getValue('description'));
            advisoryGr.setValue('published_date', importGr.getValue('published_date'));
            
            // Normalize severity from NVD to our scale
            var nvdSeverity = importGr.getValue('severity');
            var normalizedSeverity = normalizeSeverity(nvdSeverity);
            advisoryGr.setValue('severity', normalizedSeverity);
            
            advisoryGr.setValue('cve_ids', importGr.getValue('cve_ids'));
            advisoryGr.setValue('product_list', importGr.getValue('product_list'));
            advisoryGr.setValue('raw_payload', importGr.getValue('raw_payload'));
            
            if (advisoryGr.insert() || advisoryGr.update()) {
                transformCount++;
                importGr.setValue('import_state', 'processed');
                importGr.update();
            } else {
                importGr.setValue('import_state', 'error');
                importGr.setValue('error_message', 'Failed to transform record');
                importGr.update();
            }
            
        } catch (transformError) {
            gs.error('[LSS-JOB] Error transforming NVD import: ' + transformError.message, 'LiveSecurityScanner');
            importGr.setValue('import_state', 'error');
            importGr.setValue('error_message', transformError.message);
            importGr.update();
        }
    }
    
    gs.log('[LSS-JOB] Transformed ' + transformCount + ' NVD import records', 'LiveSecurityScanner');
}

/**
 * Process advisories and run matching
 * @returns {Object} Processing results
 */
function processAdvisoriesAndMatch() {
    gs.log('[LSS-JOB] Processing advisories and running matcher', 'LiveSecurityScanner');
    
    var results = { processed: 0, findings: 0 };
    var matcher = new x_138679_livesecur.MatcherService();
    
    // Get new or recently updated advisories
    var advisoryGr = new GlideRecord('x_138679_livesecur_advisory');
    advisoryGr.addQuery('sys_updated_on', '>', gs.daysAgo(1)); // Process last 24 hours
    advisoryGr.query();
    
    while (advisoryGr.next()) {
        try {
            gs.log('[LSS-JOB] Processing advisory: ' + advisoryGr.getValue('advisory_id'), 'LiveSecurityScanner');
            
            var matches = matcher.performMatching(advisoryGr.getUniqueValue());
            results.processed++;
            results.findings += matches.length;
            
            gs.log('[LSS-JOB] Advisory ' + advisoryGr.getValue('advisory_id') + 
                   ' generated ' + matches.length + ' findings', 'LiveSecurityScanner');
                   
        } catch (matchError) {
            gs.error('[LSS-JOB] Error processing advisory ' + advisoryGr.getValue('advisory_id') + 
                     ': ' + matchError.message, 'LiveSecurityScanner');
        }
    }
    
    gs.log('[LSS-JOB] Matching completed. Processed: ' + results.processed + 
           ', Findings: ' + results.findings, 'LiveSecurityScanner');
    
    return results;
}

/**
 * Run enrichment service on new findings
 */
function runEnrichmentService() {
    gs.log('[LSS-JOB] Running enrichment service on new findings', 'LiveSecurityScanner');
    
    // Check if ServiceNow Generative AI is available
    if (!gs.getProperty('sn_generativeai.enabled', 'false') === 'true') {
        gs.log('[LSS-JOB] ServiceNow Generative AI not enabled, skipping enrichment', 'LiveSecurityScanner');
        return;
    }
    
    // Get findings created in last 24 hours that need enrichment
    var findingGr = new GlideRecord('x_138679_livesecur_finding');
    findingGr.addQuery('sys_created_on', '>', gs.daysAgo(1));
    findingGr.addQuery('remediation_text', '');
    findingGr.query();
    
    var enrichedCount = 0;
    while (findingGr.next()) {
        try {
            // Simulate LLM enrichment
            var enrichedText = 'Automated remediation guidance: Review and assess this security finding. ' +
                             'Consider applying available patches and monitoring for exploitation attempts. ' +
                             'Confidence level: ' + findingGr.getValue('match_confidence');
            
            findingGr.setValue('remediation_text', enrichedText);
            findingGr.update();
            enrichedCount++;
            
        } catch (enrichError) {
            gs.error('[LSS-JOB] Error enriching finding: ' + enrichError.message, 'LiveSecurityScanner');
        }
    }
    
    gs.log('[LSS-JOB] Enriched ' + enrichedCount + ' findings', 'LiveSecurityScanner');
}

/**
 * Update scan job record with results
 * @param {String} jobSysId - Scan job sys_id
 * @param {String} status - Final status
 * @param {Object} summary - Job summary
 * @param {GlideDateTime} startTime - Job start time
 */
function updateScanJob(jobSysId, status, summary, startTime) {
    try {
        var scanJobGr = new GlideRecord('x_138679_livesecur_scan_job');
        if (scanJobGr.get(jobSysId)) {
            scanJobGr.setValue('finished_at', new GlideDateTime());
            scanJobGr.setValue('job_status', status);
            
            var summaryText = 'ServiceNow Advisories: ' + (summary.sn_advisories || 0) + 
                            ', NVD CVEs: ' + (summary.nvd_cves || 0) +
                            ', Advisories Processed: ' + (summary.advisories_processed || 0) +
                            ', Findings Created: ' + (summary.findings_created || 0);
            
            if (summary.errors && summary.errors.length > 0) {
                summaryText += ', Errors: ' + summary.errors.join('; ');
            }
            
            scanJobGr.setValue('summary', summaryText);
            scanJobGr.update();
            
            gs.log('[LSS-JOB] Updated scan job ' + jobSysId + ' with status: ' + status, 'LiveSecurityScanner');
        }
    } catch (updateError) {
        gs.error('[LSS-JOB] Error updating scan job: ' + updateError.message, 'LiveSecurityScanner');
    }
}

/**
 * Normalize severity from different sources
 * @param {String} severity - Source severity value
 * @returns {String} Normalized severity
 */
function normalizeSeverity(severity) {
    if (!severity) return 'unknown';
    
    var sev = severity.toLowerCase();
    if (sev.indexOf('critical') >= 0 || sev.indexOf('9.') === 0) return 'critical';
    if (sev.indexOf('high') >= 0 || sev.indexOf('7.') === 0 || sev.indexOf('8.') === 0) return 'high';
    if (sev.indexOf('medium') >= 0 || sev.indexOf('4.') === 0 || sev.indexOf('5.') === 0 || sev.indexOf('6.') === 0) return 'medium';
    if (sev.indexOf('low') >= 0 || sev.indexOf('0.') === 0 || sev.indexOf('1.') === 0 || sev.indexOf('2.') === 0 || sev.indexOf('3.') === 0) return 'low';
    
    return 'unknown';
}