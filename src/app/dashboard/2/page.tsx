import MetricCard from '@/components/ui/MetricCard';
import PageHeader from '@/components/ui/PageHeader';

const metrics = [
    { label: 'Emails Sent', value: '1,240', trend: '12%', sparkHeights: [40, 60, 45, 70, 55, 85] },
    { label: 'Open Rate', value: '42%', trend: '5%', sparkHeights: [30, 40, 50, 60, 45, 65] },
    { label: 'Replies', value: '85', trend: '8%', sparkHeights: [20, 35, 60, 50, 80, 70] },
    { label: 'Meetings Booked', value: '12', trend: '2%', sparkHeights: [40, 30, 50, 70, 90, 100] },
    { label: 'Lead Score Avg', value: '78', trend: '4.5%', sparkHeights: [50, 60, 55, 70, 65, 78] },
];

const tasks = [
    { name: 'Sarah Jenkins', role: 'CTO at TechFlow', note: 'Last activity: 2d ago', badge: 'Priority', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDddHGjL1D2Xa24ru5hKt7M1m0d0D2Ew5n1Ph3HBjoFPUx1YqrR6IK3NoTfm5mqeFquzD7UeYtwetbzhDcWfRm1JLZEfdzhS3t3Rg5zgPCl4NDAiL4lg3al7S0hoc4vkLEe1LCTUqEn1jol09Oj300hI07qF4p9aH9t_7oRmidju0NQO5qzlrmsXythqKJ3HBq2R49Fs1Q4gxqiSRR4AQHIsqMg-4hO289zeupI_KiWBJWMcpUIFPVIRxgKp5BJXT4OvBcFV9nuD0I' },
    { name: 'Mike Ross', role: 'VP Sales at Pearson', note: 'Opened email 2h ago', badge: null, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHlFraENG47EfXX0NAS_0jv6sBjUUXdMThQqgXJ09oTCgQfeLb1ur95jIej-C3AkLb13afgynVOGe9askKW2Y6uxC2SiL-hBCV50AxTT848aiVF4gnW2qZ8AcHiKquWZip1Rn_cAai439n12trWa4CVAbfwp_WHfLhA_9EHEcdgBA8a7UyIpcrH_PQ0fBhUpQlOa3eJzA2MaQZdBDJKnlyFIGXtHIlYlJKikpiu27l97U5gggzEGGGj-d16W9sfb0TZG1p2sppuCE' },
    { name: 'Jessica Pearson', role: 'Managing Partner at PSL', note: 'Follow up required', badge: null, avatar: null, initials: 'JP' },
    { name: 'Harvey Specter', role: 'Senior Partner at PSL', note: 'No activity', badge: 'Cold', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcus6rmTnSkDCOVxDNlrI3wViY1NIPfqtg_GpVBUDsAlVFRicd-rx0QZrxKTQxBjZ7mAy-UY8yFQyr7B4JJFim1V0U_AMqIyg1FY1mM3PqTqCWUT2mUOFREWohBl2b6ScD20TdxOPCdPLBqX203X-WaAlWDfuQ3K7HR-2p_ecSYofmgNDA7DGXjQ8hj5sO92fw3UcQsIuaI8eKnZySfzPstaNdJU-o0leffDoDlSNdGP0vqeMTfyCJ2wrCsNvljZGY0JeIEDOqfdI' },
    { name: 'Donna Paulsen', role: 'COO at PSL', note: 'Opened 3 emails', badge: null, avatar: null, initials: 'DL' },
];

const insights = [
    { company: 'Acme Corp', industry: 'Retail • 500-1k Employees', match: '94%', badge: 'High Intent', badgeColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300', text: 'Just raised <strong>Series B</strong> funding ($25M). They are likely scaling their sales team and need new tools.', icon: 'business' },
    { company: 'Globex Inc.', industry: 'SaaS • 50-200 Employees', match: '88%', badge: 'Buying Signal', badgeColor: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300', text: '<strong>3 people</strong> from Globex viewed your pricing page in the last 24 hours.', icon: 'language' },
    { company: 'David Kim', industry: 'Now VP of Marketing at Hooli', match: '92%', badge: 'Job Change', badgeColor: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300', text: 'Previous champion moved to a new company. Good time to reach out.', icon: 'person' },
];

export default function Dashboard2Page() {
    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <PageHeader
                title="Good morning, Alex ☀️"
                subtitle="Here is your daily overview for Oct 24, 2023"
                actions={
                    <>
                        <button className="flex items-center gap-2 h-11 px-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>calendar_today</span>
                            Schedule
                        </button>
                        <button className="flex items-center gap-2 h-11 px-6 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-lg transition-all hover:-translate-y-0.5">
                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>add</span>
                            New Campaign
                        </button>
                    </>
                }
            />
            <div className="flex-1 overflow-y-auto no-scrollbar p-8">
                <div className="flex flex-col gap-8 max-w-[1600px] mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                        {metrics.map((m) => (
                            <MetricCard key={m.label} {...m} />
                        ))}
                    </div>
                    <div className="flex flex-col lg:flex-row gap-8 min-h-[500px]">
                        <div className="lg:w-3/5 flex flex-col bg-white dark:bg-surface-card rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-lg font-bold text-text-primary dark:text-white">Tasks for Today</h3>
                                    <span className="bg-primary/10 text-primary text-xs font-extrabold px-2.5 py-1 rounded-full">24 PENDING</span>
                                </div>
                                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg gap-1">
                                    {['All Tasks', 'Calls', 'Emails', 'LinkedIn'].map((t, i) => (
                                        <button key={t} className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${i === 0 ? 'bg-white dark:bg-slate-700 shadow-sm font-bold text-text-primary dark:text-white' : 'text-text-secondary dark:text-slate-400 hover:text-text-primary dark:hover:text-white'}`}>{t}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {tasks.map((task) => (
                                        <li key={task.name} className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group flex items-center gap-5">
                                            <input type="checkbox" className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary dark:border-slate-600 dark:bg-slate-700 cursor-pointer" />
                                            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700 ring-2 ring-white dark:ring-slate-900 shadow-sm">
                                                {task.avatar ? <img src={task.avatar} alt={task.name} className="h-full w-full object-cover" /> : <span className="text-sm font-extrabold text-indigo-500">{(task as any).initials}</span>}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <p className="text-sm font-bold text-text-primary dark:text-white truncate">{task.name}</p>
                                                    {task.badge && <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${task.badge === 'Priority' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300' : 'bg-amber-50 text-amber-700 border border-amber-100 dark:bg-amber-900/30 dark:text-amber-400'}`}>{task.badge}</span>}
                                                </div>
                                                <p className="text-xs text-text-secondary dark:text-slate-400 truncate font-medium">{task.role} • {task.note}</p>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-green-600 dark:bg-slate-800 dark:border-slate-700 transition-all shadow-sm"><span className="material-symbols-outlined text-[20px]">call</span></button>
                                                <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-primary dark:bg-slate-800 dark:border-slate-700 transition-all shadow-sm"><span className="material-symbols-outlined text-[20px]">mail</span></button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800">
                                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-lg transition-all hover:scale-[1.01]">
                                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>play_arrow</span>
                                    Start Task Queue (24)
                                </button>
                            </div>
                        </div>
                        <div className="lg:w-2/5 flex flex-col">
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-2">
                                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-1.5 rounded-lg">
                                        <span className="material-symbols-outlined text-primary text-[20px]">auto_awesome</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-text-primary dark:text-white">AI Insights</h3>
                                </div>
                                <span className="text-xs font-semibold text-primary cursor-pointer hover:underline">View All</span>
                            </div>
                            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4">
                                {insights.map((ins) => (
                                    <div key={ins.company} className="bg-white dark:bg-surface-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all group hover:border-primary/30">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700 text-slate-400"><span className="material-symbols-outlined text-[24px]">{ins.icon}</span></div>
                                                <div><h4 className="text-sm font-bold text-text-primary dark:text-white">{ins.company}</h4><p className="text-xs text-text-secondary dark:text-slate-400 mt-0.5">{ins.industry}</p></div>
                                            </div>
                                            <div className="text-xs font-extrabold text-primary bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-md">{ins.match} Match</div>
                                        </div>
                                        <div className="mb-5 pl-1">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide mb-2.5 border ${ins.badgeColor}`}>{ins.badge}</span>
                                            <p className="text-sm text-text-primary dark:text-slate-200 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: ins.text }} />
                                        </div>
                                        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all text-xs font-bold">
                                            <span className="material-symbols-outlined text-[16px]">edit_note</span>
                                            Draft Email
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
