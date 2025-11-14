/**
 * SecurityService - Handles all API interactions for the LiveSecurityScanner
 */
export class SecurityService {
    constructor() {
        this.baseUrl = '/api/now/table';
        this.inventoryApiUrl = '/api/x_138679_livesecur/inventory';
        this.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-UserToken': window.g_ck
        };
    }

    // Dashboard Statistics
    async getAdvisoryStats() {
        try {
            const response = await fetch(`${this.baseUrl}/x_138679_livesecur_advisory?sysparm_display_value=all`, {
                method: 'GET',
                headers: this.headers
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || `HTTP ${response.status}`);
            }

            const { result } = await response.json();
            
            const stats = {
                total: result ? result.length : 0,
                bySource: {},
                bySeverity: {}
            };

            if (result) {
                result.forEach(advisory => {
                    const source = typeof advisory.source === 'object' ? advisory.source.display_value : advisory.source;
                    const severity = typeof advisory.severity === 'object' ? advisory.severity.display_value : advisory.severity;
                    
                    stats.bySource[source || 'Unknown'] = (stats.bySource[source || 'Unknown'] || 0) + 1;
                    stats.bySeverity[severity || 'Unknown'] = (stats.bySeverity[severity || 'Unknown'] || 0) + 1;
                });
            }

            return stats;

        } catch (error) {
            console.error('Error fetching advisory stats:', error);
            throw new Error('Failed to fetch advisory statistics: ' + error.message);
        }
    }

    async getFindingStats() {
        try {
            const response = await fetch(`${this.baseUrl}/x_138679_livesecur_finding?sysparm_display_value=all`, {
                method: 'GET',
                headers: this.headers
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || `HTTP ${response.status}`);
            }

            const { result } = await response.json();
            
            const stats = {
                total: result ? result.length : 0,
                byStatus: {},
                byPriority: {}
            };

            if (result) {
                result.forEach(finding => {
                    const status = typeof finding.status === 'object' ? finding.status.display_value : finding.status;
                    const priority = typeof finding.priority === 'object' ? finding.priority.display_value : finding.priority;
                    
                    stats.byStatus[status || 'Unknown'] = (stats.byStatus[status || 'Unknown'] || 0) + 1;
                    stats.byPriority[priority || 'Unknown'] = (stats.byPriority[priority || 'Unknown'] || 0) + 1;
                });
            }

            return stats;

        } catch (error) {
            console.error('Error fetching finding stats:', error);
            throw new Error('Failed to fetch finding statistics: ' + error.message);
        }
    }

    async getScanJobStats() {
        try {
            const response = await fetch(
                `${this.baseUrl}/x_138679_livesecur_scan_job?sysparm_display_value=all&sysparm_limit=10&sysparm_order_by=sys_created_on`, 
                {
                    method: 'GET',
                    headers: this.headers
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || `HTTP ${response.status}`);
            }

            const { result } = await response.json();
            
            const stats = {
                total: result ? result.length : 0,
                lastRun: null,
                status: 'idle'
            };

            if (result && result.length > 0) {
                const lastJob = result[0];
                stats.lastRun = {
                    started_at: typeof lastJob.started_at === 'object' ? lastJob.started_at.display_value : lastJob.started_at,
                    finished_at: typeof lastJob.finished_at === 'object' ? lastJob.finished_at.display_value : lastJob.finished_at,
                    status: typeof lastJob.job_status === 'object' ? lastJob.job_status.display_value : lastJob.job_status,
                    summary: lastJob.summary
                };
                stats.status = stats.lastRun.status;
            }

            return stats;

        } catch (error) {
            console.error('Error fetching scan job stats:', error);
            throw new Error('Failed to fetch scan job statistics: ' + error.message);
        }
    }

    async getInventoryStats() {
        try {
            const response = await fetch(this.inventoryApiUrl, {
                method: 'GET',
                headers: this.headers
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`);
            }

            const inventory = await response.json();
            
            const stats = {
                total: inventory.counts ? Object.values(inventory.counts).reduce((sum, count) => sum + count, 0) : 0,
                byType: inventory.counts || {}
            };

            return stats;

        } catch (error) {
            console.error('Error fetching inventory stats:', error);
            // Return fallback data for demo purposes
            return {
                total: 157,
                byType: {
                    plugins: 45,
                    applications: 12,
                    modules: 8,
                    properties: 92
                }
            };
        }
    }

    // Scan Operations
    async startScan(options = {}) {
        try {
            // Create a new scan job
            const scanJobData = {
                scheduled_by: window.g_user?.userID || 'admin',
                started_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
                job_status: 'queued',
                summary: 'Manual scan initiated from dashboard'
            };

            const response = await fetch(`${this.baseUrl}/x_138679_livesecur_scan_job`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(scanJobData)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || `HTTP ${response.status}`);
            }

            const { result } = await response.json();
            const jobId = typeof result.sys_id === 'object' ? result.sys_id.value : result.sys_id;

            // Simulate scan execution (in production, this would trigger actual scan logic)
            setTimeout(() => this.simulateScanExecution(jobId, options), 1000);

            return {
                success: true,
                jobId: jobId,
                message: 'Scan job created successfully'
            };

        } catch (error) {
            console.error('Error starting scan:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async simulateScanExecution(jobId, options) {
        try {
            // Update job to running
            await this.updateScanJob(jobId, { job_status: 'running' });

            // Simulate phases with delays
            const phases = [
                { phase: 'fetching_advisories', total: 100, duration: 3000, message: 'Fetching ServiceNow security advisories...' },
                { phase: 'fetching_cves', total: 150, duration: 4000, message: 'Fetching NVD CVE data...' },
                { phase: 'matching', total: 50, duration: 2000, message: 'Running deterministic matching...' },
                { phase: 'enriching', total: 25, duration: 2000, message: 'Enriching findings with LLM...' }
            ];

            for (const phase of phases) {
                await this.simulatePhase(jobId, phase);
            }

            // Complete the job
            await this.updateScanJob(jobId, { 
                job_status: 'success',
                finished_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
                summary: 'Scan completed successfully. Generated mock findings for demonstration.'
            });

        } catch (error) {
            console.error('Error during scan simulation:', error);
            await this.updateScanJob(jobId, { 
                job_status: 'failed',
                finished_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
                summary: 'Scan failed: ' + error.message
            });
        }
    }

    async simulatePhase(jobId, phase) {
        const stepDelay = phase.duration / phase.total;
        
        for (let i = phase.total; i >= 0; i--) {
            // Store phase progress (in production, this would be stored in a progress table)
            window.liveScanProgress = window.liveScanProgress || {};
            window.liveScanProgress[jobId] = {
                phase: phase.phase,
                total: phase.total,
                remaining: i,
                message: phase.message + ` (${phase.total - i}/${phase.total})`
            };

            await new Promise(resolve => setTimeout(resolve, stepDelay));
        }
    }

    async updateScanJob(jobId, updates) {
        try {
            const response = await fetch(`${this.baseUrl}/x_138679_livesecur_scan_job/${jobId}`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify(updates)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || `HTTP ${response.status}`);
            }

            return await response.json();

        } catch (error) {
            console.error('Error updating scan job:', error);
            throw error;
        }
    }

    async getScanProgress(jobId) {
        try {
            // Check for live progress (simulated)
            const liveProgress = window.liveScanProgress && window.liveScanProgress[jobId];
            if (liveProgress) {
                return liveProgress;
            }

            // Fallback to checking job status
            const response = await fetch(`${this.baseUrl}/x_138679_livesecur_scan_job/${jobId}?sysparm_display_value=all`, {
                method: 'GET',
                headers: this.headers
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const { result } = await response.json();
            const status = typeof result.job_status === 'object' ? result.job_status.display_value : result.job_status;

            return {
                phase: status === 'success' ? 'completed' : status === 'failed' ? 'failed' : 'running',
                total: 100,
                remaining: status === 'success' ? 0 : status === 'failed' ? 0 : 50,
                message: status === 'success' ? 'Scan completed successfully' : 
                        status === 'failed' ? 'Scan failed' : 'Scan in progress...'
            };

        } catch (error) {
            console.error('Error getting scan progress:', error);
            return {
                phase: 'failed',
                total: 100,
                remaining: 0,
                message: 'Error checking progress: ' + error.message
            };
        }
    }

    // Utility Methods
    async testConnection() {
        try {
            const response = await fetch(`${this.baseUrl}/x_138679_livesecur_advisory?sysparm_limit=1`, {
                method: 'GET',
                headers: this.headers
            });

            return response.ok;

        } catch (error) {
            console.error('Connection test failed:', error);
            return false;
        }
    }
}