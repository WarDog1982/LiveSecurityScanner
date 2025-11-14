import React from 'react';
import AdvisoryWidget from './AdvisoryWidget.jsx';
import FindingWidget from './FindingWidget.jsx';
import ScanJobWidget from './ScanJobWidget.jsx';
import InventoryWidget from './InventoryWidget.jsx';
import './Dashboard.css';

export default function Dashboard({ data, onRefresh }) {
    return (
        <div className="dashboard-container">
            <div className="dashboard-grid">
                <AdvisoryWidget data={data.advisoryStats} />
                <FindingWidget data={data.findingStats} />
                <ScanJobWidget data={data.scanJobStats} />
                <InventoryWidget data={data.inventoryStats} />
            </div>
            
            <div className="dashboard-summary">
                <div className="summary-card">
                    <h3>Security Posture Summary</h3>
                    <div className="summary-metrics">
                        <div className="metric">
                            <span className="metric-value">{data.advisoryStats.total}</span>
                            <span className="metric-label">Total Advisories</span>
                        </div>
                        <div className="metric">
                            <span className="metric-value">{data.findingStats.total}</span>
                            <span className="metric-label">Security Findings</span>
                        </div>
                        <div className="metric">
                            <span className="metric-value">{data.inventoryStats.total}</span>
                            <span className="metric-label">Inventory Items</span>
                        </div>
                        <div className="metric">
                            <span className={`metric-value status-${data.scanJobStats.status}`}>
                                {data.scanJobStats.status.charAt(0).toUpperCase() + data.scanJobStats.status.slice(1)}
                            </span>
                            <span className="metric-label">Scan Status</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}