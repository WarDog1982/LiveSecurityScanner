import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import dashboardPage from '../../client/index.html'

export const LiveSecurityDashboard = UiPage({
    $id: Now.ID['livesecurity_dashboard'],
    endpoint: 'x_138679_livesecur_dashboard.do',
    description: 'LiveSecurityScanner Dashboard - Next Experience styled security scanning interface with real-time progress tracking',
    category: 'general',
    html: dashboardPage,
    direct: true
})