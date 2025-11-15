import { gs, GlideRecord, GlideDateTime } from '@servicenow/glide';

/**
 * InventoryService - Enumerates instance inventory for security matching
 * @class InventoryService
 */
export function InventoryService() {
    
    /**
     * Enumerate instance inventory including plugins, apps, modules, and properties
     * @returns {Object} JSON object containing counts and arrays of inventory items
     */
    this.getInventory = function() {
        var startTime = new GlideDateTime();
        gs.info('[LSS-INV] Starting inventory enumeration at: ' + startTime.getDisplayValue());

        var inventory = {
            timestamp: startTime.getDisplayValue(),
            plugins: [],
            applications: [],
            modules: [],
            properties: [],
            counts: {
                plugins: 0,
                applications: 0,
                modules: 0,
                properties: 0
            }
        };

        try {
            // Enumerate plugins
            var pluginGr = new GlideRecord('sys_plugins');
            pluginGr.addQuery('active', true);
            pluginGr.query();
            
            while (pluginGr.next()) {
                inventory.plugins.push({
                    sys_id: pluginGr.getUniqueValue(),
                    id: pluginGr.getValue('id') || pluginGr.getValue('name'),
                    name: pluginGr.getDisplayValue('name'),
                    version: pluginGr.getValue('version') || '1.0.0',
                    vendor: 'ServiceNow',
                    type: 'plugin'
                });
            }
            inventory.counts.plugins = inventory.plugins.length;
            gs.info('[LSS-INV] Enumerated ' + inventory.counts.plugins + ' active plugins');

            // Enumerate applications
            var appGr = new GlideRecord('sys_app');
            appGr.addQuery('active', true);
            appGr.query();
            
            while (appGr.next()) {
                inventory.applications.push({
                    sys_id: appGr.getUniqueValue(),
                    name: appGr.getDisplayValue('name'),
                    version: appGr.getValue('version') || '1.0.0',
                    vendor: appGr.getDisplayValue('vendor') || 'ServiceNow',
                    scope: appGr.getValue('scope') || 'global',
                    type: 'application'
                });
            }
            inventory.counts.applications = inventory.applications.length;
            gs.info('[LSS-INV] Enumerated ' + inventory.counts.applications + ' active applications');

            // Enumerate app modules if table exists
            if (gs.tableExists('sys_app_module')) {
                var moduleGr = new GlideRecord('sys_app_module');
                moduleGr.setLimit(50); // Limit to avoid performance issues
                moduleGr.query();
                
                while (moduleGr.next()) {
                    inventory.modules.push({
                        sys_id: moduleGr.getUniqueValue(),
                        name: moduleGr.getDisplayValue('title') || moduleGr.getDisplayValue('name'),
                        version: '1.0.0', // Modules don't typically have versions
                        application: moduleGr.getDisplayValue('application'),
                        type: 'module'
                    });
                }
                inventory.counts.modules = inventory.modules.length;
                gs.info('[LSS-INV] Enumerated ' + inventory.counts.modules + ' application modules');
            }

            // Enumerate key system properties
            var propertyGr = new GlideRecord('sys_properties');
            propertyGr.addQuery('name', 'CONTAINS', 'version');
            propertyGr.addOrCondition('name', 'CONTAINS', 'build');
            propertyGr.addOrCondition('name', 'CONTAINS', 'release');
            propertyGr.setLimit(100); // Limit to avoid performance issues
            propertyGr.query();
            
            while (propertyGr.next()) {
                inventory.properties.push({
                    sys_id: propertyGr.getUniqueValue(),
                    name: propertyGr.getValue('name'),
                    value: propertyGr.getValue('value') || '',
                    type: 'property'
                });
            }
            inventory.counts.properties = inventory.properties.length;
            gs.info('[LSS-INV] Enumerated ' + inventory.counts.properties + ' version-related system properties');

            var endTime = new GlideDateTime();
            gs.info('[LSS-INV] Completed inventory enumeration at: ' + endTime.getDisplayValue());
            
            return inventory;

        } catch (error) {
            gs.error('[LSS-INV] Error during inventory enumeration: ' + error.message);
            
            // Return safe fallback data on error
            return {
                timestamp: new GlideDateTime().getDisplayValue(),
                plugins: [],
                applications: [],
                modules: [],
                properties: [],
                counts: {
                    plugins: 0,
                    applications: 0,
                    modules: 0,
                    properties: 0
                },
                error: error.message
            };
        }
    };
}