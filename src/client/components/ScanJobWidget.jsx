import React from 'react';

export default function ScanJobWidget({ data }) {
    return (
        <div className="widget-card">
            <div className="widget-header">
                <h3 className="widget-title">Scan Jobs</h3>
                <span className="widget-icon">⚙️</span>
            </div>
            
            <div className="widget-content">
                <div className="total-count">{data.total}</div>
                
                <div className="stat-row">
                    <span className="stat-label">Current Status:</span>
                    <span className={`stat-value status-${data.status}`}>
                        {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                    </span>
                </div>

                {data.lastRun && (
                    <div className="last-scan-info">
                        <div className="last-scan-title">Last Scan Job</div>
                        <div className="last-scan-detail">
                            <strong>Status:</strong> <span className={`status-${data.lastRun.status}`}>
                                {data.lastRun.status}
                            </span>
                        </div>
                        {data.lastRun.started_at && (
                            <div className="last-scan-detail">
                                <strong>Started:</strong> {data.lastRun.started_at}
                            </div>
                        )}
                        {data.lastRun.finished_at && (
                            <div className="last-scan-detail">
                                <strong>Finished:</strong> {data.lastRun.finished_at}
                            </div>
                        )}
                        {data.lastRun.summary && (
                            <div className="last-scan-detail">
                                <strong>Summary:</strong> {data.lastRun.summary}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}