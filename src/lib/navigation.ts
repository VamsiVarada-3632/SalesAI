// Centralized navigation configuration for all 24 routes
export interface NavItem {
    label: string;
    href: string;
    icon: string;
    badge?: number | string;
    children?: NavItem[];
}

export interface NavSection {
    title?: string;
    items: NavItem[];
}

export const navSections: NavSection[] = [
    {
        items: [
            { label: 'Dashboard', href: '/', icon: 'dashboard' },
            { label: 'Inbox', href: '/inbox', icon: 'inbox', badge: 12 },
            { label: 'Signals', href: '/signals', icon: 'bolt', badge: 12 },
            { label: 'Prospecting', href: '/prospecting/1', icon: 'group' },
            { label: 'Analytics', href: '/analytics', icon: 'analytics' },
            { label: 'Leaderboard', href: '/leaderboard', icon: 'leaderboard' },
            { label: 'Call Hub', href: '/call-hub', icon: 'call' },
            { label: 'Sequences', href: '/sequences', icon: 'format_list_bulleted' },
            { label: 'Email Health', href: '/email-health/1', icon: 'mail' },
            { label: 'Contacts', href: '/contacts/profile', icon: 'contacts' },
            { label: 'Leads', href: '/leads/enrichment', icon: 'person_search' },
        ],
    },
    {
        title: 'Settings',
        items: [
            { label: 'CRM Sync', href: '/settings/crm-sync', icon: 'sync' },
            { label: 'Salesforce', href: '/settings/salesforce', icon: 'cloud' },
        ],
    },
];

// User is now fetched dynamically from the /users/ API endpoint in the Sidebar component.
