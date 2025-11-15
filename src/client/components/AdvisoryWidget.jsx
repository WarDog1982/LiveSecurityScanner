import React from 'react';

export default function AdvisoryWidget({ stats }) {
    const getTableUrl = (table, filter = '') => {
        const baseUrl = `/${table}_list.do?sysparm_clear_stack=true`;
        return filter ? `${baseUrl}&sysparm_query=${encodeURIComponent(filter)}` : baseUrl;
    };

    const getSeverityFilter = (severity) => {
        return `severity=${severity}`;
    };

    const getSourceFilter = (source) => {
        return `source=${source}`;
    };

    if (!stats) {
        return (
            <div className="widget-card">
                <div className="widget-header">
                    <h3 className="widget-title">Security Advisories</h3>
                    <div className="widget-icon">📋</div>
                </div>
                <div className="no-data">Loading advisory data...</div>
            </div>
        );
    }

    return (
        <div className="widget-card">
            <div className="widget-header">
                <h3 className="widget-title">Security Advisories</h3>
                <div className="widget-icon">📋</div>
            </div>
            <div className="widget-content">
                <a 
                    href={getTableUrl('x_138679_livesecur_advisory')}
                    className="total-count-link"
                >
                    <div className="total-count">{stats.total}</div>
                </a>
                <div className="stat-section">
                    <h4 className="section-title">By Source</h4>
                    <div className="breakdown-list">
                        {Object.entries(stats.bySource).map(([source, count]) => (
                            <div key={source} className="breakdown-item">
                                <span className="breakdown-label">{source}</span>
                                <a 
                                    href={getTableUrl('x_138679_livesecur_advisory', getSourceFilter(source))}
                                    className="breakdown-value-link"
                                >
                                    {count}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="stat-section">
                    <h4 className="section-title">By Severity</h4>
                    <div className="breakdown-list">
                        {Object.entries(stats.bySeverity).map(([severity, count]) => (
                            <div key={severity} className="breakdown-item">
                                <span className={`breakdown-label severity-${severity}`}>
                                    {severity.charAt(0).toUpperCase() + severity.slice(1)}
                                </span>
                                <a 
                                    href={getTableUrl('x_138679_livesecur_advisory', getSeverityFilter(severity))}
                                    className={`breakdown-value-link severity-${severity}`}
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