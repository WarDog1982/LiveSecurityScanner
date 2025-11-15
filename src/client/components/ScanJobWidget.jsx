import React from 'react';

export default function ScanJobWidget({ stats }) {
    const getTableUrl = (table, filter = '') => {
        const baseUrl = `/${table}_list.do?sysparm_clear_stack=true`;
        return filter ? `${baseUrl}&sysparm_query=${encodeURIComponent(filter)}` : baseUrl;
    };

    const getStatusFilter = (status) => {
        return `job_status=${status}`;
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Never';
        try {
            return new Date(dateString).toLocaleDateString();
        } catch {
            return dateString;
        }
    };

    if (!stats) {
        return (
            <div className="widget-card">
                <div className="widget-header">
                    <h3 className="widget-title">Scan Jobs</h3>
                    <div className="widget-icon">⚙️</div>
                </div>
                <div className="no-data">Loading scan job data...</div>
            </div>
        );
    }

    return (
        <div className="widget-card">
            <div className="widget-header">
                <h3 className="widget-title">Scan Jobs</h3>
                <div className="widget-icon">⚙️</div>
            </div>
            <div className="widget-content">
                <div className="stat-row">
                    <span className="stat-label">Total Jobs:</span>
                    <a 
                        href={getTableUrl('x_138679_livesecur_scan_job')}
                        className="stat-value-link"
                    >
                        {stats.total}
                    </a>
                </div>
                <div className="stat-row">
                    <span className="stat-label">Current Status:</span>
                    <a 
                        href={getTableUrl('x_138679_livesecur_scan_job', getStatusFilter(stats.status))}
                        className={`stat-value status-${stats.status}`}
                    >
                        {stats.status.charAt(0).toUpperCase() + stats.status.slice(1)}
                    </a>
                </div>
                
                {stats.lastRun && (
                    <div className="last-scan-info">
                        <div className="last-scan-title">
                            <a 
                                href={getTableUrl('x_138679_livesecur_scan_job', 'ORDERBYDESCsys_created_on')}
                                className="last-scan-link"
                            >
                                Last Scan Details
                            </a>
                        </div>
                        <div className="last-scan-detail">
                            <strong>Started:</strong> {formatDate(stats.lastRun.started_at)}
                        </div>
                        <div className="last-scan-detail">
                            <strong>Finished:</strong> {formatDate(stats.lastRun.finished_at)}
                        </div>
                        <div className="last-scan-detail">
                            <strong>Status:</strong> 
                            <span className={`status-${stats.lastRun.status}`}>
                                {stats.lastRun.status}
                            </span>
                        </div>
                        <div className="last-scan-detail">
                            <strong>Summary:</strong> {stats.lastRun.summary}
                        </div>
                    </div>
                )}

                <div className="job-actions">
                    <a 
                        href={getTableUrl('x_138679_livesecur_scan_job', getStatusFilter('success'))}
                        className="job-action-link success"
                    >
                        View Successful Jobs
                    </a>
                    <a 
                        href={getTableUrl('x_138679_livesecur_scan_job', getStatusFilter('failed'))}
                        className="job-action-link failed"
                    >
                        View Failed Jobs
                    </a>
                </div>
            </div>
        </div>
    );
}