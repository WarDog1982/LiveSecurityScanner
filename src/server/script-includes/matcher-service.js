import { gs, GlideRecord, GlideDateTime } from '@servicenow/glide';

var MatcherService = Class.create();
MatcherService.prototype = {
    initialize: function() {},

    /**
     * Perform deterministic matching of advisory against inventory
     * @param {String} advisorySysId - sys_id of the advisory record
     * @returns {Array} Array of match results
     */
    performMatching: function(advisorySysId) {
        gs.log('[LSS-MATCH] Starting deterministic matching for advisory: ' + advisorySysId, 'LiveSecurityScanner');
        
        var matches = [];
        
        try {
            // Get advisory record
            var advisoryGr = new GlideRecord('x_138679_livesecur_advisory');
            if (!advisoryGr.get(advisorySysId)) {
                gs.error('[LSS-MATCH] Advisory not found: ' + advisorySysId, 'LiveSecurityScanner');
                return matches;
            }

            var productListStr = advisoryGr.getValue('product_list');
            if (!productListStr) {
                gs.log('[LSS-MATCH] No product list found for advisory: ' + advisorySysId, 'LiveSecurityScanner');
                return matches;
            }

            var productList = [];
            try {
                productList = JSON.parse(productListStr);
            } catch (parseError) {
                gs.error('[LSS-MATCH] Failed to parse product list JSON: ' + parseError.message, 'LiveSecurityScanner');
                return matches;
            }

            // Get inventory
            var inventoryService = new x_138679_livesecur.InventoryService();
            var inventory = inventoryService.getInventory();

            gs.log('[LSS-MATCH] Matching ' + productList.length + ' products against inventory', 'LiveSecurityScanner');

            // Match against each product in the list
            for (var i = 0; i < productList.length; i++) {
                var product = productList[i];
                
                // Match against plugins
                matches = matches.concat(this._matchAgainstItems(product, inventory.plugins, 'plugin'));
                
                // Match against applications  
                matches = matches.concat(this._matchAgainstItems(product, inventory.applications, 'application'));
                
                // Match against modules
                matches = matches.concat(this._matchAgainstItems(product, inventory.modules, 'module'));
            }

            gs.log('[LSS-MATCH] Found ' + matches.length + ' potential matches', 'LiveSecurityScanner');

            // Create Finding records for matches
            var findingsCreated = 0;
            for (var j = 0; j < matches.length; j++) {
                if (this._createFinding(advisorySysId, matches[j], advisoryGr)) {
                    findingsCreated++;
                }
            }

            gs.log('[LSS-MATCH] Created ' + findingsCreated + ' finding records', 'LiveSecurityScanner');
            return matches;

        } catch (error) {
            gs.error('[LSS-MATCH] Error during matching: ' + error.message, 'LiveSecurityScanner');
            return matches;
        }
    },

    /**
     * Match a product against inventory items
     * @param {Object} product - Product object from advisory
     * @param {Array} items - Array of inventory items
     * @param {String} type - Type of items (plugin, application, module)
     * @returns {Array} Array of matches
     */
    _matchAgainstItems: function(product, items, type) {
        var matches = [];
        
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var match = this._checkMatch(product, item, type);
            
            if (match.matched) {
                matches.push(match);
                gs.log('[LSS-MATCH] Match found: ' + item.name + ' (version: ' + item.version + ')', 'LiveSecurityScanner');
            }
        }
        
        return matches;
    },

    /**
     * Check if a product matches an inventory item
     * @param {Object} product - Product from advisory
     * @param {Object} item - Inventory item
     * @param {String} type - Item type
     * @returns {Object} Match result
     */
    _checkMatch: function(product, item, type) {
        var match = {
            product: product,
            artifact_type: type,
            artifact_sys_id: item.sys_id,
            target_version: item.version,
            range: product.range || product.version,
            matched: false,
            confidence: 0.0
        };

        // Check name match
        var nameMatch = this._checkNameMatch(product, item);
        if (!nameMatch) {
            return match;
        }

        // Check version match if version constraints exist
        var versionMatch = this._checkVersionMatch(product, item);
        
        match.matched = nameMatch && versionMatch.matched;
        match.confidence = nameMatch ? (versionMatch.matched ? 0.9 : 0.7) : 0.0;
        
        if (match.matched) {
            gs.log('[LSS-MATCH] Product ' + product.product + ' matches ' + item.name + 
                   ' (confidence: ' + match.confidence + ')', 'LiveSecurityScanner');
        }
        
        return match;
    },

    /**
     * Check if product name matches item name
     * @param {Object} product - Product from advisory
     * @param {Object} item - Inventory item
     * @returns {Boolean} True if names match
     */
    _checkNameMatch: function(product, item) {
        var productName = (product.product || '').toLowerCase();
        var itemName = (item.name || '').toLowerCase();
        
        // Direct match
        if (productName === itemName) {
            return true;
        }
        
        // Substring match for ServiceNow products
        if (productName.indexOf('servicenow') >= 0 || itemName.indexOf('servicenow') >= 0) {
            return productName.indexOf('servicenow') >= 0 && itemName.indexOf('servicenow') >= 0;
        }
        
        // Check if one contains the other
        return productName.indexOf(itemName) >= 0 || itemName.indexOf(productName) >= 0;
    },

    /**
     * Check if product version constraints match item version
     * @param {Object} product - Product from advisory  
     * @param {Object} item - Inventory item
     * @returns {Object} Version match result
     */
    _checkVersionMatch: function(product, item) {
        var result = { matched: true, reason: 'no_constraint' };
        
        if (!product.version && !product.range) {
            return result;
        }
        
        var itemVersion = item.version || '1.0.0';
        var constraint = product.range || product.version;
        
        try {
            // Parse version constraint
            if (constraint.indexOf('>=') === 0) {
                var minVersion = constraint.substring(2).trim();
                result.matched = gs.compareVersion(itemVersion, minVersion) >= 0;
                result.reason = 'greater_equal_check';
            } else if (constraint.indexOf('<=') === 0) {
                var maxVersion = constraint.substring(2).trim();
                result.matched = gs.compareVersion(itemVersion, maxVersion) <= 0;
                result.reason = 'less_equal_check';
            } else if (constraint.indexOf('==') === 0) {
                var exactVersion = constraint.substring(2).trim();
                result.matched = gs.compareVersion(itemVersion, exactVersion) === 0;
                result.reason = 'exact_check';
            } else if (constraint.indexOf(' - ') > 0) {
                var parts = constraint.split(' - ');
                var minVer = parts[0].trim();
                var maxVer = parts[1].trim();
                result.matched = gs.compareVersion(itemVersion, minVer) >= 0 && 
                                gs.compareVersion(itemVersion, maxVer) <= 0;
                result.reason = 'range_check';
            } else {
                // Default exact match
                result.matched = gs.compareVersion(itemVersion, constraint) === 0;
                result.reason = 'default_exact';
            }
        } catch (versionError) {
            gs.warn('[LSS-MATCH] Version comparison error: ' + versionError.message, 'LiveSecurityScanner');
            result.matched = true; // Be permissive on version errors
            result.reason = 'version_error_fallback';
        }
        
        return result;
    },

    /**
     * Create a Finding record for a match
     * @param {String} advisorySysId - Advisory sys_id
     * @param {Object} match - Match result object
     * @param {GlideRecord} advisoryGr - Advisory GlideRecord
     * @returns {Boolean} True if finding created successfully
     */
    _createFinding: function(advisorySysId, match, advisoryGr) {
        try {
            var findingGr = new GlideRecord('x_138679_livesecur_finding');
            findingGr.initialize();
            
            findingGr.setValue('advisory_ref', advisorySysId);
            findingGr.setValue('instance_artifact', match.product.product + ' (' + match.artifact_type + ')');
            findingGr.setValue('artifact_sys_id', match.artifact_sys_id);
            findingGr.setValue('match_confidence', match.confidence);
            findingGr.setValue('status', 'new');
            findingGr.setValue('detected_on', new GlideDateTime());
            
            // Calculate risk score based on advisory severity
            var riskScore = this._calculateRiskScore(advisoryGr.getValue('severity'), match.confidence);
            findingGr.setValue('risk_score', riskScore);
            
            // Set priority based on risk score
            var priority = this._calculatePriority(riskScore);
            findingGr.setValue('priority', priority);
            
            var sysId = findingGr.insert();
            
            if (sysId) {
                gs.log('[LSS-MATCH] Created finding: ' + sysId + ' for match: ' + match.product.product, 'LiveSecurityScanner');
                return true;
            } else {
                gs.error('[LSS-MATCH] Failed to create finding for match: ' + match.product.product, 'LiveSecurityScanner');
                return false;
            }
            
        } catch (error) {
            gs.error('[LSS-MATCH] Error creating finding: ' + error.message, 'LiveSecurityScanner');
            return false;
        }
    },

    /**
     * Calculate risk score based on severity and confidence
     * @param {String} severity - Advisory severity
     * @param {Number} confidence - Match confidence
     * @returns {Number} Risk score (0-100)
     */
    _calculateRiskScore: function(severity, confidence) {
        var severityScore = 0;
        
        switch (severity) {
            case 'critical': severityScore = 100; break;
            case 'high': severityScore = 80; break;
            case 'medium': severityScore = 60; break;
            case 'low': severityScore = 40; break;
            default: severityScore = 20; break;
        }
        
        return Math.round(severityScore * confidence);
    },

    /**
     * Calculate priority based on risk score
     * @param {Number} riskScore - Risk score (0-100)
     * @returns {String} Priority level
     */
    _calculatePriority: function(riskScore) {
        if (riskScore >= 80) return 'critical';
        if (riskScore >= 60) return 'high';
        if (riskScore >= 40) return 'medium';
        return 'low';
    },

    type: 'MatcherService'
};