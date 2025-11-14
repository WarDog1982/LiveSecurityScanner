import { gs, GlideRecord } from '@servicenow/glide';

var InventoryService = Class.create();
InventoryService.prototype = {
    initialize: function() {},

    /**
     * Enumerate instance inventory including plugins, apps, modules, and properties
     * @returns {Object} JSON object containing counts and arrays of inventory items
     */
    getInventory: function() {
        var startTime = new GlideDateTime();
        gs.log('[LSS-INV] Starting inventory enumeration at: ' + startTime.getDisplayValue(), 'LiveSecurityScanner');

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
                    id: pluginGr.getValue('id'),
                    name: pluginGr.getValue('name'),
                    version: pluginGr.getValue('version'),
                    vendor: 'ServiceNow',
                    type: 'plugin'
                });
            }
            inventory.counts.plugins = inventory.plugins.length;
            gs.log('[LSS-INV] Enumerated ' + inventory.counts.plugins + ' active plugins', 'LiveSecurityScanner');

            // Enumerate applications
            var appGr = new GlideRecord('sys_app');
            appGr.addQuery('active', true);
            appGr.query();
            
            while (appGr.next()) {
                inventory.applications.push({
                    sys_id: appGr.getUniqueValue(),
                    name: appGr.getValue('name'),
                    version: appGr.getValue('version'),
                    vendor: appGr.getValue('vendor') || 'ServiceNow',
                    scope: appGr.getValue('scope'),
                    type: 'application'
                });
            }
            inventory.counts.applications = inventory.applications.length;
            gs.log('[LSS-INV] Enumerated ' + inventory.counts.applications + ' active applications', 'LiveSecurityScanner');

            // Enumerate app modules if table exists
            if (gs.tableExists('sys_app_module')) {
                var moduleGr = new GlideRecord('sys_app_module');
                moduleGr.query();
                
                while (moduleGr.next()) {
                    inventory.modules.push({
                        sys_id: moduleGr.getUniqueValue(),
                        name: moduleGr.getValue('name'),
                        version: moduleGr.getValue('version') || '1.0.0',
                        application: moduleGr.getValue('application'),
                        type: 'module'
                    });
                }
                inventory.counts.modules = inventory.modules.length;
                gs.log('[LSS-INV] Enumerated ' + inventory.counts.modules + ' application modules', 'LiveSecurityScanner');
            }

            // Enumerate key system properties
            var propertyGr = new GlideRecord('sys_properties');
            propertyGr.addQuery('name', 'CONTAINS', 'version');
            propertyGr.addOrCondition('name', 'CONTAINS', 'build');
            propertyGr.addOrCondition('name', 'CONTAINS', 'release');
            propertyGr.query();
            
            while (propertyGr.next()) {
                inventory.properties.push({
                    sys_id: propertyGr.getUniqueValue(),
                    name: propertyGr.getValue('name'),
                    value: propertyGr.getValue('value'),
                    type: 'property'
                });
            }
            inventory.counts.properties = inventory.properties.length;
            gs.log('[LSS-INV] Enumerated ' + inventory.counts.properties + ' version-related system properties', 'LiveSecurityScanner');

            var endTime = new GlideDateTime();
            gs.log('[LSS-INV] Completed inventory enumeration at: ' + endTime.getDisplayValue(), 'LiveSecurityScanner');
            
            return inventory;

        } catch (error) {
            gs.error('[LSS-INV] Error during inventory enumeration: ' + error.message, 'LiveSecurityScanner');
            inventory.error = error.message;
            return inventory;
        }
    },

    type: 'InventoryService'
};