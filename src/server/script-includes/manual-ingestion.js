/**
 * Manual trigger for live data ingestion - can be run from Scripts > Scripts - Background
 * This provides a simple interface to trigger live data ingestion manually
 */
function runLiveDataIngestion() {
    try {
        gs.info('[LSS-MANUAL] Starting manual live data ingestion');
        
        var ingestionService = new LiveDataIngestionService();
        var results = ingestionService.runLiveIngestion();
        
        gs.info('[LSS-MANUAL] Live data ingestion completed');
        gs.info('[LSS-MANUAL] ServiceNow advisories: ' + (results.servicenow.success ? results.servicenow.advisories : 'Failed'));
        gs.info('[LSS-MANUAL] NVD advisories: ' + (results.nvd.success ? results.nvd.advisories : 'Failed'));
        gs.info('[LSS-MANUAL] Total NVD results available: ' + results.nvd.totalResults);
        gs.info('[LSS-MANUAL] Records ingested: ' + results.ingestion.ingested);
        gs.info('[LSS-MANUAL] Records updated: ' + results.ingestion.updated);
        
        return results;
        
    } catch (error) {
        gs.error('[LSS-MANUAL] Error during manual ingestion: ' + error.message);
        return { error: error.message };
    }
}