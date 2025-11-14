# LiveSecurityScanner - Testing Procedures and Acceptance Criteria

## Overview
This document provides comprehensive testing procedures and acceptance criteria for the LiveSecurityScanner ServiceNow application.

## Application URLs (After Deployment)
- **Main Dashboard**: https://dev304239.service-now.com/x_138679_livesecur_dashboard.do
- **Security Advisories**: https://dev304239.service-now.com/x_138679_livesecur_advisory_list.do
- **Security Findings**: https://dev304239.service-now.com/x_138679_livesecur_finding_list.do
- **Scan Jobs**: https://dev304239.service-now.com/x_138679_livesecur_scan_job_list.do
- **Security Tasks**: https://dev304239.service-now.com/x_138679_livesecur_sec_task_list.do

## Pre-Testing Setup

### 1. Verify Role Assignment
```
Navigate to: User Administration > Users
- Assign 'x_138679_livesecur.admin' role to test admin user
- Assign 'x_138679_livesecur.user' role to test user
- Assign 'x_138679_livesecur.reader' role to read-only test user
```

### 2. Load Demo Data
If not automatically loaded, manually create test records in the Security Advisory table to validate dashboard widgets.

## Core Functionality Testing

### Test 1: Dashboard Access and Display
**Objective**: Verify Next Experience dashboard loads and displays data correctly

**Steps**:
1. Navigate to `x_138679_livesecur_dashboard.do`
2. Verify dashboard loads without errors
3. Check all four widget cards are displayed:
   - Security Advisories
   - Security Findings  
   - Scan Jobs
   - Instance Inventory
4. Verify summary metrics at bottom show correct counts
5. Test responsive design by resizing browser window

**Expected Results**:
- ✅ Dashboard loads within 3 seconds
- ✅ All widgets display data or "No data available" message
- ✅ Next Experience styling is consistent
- ✅ No JavaScript console errors
- ✅ Responsive layout works on mobile/tablet sizes

### Test 2: "Run Scan Now" Modal Functionality
**Objective**: Verify modal-only user interaction and progress tracking

**Steps**:
1. Click "Run Scan Now" button in dashboard header
2. Verify modal opens with scan configuration options
3. Check payload estimation updates when changing filters
4. Configure scan with different options:
   - Toggle ServiceNow Advisories
   - Toggle NVD CVE Database
   - Change minimum severity
   - Change product scope
5. Click "Start Scan" button
6. Verify progress modal appears immediately
7. Watch real-time progress updates
8. Verify completion modal shows success message

**Expected Results**:
- ✅ Modal opens without page refresh
- ✅ Payload counts update dynamically
- ✅ No browser alerts or vanilla popups used
- ✅ Progress modal shows live remaining item counts
- ✅ Total items counted before processing begins
- ✅ Progress updates every 1-2 seconds
- ✅ Completion message appears after success

### Test 3: REST API Integration
**Objective**: Verify REST endpoints work correctly

**Steps**:
1. Test Inventory API directly:
   ```
   GET /api/x_138679_livesecur_inventory
   Headers: X-UserToken: [session_token]
   ```
2. Test Table API access for all tables:
   ```
   GET /api/now/table/x_138679_livesecur_advisory?sysparm_limit=1
   GET /api/now/table/x_138679_livesecur_finding?sysparm_limit=1
   GET /api/now/table/x_138679_livesecur_scan_job?sysparm_limit=1
   ```
3. Verify proper authentication headers are used
4. Check error handling for unauthorized requests

**Expected Results**:
- ✅ Inventory API returns JSON with counts and arrays
- ✅ Table APIs return proper ServiceNow JSON format
- ✅ Authentication is required for all endpoints
- ✅ Proper error messages for failed requests
- ✅ No GlideAjax usage detected

### Test 4: Deterministic Matching Engine
**Objective**: Verify version matching logic using gs.compareVersion

**Steps**:
1. Create test advisory with version constraints:
   ```
   Product List: [{"vendor":"ServiceNow","product":"ServiceNow Platform","version":">=Utah","range":">=Utah"}]
   ```
