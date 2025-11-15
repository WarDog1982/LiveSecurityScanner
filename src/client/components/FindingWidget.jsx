import React from 'react';

export default function FindingWidget({ stats }) {
    const getTableUrl = (table, filter = '') => {
        const baseUrl = `/${table}_list.do?sysparm_clear_stack=true`;
        return filter ? `${baseUrl}&sysparm_query=${encodeURIComponent(filter)}` : baseUrl;
    };

    const getStatusFilter = (status) => {
        return `status=${status}`;
    };

    const getPriorityFilter = (priority) => {
        return `priority=${priority}`;
    };

    if (!stats) {
        return (
            <div className="widget-card">
                <div className="widget-header">
                    <h3 className="widget-title">Security Findings</h3>
                    <div className="widget-icon">🔍</div>
                </div>
                <div className="no-data">Loading findings data...</div>
            </div>
        );
    }

    return (
        <div className="widget-card">
            <div className="widget-header">
                <h3 className="widget-title">Security Findings</h3>
                <div className="widget-icon">🔍</div>
            </div>
            <div className="widget-content">
                <a 
                    href={getTableUrl('x_138679_livesecur_finding')}
                    className="total-count-link"
                >
                    <div className="total-count">{stats.total}</div>
                </a>
                <div className="stat-section">
                    <h4 className="section-title">By Status</h4>
                    <div className="breakdown-list">
                        {Object.entries(stats.byStatus).map(([status, count]) => (
                            <div key={status} className="breakdown-item">
                                <span className={`breakdown-label status-${status}`}>
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </span>
                                <a 
                                    href={getTableUrl('x_138679_livesecur_finding', getStatusFilter(status))}
                                    className={`breakdown-value-link status-${status}`}
                                >
                                    {count}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="stat-section">
                    <h4 className="section-title">By Priority</h4>
                    <div className="breakdown-list">
                        {Object.entries(stats.byPriority).map(([priority, count]) => (
                            <div key={priority} className="breakdown-item">
                                <span className={`breakdown-label priority-${priority}`}>
                                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                </span>
                                <a 
                                    href={getTableUrl('x_138679_livesecur_finding', getPriorityFilter(priority))}
                                    className={`breakdown-value-link priority-${priority}`}
                                >
                                    {count}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}