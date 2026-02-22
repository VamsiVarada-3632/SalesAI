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
            { label: 'Prospecting', href: '/prospecting', icon: 'group' },
            { label: 'Analytics', href: '/analytics', icon: 'analytics' },
            { label: 'Leaderboard', href: '/leaderboard', icon: 'leaderboard' },
            { label: 'Call Hub', href: '/call-hub', icon: 'call' },
            { label: 'Sequences', href: '/sequences', icon: 'format_list_bulleted' },
            { label: 'Email Health', href: '/email-health/1', icon: 'mail' },
            { label: 'Contacts', href: '/contacts', icon: 'contacts' },
            { label: 'Leads', href: '/leads', icon: 'person_search' },
        ],
    },
    {
        title: 'Settings',
        items: [
            { label: 'CRM Sync', href: '/settings/crm-sync', icon: 'sync' },
            { label: 'Salesforce', href: '/settings', icon: 'cloud' },
        ],
    },
];

export const user = {
    name: 'Alex Morgan',
    email: 'alex@salesai.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdWExAtMhOTeaXTwi6lyzDivSz4t2boFJG50MoawpyMxwvixoKyBHRrMNtU77s38b3oB4cad64GnBpR0vrT90Bb0YWFXILTS2fByKXhKKU39et859OR1XfGQRnwsaYjsX5NikLLhnpfEoFs-ufWPKIC8h4F1rflOtGmgzNJTNAkuwGVtEr8PU4IcZViCp8DRA186YxR7dUdejfJNUIyZxNncrQ7Tg8DCNSNB11jSCcJ3a3VEaxN5hpWSWsQHz--9ZrJH3RphuEg5A',
    plan: 'Pro Plan',
};