2. Trigger manual scan or use MatcherService directly
3. Verify findings are created for matching inventory items
4. Test various version comparison scenarios:
   - Exact matches ("==Utah")
   - Range matches ("Utah - Vancouver") 
   - Greater/equal matches (">=Tokyo")
   - Less/equal matches ("<=Washington")

**Expected Results**:
- ✅ Only matching inventory items generate findings
- ✅ Version comparisons use gs.compareVersion correctly
- ✅ Match confidence scores are calculated (0.0-1.0)
- ✅ Risk scores computed based on severity and confidence
- ✅ Priority levels assigned correctly (low/medium/high/critical)

### Test 5: Business Rule Flow Automation
**Objective**: Verify automatic task creation when findings are created

**Steps**:
1. Create a new Finding record with status='new'
2. Verify Business Rule triggers automatically
3. Check that Security Review Task is created
4. Verify Finding status updates to 'triage'
5. Check notification event is queued
6. Verify task contains proper links and descriptions

**Expected Results**:
- ✅ Security Review Task created automatically
- ✅ Task contains finding details and remediation guidance
- ✅ Task assigned to security group member
- ✅ Priority mapped correctly from finding
- ✅ Finding status updated to 'triage'
- ✅ Event logged for notification

### Test 6: LLM Enrichment Service
**Objective**: Verify enrichment with graceful fallback

**Steps**:
1. Test with ServiceNow Generative AI disabled (normal case)
2. Create finding without remediation text
3. Call EnrichmentService.enrichFinding()
4. Verify fallback enrichment generates appropriate text
5. If Generative AI available, test AI integration

**Expected Results**:
- ✅ Fallback enrichment always works
- ✅ Remediation text generated based on severity and component
- ✅ No errors when AI services unavailable
- ✅ Confidence levels updated appropriately
- ✅ Batch enrichment processes multiple findings

### Test 7: Scheduled Job Execution
**Objective**: Verify nightly scan job processes correctly

**Steps**:
1. Navigate to System Definition > Scheduled Jobs
2. Find "LiveSecurityScanner - Nightly Ingest and Scan"
3. Execute job manually using "Execute Now"
4. Monitor system logs for [LSS-*] prefixed messages
5. Check job creates Scan Job record
6. Verify import set tables populated
7. Check transform maps process records correctly

**Expected Results**:
- ✅ Job executes without errors
- ✅ All processing steps logged with [LSS-*] prefixes
- ✅ Mock data created in import set tables
- ✅ Transform maps coalesce on advisory_id
- ✅ Severity normalization works correctly
- ✅ Job summary contains accurate counts
- ✅ Error handling captures and logs failures

### Test 8: Security and Access Control
**Objective**: Verify ACLs enforce proper permissions

**Steps**:
1. Test with different user roles:
   - Admin user: Full access to all operations
   - User role: Read/write findings, create scan jobs
   - Reader role: Read-only access only
2. Attempt unauthorized operations
3. Check ACL decision logging
4. Verify cross-scope access tracking

**Expected Results**:
- ✅ Admin users can perform all operations
- ✅ Users can create/update findings but not delete
- ✅ Readers can only view data
- ✅ ACL scripts log principal and decision
- ✅ Unauthorized writes denied with logged reasons
- ✅ Cross-scope access properly tracked

## Integration Testing

### Test 9: End-to-End Scan Workflow
**Objective**: Verify complete scan-to-finding workflow

**Steps**:
1. Start fresh with empty advisory table
2. Run "Manual Scan" from dashboard
3. Monitor progress through all phases
4. Verify advisories created in target table
5. Check findings generated from matching
6. Verify tasks created for new findings
7. Check enrichment applied to findings
8. Validate audit trail in logs

**Expected Results**:
- ✅ Complete workflow executes without errors
- ✅ Data flows correctly through all stages
- ✅ No duplicate advisories created (coalescing works)
- ✅ Findings only created for valid matches
- ✅ Tasks generated for actionable findings
- ✅ Full audit trail in ServiceNow logs

### Test 10: Error Handling and Recovery
**Objective**: Verify graceful error handling

**Steps**:
1. Test with invalid API endpoints
2. Simulate JSON parsing errors
3. Test with missing referenced records
4. Verify network timeout handling
5. Check database constraint violations
6. Test with insufficient permissions

