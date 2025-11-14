import { gs } from '@servicenow/glide';

export function getInventory(request, response) {
    try {
        gs.log('[LSS-API] Inventory API called by user: ' + gs.getUserName(), 'LiveSecurityScanner');
        
        var inventoryService = new x_138679_livesecur.InventoryService();
        var inventory = inventoryService.getInventory();
        
        response.setStatus(200);
        response.setHeader('Content-Type', 'application/json');
        response.getStreamWriter().writeString(JSON.stringify(inventory));
        
        gs.log('[LSS-API] Inventory API completed successfully', 'LiveSecurityScanner');
        
    } catch (error) {
        gs.error('[LSS-API] Error in inventory API: ' + error.message, 'LiveSecurityScanner');
        
        response.setStatus(500);
        response.setHeader('Content-Type', 'application/json');
        response.getStreamWriter().writeString(JSON.stringify({
            error: 'Internal server error',
            message: error.message
        }));
    }
}