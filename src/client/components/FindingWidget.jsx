import React from 'react';

export default function FindingWidget({ data }) {
    return (
        <div className="widget-card">
            <div className="widget-header">
                <h3 className="widget-title">Security Findings</h3>
                <span className="widget-icon">🔍</span>
            </div>
            
            <div className="widget-content">
                <div className="total-count">{data.total}</div>
                
                <div className="breakdown-list">
                    <div className="stat-row">
                        <span className="stat-label">By Status:</span>
                    </div>
                    {Object.entries(data.byStatus).map(([status, count]) => (
                        <div key={status} className="breakdown-item">
                            <span className={`breakdown-label status-${status}`}>
                                {status || 'Unknown'}
                            </span>
                            <span className="breakdown-value">{count}</span>
                        </div>
                    ))}
                </div>

                <div className="breakdown-list">
                    <div className="stat-row">
                        <span className="stat-label">By Priority:</span>
                    </div>
                    {Object.entries(data.byPriority).map(([priority, count]) => (
                        <div key={priority} className="breakdown-item">
                            <span className={`breakdown-label priority-${priority}`}>
                                {priority || 'Unknown'}
                            </span>
                            <span className="breakdown-value">{count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}