**Expected Results**:
- ✅ All errors logged with context and stack traces
- ✅ User receives meaningful error messages
- ✅ Failed operations don't leave partial data
- ✅ System continues operating after errors
- ✅ Recovery procedures documented in logs

## Performance Testing

### Test 11: Dashboard Load Performance
**Objective**: Verify acceptable performance with realistic data volumes

**Steps**:
1. Create 100+ advisory records
2. Generate 500+ finding records  
3. Create 50+ scan job records
4. Measure dashboard load time
5. Check widget rendering performance
6. Test with slow network conditions

**Expected Results**:
- ✅ Dashboard loads in under 5 seconds with 1000+ records
- ✅ Widgets render progressively
- ✅ No blocking operations on UI thread
- ✅ Reasonable performance on mobile devices

### Test 12: Scan Processing Performance
**Objective**: Verify scan performance with larger datasets

**Steps**:
1. Configure scan to process 200+ advisories
2. Monitor memory usage during processing
3. Check processing time per advisory
4. Verify progress updates remain responsive
5. Test concurrent scan operations

**Expected Results**:
- ✅ Processing completes within reasonable timeframe
- ✅ Memory usage stays within limits
- ✅ Progress updates don't lag behind actual progress
- ✅ System handles concurrent operations gracefully

## Browser Compatibility Testing

### Test 13: Cross-Browser Support
**Objective**: Verify compatibility with supported browsers

**Test Matrix**:
- Chrome (latest)
- Firefox (latest) 
- Safari (latest)
- Edge (latest)

**Steps for each browser**:
1. Load dashboard and verify layout
2. Test modal functionality
3. Verify progress tracking
4. Check console for errors
5. Test responsive behavior

**Expected Results**:
- ✅ Consistent appearance across browsers
- ✅ Full functionality in all supported browsers
- ✅ No browser-specific JavaScript errors
- ✅ Responsive design works consistently

## Acceptance Criteria Summary

### Functional Requirements ✅
- [x] Live data ingestion from ServiceNow KB and NVD API (simulated)
- [x] Deterministic matching with version range support
- [x] LLM enrichment with fallback capability  
- [x] Flow automation for security review tasks
- [x] Next Experience styled dashboard
- [x] Modal-only user interactions (no alerts)
- [x] Real-time progress tracking with remaining counts
- [x] Comprehensive audit logging with [LSS-*] prefixes

### Technical Requirements ✅
- [x] ServiceNow best practices compliance
- [x] No external libraries (platform-native only)
- [x] REST APIs only (no GlideAjax)
- [x] Proper error handling with graceful degradation
- [x] Role-based access control with ACLs
- [x] Scoped application architecture
- [x] Full audit trail for compliance

### User Experience Requirements ✅
- [x] Payload counting before processing begins
- [x] Continuous progress updates during operations
- [x] ServiceNow Next Experience theme compliance
- [x] Responsive design for mobile/tablet
- [x] No emoticons in any content
- [x] Professional, clean interface

### Security Requirements ✅
- [x] Authenticated API access only
- [x] Role-based permission enforcement
- [x] Audit logging of all security decisions
- [x] Cross-scope access tracking
- [x] Secure handling of sensitive security data

## Test Completion Checklist

- [ ] All 13 test scenarios executed successfully
- [ ] No critical or high-severity defects remaining
- [ ] Performance benchmarks met
- [ ] Security requirements validated
- [ ] User acceptance testing completed
- [ ] Documentation reviewed and approved
- [ ] Deployment procedures verified

## Known Limitations

1. **Demo Data**: Uses simulated ServiceNow and NVD endpoints for demonstration
2. **LLM Integration**: Requires ServiceNow Generative AI license for full AI features
3. **Network Dependencies**: Real-time features depend on stable network connectivity
4. **Browser Support**: Optimized for modern browsers supporting ES2022 modules

## Support and Maintenance

**Monitoring**: Check ServiceNow system logs for [LSS-*] prefixed entries
**Troubleshooting**: Enable debug logging in application properties
**Updates**: Follow ServiceNow application update procedures
**Backup**: Regular backup of application tables recommended

---

**Document Version**: 1.0
**Last Updated**: January 2024
**Test Environment**: ServiceNow Utah+ Platform