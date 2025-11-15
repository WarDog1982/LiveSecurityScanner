import React from 'react';

export default function InventoryWidget({ stats }) {
    const getInventoryUrl = () => {
        // Link to the inventory API endpoint for detailed view
        return '/api/x_138679_livesecur/inventory';
    };

    const getTableUrl = (table, filter = '') => {
        const baseUrl = `/${table}_list.do?sysparm_clear_stack=true`;
        return filter ? `${baseUrl}&sysparm_query=${encodeURIComponent(filter)}` : baseUrl;
    };

    const getTypeFilter = (type) => {
        switch (type) {
            case 'plugins':
                return { table: 'sys_plugins', filter: 'active=true' };
            case 'applications':
                return { table: 'sys_app', filter: 'active=true' };
            case 'modules':
                return { table: 'sys_app_module', filter: '' };
            case 'properties':
                return { table: 'sys_properties', filter: 'nameCONTAINSversion^ORnameCONTAINSbuild^ORnameCONTAINSrelease' };
            default:
                return { table: 'sys_plugins', filter: '' };
        }
    };

    if (!stats) {
        return (
            <div className="widget-card">
                <div className="widget-header">
                    <h3 className="widget-title">Instance Inventory</h3>
                    <div className="widget-icon">📦</div>
                </div>
                <div className="no-data">Loading inventory data...</div>
            </div>
        );
    }

    return (
        <div className="widget-card">
            <div className="widget-header">
                <h3 className="widget-title">Instance Inventory</h3>
                <div className="widget-icon">📦</div>
            </div>
            <div className="widget-content">
                <div className="total-count">{stats.total}</div>
                <div className="breakdown-list">
                    {Object.entries(stats.byType).map(([type, count]) => {
                        const { table, filter } = getTypeFilter(type);
                        return (
                            <div key={type} className="breakdown-item">
                                <span className="breakdown-label">
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </span>
                                <a 
                                    href={getTableUrl(table, filter)}
                                    className="breakdown-value-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {count}
                                </a>
                            </div>
                        );
                    })}
                </div>
                
                <div className="inventory-actions">
                    <a 
                        href="/sys_plugins_list.do?sysparm_query=active=true"
                        className="inventory-action-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        📋 View All Active Plugins
                    </a>
                    <a 
                        href="/sys_app_list.do?sysparm_query=active=true"
                        className="inventory-action-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        📱 View All Applications
                    </a>
                    <a 
                        href="/sys_properties_list.do?sysparm_query=nameCONTAINSversion^ORnameCONTAINSbuild"
                        className="inventory-action-link"
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        ⚙️ View Version Properties
                    </a>
                    <button 
                        onClick={() => window.open(getInventoryUrl(), '_blank')}
                        className="inventory-action-button"
                    >
                        🔗 View Raw Inventory API
                    </button>
                </div>
            </div>
        </div>
    );
}