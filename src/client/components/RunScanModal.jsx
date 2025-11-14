import React, { useState } from 'react';

export default function RunScanModal({ onRun, onClose }) {
    const [options, setOptions] = useState({
        minSeverity: 'low',
        productScope: 'all',
        includeServiceNow: true,
        includeNVD: true
    });

    const [estimated, setEstimated] = useState({
        snAdvisories: 45,
        nvdCves: 120,
        totalItems: 165
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onRun(options);
    };

    const handleOptionChange = (key, value) => {
        setOptions(prev => ({
            ...prev,
            [key]: value
        }));

        // Update estimates based on options
        let snCount = options.includeServiceNow ? 45 : 0;
        let nvdCount = options.includeNVD ? 120 : 0;

        if (options.minSeverity === 'high') {
            snCount = Math.floor(snCount * 0.3);
            nvdCount = Math.floor(nvdCount * 0.4);
        } else if (options.minSeverity === 'critical') {
            snCount = Math.floor(snCount * 0.1);
            nvdCount = Math.floor(nvdCount * 0.15);
        }

        setEstimated({
            snAdvisories: snCount,
            nvdCves: nvdCount,
            totalItems: snCount + nvdCount
        });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">Run Security Scan</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-content">
                        <div className="scan-estimate">
                            <h3>Estimated Payload</h3>
                            <div className="estimate-grid">
                                <div className="estimate-item">
                                    <span className="estimate-label">ServiceNow Advisories:</span>
                                    <span className="estimate-value">{estimated.snAdvisories}</span>
                                </div>
                                <div className="estimate-item">
                                    <span className="estimate-label">NVD CVEs:</span>
                                    <span className="estimate-value">{estimated.nvdCves}</span>
                                </div>
                                <div className="estimate-item total">
                                    <span className="estimate-label">Total Items:</span>
                                    <span className="estimate-value">{estimated.totalItems}</span>
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>Data Sources</h3>
                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={options.includeServiceNow}
                                        onChange={(e) => handleOptionChange('includeServiceNow', e.target.checked)}
                                    />
                                    Include ServiceNow Security Advisories
                                </label>
                            </div>
                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={options.includeNVD}
                                        onChange={(e) => handleOptionChange('includeNVD', e.target.checked)}
                                    />
                                    Include NVD CVE Database
                                </label>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>Filter Options</h3>
                            <div className="form-group">
                                <label htmlFor="minSeverity">Minimum Severity:</label>
                                <select
                                    id="minSeverity"
                                    value={options.minSeverity}
                                    onChange={(e) => handleOptionChange('minSeverity', e.target.value)}
                                    className="form-select"
                                >
                                    <option value="low">Low and above</option>
                                    <option value="medium">Medium and above</option>
                                    <option value="high">High and above</option>
                                    <option value="critical">Critical only</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="productScope">Product Scope:</label>
                                <select
                                    id="productScope"
                                    value={options.productScope}
                                    onChange={(e) => handleOptionChange('productScope', e.target.value)}
                                    className="form-select"
                                >
                                    <option value="all">All Products</option>
                                    <option value="servicenow">ServiceNow Products Only</option>
                                    <option value="plugins">Plugins Only</option>
                                    <option value="applications">Applications Only</option>
                                </select>
                            </div>
                        </div>

                        <div className="scan-warning">
                            <p><strong>Note:</strong> This scan will fetch live data from ServiceNow Security Knowledge Base and NVD CVE API. The process may take several minutes depending on the amount of data to process.</p>
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="btn-primary"
                            disabled={!options.includeServiceNow && !options.includeNVD}
                        >
                            Start Scan ({estimated.totalItems} items)
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}