import PageHeader from '@/components/ui/PageHeader';

const team = [
    { name: 'Alex Morgan', role: 'SDR Lead', email: 'alex@salesai.com', status: 'Active', meetings: 18, openRate: '59%', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdWExAtMhOTeaXTwi6lyzDivSz4t2boFJG50MoawpyMxwvixoKyBHRrMNtU77s38b3oB4cad64GnBpR0vrT90Bb0YWFXILTS2fByKXhKKU39et859OR1XfGQRnwsaYjsX5NikLLhnpfEoFs-ufWPKIC8h4F1rflOtGmgzNJTNAkuwGVtEr8PU4IcZViCp8DRA186YxR7dUdejfJNUIyZxNncrQ7Tg8DCNSNB11jSCcJ3a3VEaxN5hpWSWsQHz--9ZrJH3RphuEg5A' },
    { name: 'Jordan Anderson', role: 'Senior SDR', email: 'jordan@salesai.com', status: 'Active', meetings: 24, openRate: '68%', avatar: null, initials: 'JA' },
    { name: 'Casey Brown', role: 'SDR', email: 'casey@salesai.com', status: 'Active', meetings: 21, openRate: '64%', avatar: null, initials: 'CB' },
    { name: 'Morgan Chen', role: 'SDR', email: 'morgan@salesai.com', status: 'On Leave', meetings: 16, openRate: '55%', avatar: null, initials: 'MC' },
    { name: 'Riley Johnson', role: 'SDR (New)', email: 'riley@salesai.com', status: 'Onboarding', meetings: 14, openRate: '51%', avatar: null, initials: 'RJ' },
];

const statusConfig: Record<string, string> = {
    Active: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
    'On Leave': 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
    Onboarding: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
};

export default function TeamPage() {
    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <PageHeader
                title="Sales Team"
                subtitle="View team members, performance, and manage roles"
                actions={
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors shadow-md">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>person_add</span> Invite Member
                    </button>
                }
            />

            <div className="flex-1 overflow-y-auto no-scrollbar p-8">
                <div className="max-w-6xl mx-auto flex flex-col gap-6">
                    {/* Team stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'Team Size', value: '5', icon: 'group' },
                            { label: 'Active Members', value: '3', icon: 'check_circle' },
                            { label: 'Avg Open Rate', value: '59%', icon: 'mail_open' },
                            { label: 'Team Quota', value: '87%', icon: 'percent' },
                        ].map((s) => (
                            <div key={s.label} className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
                                <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>{s.icon}</span>
                                <p className="text-xl font-bold text-text-primary dark:text-white mt-2">{s.value}</p>
                                <p className="text-xs text-text-secondary dark:text-slate-400">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Team member cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {team.map((member) => (
                            <div key={member.name} className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:border-primary/30 hover:shadow-md transition-all group">
                                <div className="flex items-start gap-4">
                                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden shrink-0">
                                        {member.avatar ? <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" /> : (member as any).initials}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h3 className="font-bold text-text-primary dark:text-white truncate">{member.name}</h3>
                                        </div>
                                        <p className="text-xs text-text-secondary dark:text-slate-400">{member.role}</p>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1.5 inline-block ${statusConfig[member.status]}`}>{member.status}</span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-[10px] text-text-secondary dark:text-slate-500 uppercase font-bold tracking-wider">Meetings</p>
                                        <p className="text-lg font-bold text-text-primary dark:text-white mt-0.5">{member.meetings}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-text-secondary dark:text-slate-500 uppercase font-bold tracking-wider">Open Rate</p>
                                        <p className="text-lg font-bold text-text-primary dark:text-white mt-0.5">{member.openRate}</p>
                                    </div>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-text-secondary dark:text-slate-300 hover:border-primary hover:text-primary dark:hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[16px]">bar_chart</span> Stats
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-text-secondary dark:text-slate-300 hover:border-primary hover:text-primary dark:hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[16px]">manage_accounts</span> Manage
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
