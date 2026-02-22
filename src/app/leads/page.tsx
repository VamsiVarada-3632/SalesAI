import PageHeader from '@/components/ui/PageHeader';

const leads = [
    { name: 'Acme Corp', contact: 'Sarah Jenkins', role: 'VP Sales', value: '$45,000', stage: 'Discovery', probability: 60, lastActivity: '2d ago', tags: ['High Intent', 'Enterprise'] },
    { name: 'TechFlow Inc', contact: 'David Ross', role: 'CTO', value: '$32,000', stage: 'Qualification', probability: 40, lastActivity: '5h ago', tags: ['SaaS'] },
    { name: 'Globex Corp', contact: 'Elena Rodriguez', role: 'Director', value: '$28,000', stage: 'Proposal', probability: 75, lastActivity: '1d ago', tags: ['Series B', 'High Intent'] },
    { name: 'PSL Partners', contact: 'Harvey Specter', role: 'Senior Partner', value: '$18,000', stage: 'Prospecting', probability: 20, lastActivity: '2w ago', tags: ['Cold'] },
    { name: 'SolarEnergy Co', contact: 'Michael King', role: 'Head of Ops', value: '$55,000', stage: 'Negotiation', probability: 85, lastActivity: '1h ago', tags: ['Close Ready'] },
];

const stages = ['Prospecting', 'Qualification', 'Discovery', 'Proposal', 'Negotiation', 'Closed Won'];

export default function LeadsPage() {
    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <PageHeader
                title="Lead Pipeline"
                subtitle="Track and manage your active opportunities"
                actions={
                    <div className="flex gap-3">
                        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg gap-1">
                            <button className="px-3 py-1.5 rounded-md bg-white dark:bg-slate-700 shadow-sm text-xs font-bold text-text-primary dark:text-white">List</button>
                            <button className="px-3 py-1.5 rounded-md text-xs font-medium text-text-secondary dark:text-slate-400 hover:text-text-primary dark:hover:text-white">Kanban</button>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span> Add Lead
                        </button>
                    </div>
                }
            />

            <div className="flex-1 overflow-y-auto no-scrollbar p-8">
                <div className="max-w-7xl mx-auto flex flex-col gap-6">
                    {/* Pipeline summary */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'Total Pipeline', value: '$178K', icon: 'analytics' },
                            { label: 'Avg Deal Size', value: '$35.6K', icon: 'monetization_on' },
                            { label: 'Close Rate', value: '34%', icon: 'percent' },
                            { label: 'Avg Sales Cycle', value: '28 days', icon: 'schedule' },
                        ].map((s) => (
                            <div key={s.label} className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
                                <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>{s.icon}</span>
                                <p className="text-xl font-bold text-text-primary dark:text-white mt-2">{s.value}</p>
                                <p className="text-xs text-text-secondary dark:text-slate-400">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Pipeline funnel visual */}
                    <div className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                        <h3 className="font-bold text-text-primary dark:text-white mb-4">Pipeline Stages</h3>
                        <div className="flex items-end gap-3 h-20">
                            {stages.map((s, i) => {
                                const heights = [100, 80, 65, 50, 35, 20];
                                return (
                                    <div key={s} className="flex-1 flex flex-col items-center gap-2">
                                        <div className={`w-full rounded-t transition-all bg-primary/90 hover:bg-primary`} style={{ height: `${heights[i]}%`, opacity: 0.4 + (i / stages.length) * 0.6 }} />
                                        <p className="text-[9px] text-center text-text-secondary dark:text-slate-400 font-medium leading-tight">{s}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Leads table */}
                    <div className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="font-bold text-text-primary dark:text-white">Active Leads</h3>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[16px]">search</span>
                                    <input className="pl-8 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-text-primary dark:text-white focus:ring-2 focus:ring-primary outline-none" placeholder="Filter leads..." />
                                </div>
                            </div>
                        </div>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-slate-800 text-text-secondary dark:text-slate-400 text-left">
                                    <th className="px-6 py-3 font-semibold">Company / Contact</th>
                                    <th className="px-6 py-3 font-semibold">Value</th>
                                    <th className="px-6 py-3 font-semibold">Stage</th>
                                    <th className="px-6 py-3 font-semibold">Probability</th>
                                    <th className="px-6 py-3 font-semibold">Tags</th>
                                    <th className="px-6 py-3 font-semibold">Last Activity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.map((lead) => (
                                    <tr key={lead.name} className="border-b border-slate-50 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group cursor-pointer">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-text-primary dark:text-white">{lead.name}</p>
                                            <p className="text-xs text-text-secondary dark:text-slate-400">{lead.contact} · {lead.role}</p>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-text-primary dark:text-white">{lead.value}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-text-secondary dark:text-slate-300 font-medium">{lead.stage}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${lead.probability >= 70 ? 'bg-emerald-500' : lead.probability >= 40 ? 'bg-amber-400' : 'bg-slate-400'}`} style={{ width: `${lead.probability}%` }} />
                                                </div>
                                                <span className="text-xs font-bold text-text-primary dark:text-white">{lead.probability}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {lead.tags.map((t) => (
                                                    <span key={t} className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary">{t}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-text-secondary dark:text-slate-400">{lead.lastActivity}</td>
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
