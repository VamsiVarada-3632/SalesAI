import PageHeader from '@/components/ui/PageHeader';

const campaigns = [
    { name: 'CTO Outreach V2', status: 'Active', contacts: 124, openRate: '64%', replyRate: '18%', meetings: 11, created: 'Oct 10, 2023' },
    { name: 'Series B Funded Companies', status: 'Active', contacts: 57, openRate: '71%', replyRate: '22%', meetings: 8, created: 'Oct 15, 2023' },
    { name: 'SaaS Hiring Surge Q4', status: 'Paused', contacts: 89, openRate: '48%', replyRate: '12%', meetings: 4, created: 'Sep 28, 2023' },
    { name: 'VP Sales Re-engagement', status: 'Draft', contacts: 0, openRate: '—', replyRate: '—', meetings: 0, created: 'Oct 22, 2023' },
];

const statusConfig: Record<string, string> = {
    Active: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
    Paused: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
    Draft: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
};

export default function CampaignsPage() {
    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <PageHeader
                title="Campaigns"
                subtitle="Manage and monitor your outreach campaigns"
                actions={
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors shadow-md">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span> New Campaign
                    </button>
                }
            />

            <div className="flex-1 overflow-y-auto no-scrollbar p-8">
                <div className="max-w-6xl mx-auto flex flex-col gap-6">
                    {/* Summary stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'Active Campaigns', value: '2', icon: 'play_arrow' },
                            { label: 'Total Enrolled', value: '270', icon: 'group' },
                            { label: 'Avg Open Rate', value: '61%', icon: 'mail_open' },
                            { label: 'Meetings Generated', value: '23', icon: 'calendar_today' },
                        ].map((s) => (
                            <div key={s.label} className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
                                <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>{s.icon}</span>
                                <p className="text-xl font-bold text-text-primary dark:text-white mt-2">{s.value}</p>
                                <p className="text-xs text-text-secondary dark:text-slate-400">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Campaign table */}
                    <div className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="font-bold text-text-primary dark:text-white">All Campaigns</h3>
                            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg gap-1">
                                {['All', 'Active', 'Paused', 'Draft'].map((f, i) => (
                                    <button key={f} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${i === 0 ? 'bg-white dark:bg-slate-700 shadow-sm font-bold text-text-primary dark:text-white' : 'text-text-secondary dark:text-slate-400 hover:text-text-primary dark:hover:text-white'}`}>{f}</button>
                                ))}
                            </div>
                        </div>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-slate-800 text-text-secondary dark:text-slate-400 text-left">
                                    <th className="px-6 py-3 font-semibold">Campaign</th>
                                    <th className="px-6 py-3 font-semibold">Status</th>
                                    <th className="px-6 py-3 font-semibold">Contacts</th>
                                    <th className="px-6 py-3 font-semibold">Open Rate</th>
                                    <th className="px-6 py-3 font-semibold">Reply Rate</th>
                                    <th className="px-6 py-3 font-semibold">Meetings</th>
                                    <th className="px-6 py-3 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {campaigns.map((c) => (
                                    <tr key={c.name} className="border-b border-slate-50 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-text-primary dark:text-white">{c.name}</p>
                                            <p className="text-xs text-text-secondary dark:text-slate-400">Created {c.created}</p>
                                        </td>
                                        <td className="px-6 py-4"><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusConfig[c.status]}`}>{c.status}</span></td>
                                        <td className="px-6 py-4 text-text-primary dark:text-slate-300 font-medium">{c.contacts}</td>
                                        <td className="px-6 py-4 text-text-primary dark:text-slate-300 font-medium">{c.openRate}</td>
                                        <td className="px-6 py-4 text-text-primary dark:text-slate-300 font-medium">{c.replyRate}</td>
                                        <td className="px-6 py-4 text-text-primary dark:text-slate-300 font-medium">{c.meetings}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-primary"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                                                <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-amber-500"><span className="material-symbols-outlined text-[18px]">{c.status === 'Active' ? 'pause' : 'play_arrow'}</span></button>
                                                <button className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
