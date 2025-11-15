import { gs } from '@servicenow/glide';
import { LiveDataIngestionService } from '../script-includes/live-data-ingestion.js';

export function postIngest(request, response) {
    try {
        gs.info('[LSS-API] Live data ingestion API called by user: ' + gs.getUserName());
        
        var requestBody = request.body.data;
        var source = requestBody ? requestBody.source : 'all';
        
        gs.info('[LSS-API] Starting live data ingestion from source: ' + source);
        
        var ingestionService = new LiveDataIngestionService();
        var result = ingestionService.runLiveIngestion();
        
        response.setStatus(200);
        response.setHeader('Content-Type', 'application/json');
        response.getStreamWriter().writeString(JSON.stringify({
            success: true,
            message: 'Live data ingestion completed',
            results: result
        }));
        
        gs.info('[LSS-API] Live data ingestion API completed successfully');
        
    } catch (error) {
        gs.error('[LSS-API] Error in live data ingestion API: ' + error.message);
        
        response.setStatus(500);
        response.setHeader('Content-Type', 'application/json');
        response.getStreamWriter().writeString(JSON.stringify({
            success: false,
            error: 'Live data ingestion failed',
            message: error.message
        }));
    }
}