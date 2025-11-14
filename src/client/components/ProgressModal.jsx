import React from 'react';

export default function ProgressModal({ progress, onClose }) {
    const getProgressPercentage = () => {
        if (progress.total === 0) return 0;
        return Math.round(((progress.total - progress.remaining) / progress.total) * 100);
    };

    const getPhaseLabel = (phase) => {
        switch (phase) {
            case 'initializing': return 'Initializing';
            case 'fetching_advisories': return 'Fetching Advisories';
            case 'fetching_cves': return 'Fetching CVE Data';
            case 'matching': return 'Matching Inventory';
            case 'enriching': return 'LLM Enrichment';
            case 'completed': return 'Completed';
            case 'failed': return 'Failed';
            default: return 'Processing';
        }
    };

    const getPhaseIcon = (phase) => {
        switch (phase) {
            case 'initializing': return '🔄';
            case 'fetching_advisories': return '📋';
            case 'fetching_cves': return '🔍';
            case 'matching': return '🎯';
            case 'enriching': return '🤖';
            case 'completed': return '✅';
            case 'failed': return '❌';
            default: return '⚙️';
        }
    };

    const percentage = getProgressPercentage();
    const isComplete = progress.phase === 'completed';
    const isFailed = progress.phase === 'failed';

    return (
        <div className="modal-overlay">
            <div className="modal-content progress-modal">
                <div className="modal-header">
                    <h2 className="modal-title">
                        {getPhaseIcon(progress.phase)} {getPhaseLabel(progress.phase)}
                    </h2>
                    {(isComplete || isFailed) && (
                        <button className="modal-close" onClick={onClose}>×</button>
                    )}
                </div>

                <div className="progress-content">
                    <div className="progress-bar-container">
                        <div className="progress-bar">
                            <div 
                                className={`progress-fill ${isFailed ? 'error' : isComplete ? 'complete' : ''}`}
                                style={{ width: `${percentage}%` }}
                            ></div>
                        </div>
                        <div className="progress-text">
                            {percentage}% Complete
                        </div>
                    </div>

                    <div className="progress-details">
                        <div className="progress-message">
                            {progress.message}
                        </div>
                        
                        {progress.total > 0 && !isComplete && !isFailed && (
                            <div className="progress-stats">
                                <div className="stat">
                                    <span className="stat-label">Total Items:</span>
                                    <span className="stat-value">{progress.total}</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-label">Remaining:</span>
                                    <span className="stat-value">{progress.remaining}</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-label">Processed:</span>
                                    <span className="stat-value">{progress.total - progress.remaining}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {isComplete && (
                        <div className="completion-message">
                            <p>✅ Security scan completed successfully!</p>
                            <p>The dashboard has been refreshed with the latest findings.</p>
                        </div>
                    )}

                    {isFailed && (
                        <div className="error-message">
                            <p>❌ Security scan failed.</p>
                            <p>Please check the logs and try again.</p>
                        </div>
                    )}
                </div>

                {(isComplete || isFailed) && (
                    <div className="modal-actions">
                        <button className="btn-primary" onClick={onClose}>
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}