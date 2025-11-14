import React from 'react';

export default function InventoryWidget({ data }) {
    return (
        <div className="widget-card">
            <div className="widget-header">
                <h3 className="widget-title">Instance Inventory</h3>
                <span className="widget-icon">📦</span>
            </div>
            
            <div className="widget-content">
                <div className="total-count">{data.total}</div>
                
                <div className="breakdown-list">
                    <div className="stat-row">
                        <span className="stat-label">By Type:</span>
                    </div>
                    {Object.entries(data.byType).map(([type, count]) => (
                        <div key={type} className="breakdown-item">
                            <span className="breakdown-label">
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </span>
                            <span className="breakdown-value">{count}</span>
                        </div>
                    ))}
                    
                    {Object.keys(data.byType).length === 0 && (
                        <div className="no-data">
                            No inventory data available
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}