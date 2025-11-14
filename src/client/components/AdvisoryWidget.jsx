import React from 'react';

export default function AdvisoryWidget({ data }) {
    return (
        <div className="widget-card">
            <div className="widget-header">
                <h3 className="widget-title">Security Advisories</h3>
                <span className="widget-icon">📋</span>
            </div>
            
            <div className="widget-content">
                <div className="total-count">{data.total}</div>
                
                <div className="breakdown-list">
                    <div className="stat-row">
                        <span className="stat-label">By Source:</span>
                    </div>
                    {Object.entries(data.bySource).map(([source, count]) => (
                        <div key={source} className="breakdown-item">
                            <span className="breakdown-label">{source || 'Unknown'}</span>
                            <span className="breakdown-value">{count}</span>
                        </div>
                    ))}
                </div>

                <div className="breakdown-list">
                    <div className="stat-row">
                        <span className="stat-label">By Severity:</span>
                    </div>
                    {Object.entries(data.bySeverity).map(([severity, count]) => (
                        <div key={severity} className="breakdown-item">
                            <span className={`breakdown-label severity-${severity}`}>
                                {severity || 'Unknown'}
                            </span>
                            <span className="breakdown-value">{count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}