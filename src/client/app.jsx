import React, { useState, useEffect, useMemo } from 'react';
import { SecurityService } from './services/SecurityService.js';
import Dashboard from './components/Dashboard.jsx';
import RunScanModal from './components/RunScanModal.jsx';
import ProgressModal from './components/ProgressModal.jsx';
import './app.css';

export default function App() {
    const securityService = useMemo(() => new SecurityService(), []);
    const [showRunScanModal, setShowRunScanModal] = useState(false);
    const [showProgressModal, setShowProgressModal] = useState(false);
    const [progressData, setProgressData] = useState({
        phase: 'initializing',
        total: 0,
        remaining: 0,
        message: ''
    });

    const [dashboardData, setDashboardData] = useState({
        advisoryStats: { total: 0, bySource: {}, bySeverity: {} },
        findingStats: { total: 0, byStatus: {}, byPriority: {} },
        scanJobStats: { total: 0, lastRun: null, status: 'idle' },
        inventoryStats: { total: 0, byType: {} }
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load dashboard data on mount
    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const [advisoryStats, findingStats, scanJobStats, inventoryStats] = await Promise.all([
                securityService.getAdvisoryStats(),
                securityService.getFindingStats(), 
                securityService.getScanJobStats(),
                securityService.getInventoryStats()
            ]);

            setDashboardData({
                advisoryStats,
                findingStats,
                scanJobStats,
                inventoryStats
            });

        } catch (err) {
            console.error('Error loading dashboard data:', err);
            setError('Failed to load dashboard data: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRunScan = async (scanOptions) => {
        try {
            setShowRunScanModal(false);
            setShowProgressModal(true);
            setProgressData({
                phase: 'initializing',
                total: 0,
                remaining: 0,
                message: 'Initializing security scan...'
            });

            // Start the scan job
            const scanResult = await securityService.startScan(scanOptions);
            
            if (!scanResult.success) {
                throw new Error(scanResult.error || 'Failed to start scan');
            }

            // Monitor scan progress
            await monitorScanProgress(scanResult.jobId);

        } catch (err) {
            console.error('Error running scan:', err);
            setError('Scan failed: ' + err.message);
            setShowProgressModal(false);
        }
    };

    const monitorScanProgress = async (jobId) => {
        const checkProgress = async () => {
            try {
                const progress = await securityService.getScanProgress(jobId);
                
                setProgressData({
                    phase: progress.phase,
                    total: progress.total,
                    remaining: progress.remaining,
                    message: progress.message
                });

                if (progress.phase === 'completed') {
                    setTimeout(() => {
                        setShowProgressModal(false);
                        loadDashboardData(); // Refresh dashboard
                    }, 2000);
                } else if (progress.phase === 'failed') {
                    throw new Error(progress.message || 'Scan failed');
                } else {
                    // Continue monitoring
                    setTimeout(checkProgress, 2000);
                }

            } catch (err) {
                console.error('Error monitoring scan progress:', err);
                setError('Progress monitoring failed: ' + err.message);
                setShowProgressModal(false);
            }
        };

        checkProgress();
    };

    const handleRefresh = () => {
        loadDashboardData();
    };

    if (loading) {
        return (
            <div className="app-loading">
                <div className="loading-spinner"></div>
                <p>Loading LiveSecurityScanner...</p>
            </div>
        );
    }

    return (
        <div className="livesecurity-app">
            <header className="app-header">
                <h1>LiveSecurityScanner Dashboard</h1>
                <div className="header-actions">
                    <button 
                        className="btn-refresh"
                        onClick={handleRefresh}
                        disabled={loading}
                    >
                        Refresh
                    </button>
                    <button 
                        className="btn-primary btn-run-scan"
                        onClick={() => setShowRunScanModal(true)}
                        disabled={loading || showProgressModal}
                    >
                        Run Scan Now
                    </button>
                </div>
            </header>

            {error && (
                <div className="error-banner">
                    <span className="error-icon">⚠</span>
                    <span className="error-message">{error}</span>
                    <button className="error-close" onClick={() => setError(null)}>✕</button>
                </div>
            )}

            <Dashboard data={dashboardData} onRefresh={handleRefresh} />

            {showRunScanModal && (
                <RunScanModal
                    onRun={handleRunScan}
                    onClose={() => setShowRunScanModal(false)}
                />
            )}

            {showProgressModal && (
                <ProgressModal
                    progress={progressData}
                    onClose={() => setShowProgressModal(false)}
                />
            )}
        </div>
    );
}