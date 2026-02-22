// SDR Dashboard - Dark Edition (now respects OS/user theme)
import MetricCard from '@/components/ui/MetricCard';
import PageHeader from '@/components/ui/PageHeader';

const kpis = [
    { label: 'Emails Sent', value: '45', trend: '45%', sparkHeights: [40, 55, 45, 60, 75, 45] },
    { label: 'Open Rate', value: '68%', trend: '↑ 2.4%', sparkHeights: [50, 65, 55, 70, 62, 68] },
    { label: 'Reply Rate', value: '12%', trend: '↓ 0.5%', sparkHeights: [15, 12, 18, 10, 14, 12] },
    { label: 'Meetings', value: '2', trend: '+1 today', sparkHeights: [1, 0, 2, 1, 2, 2] },
];

const chartBars = [
    { day: 'Mon', h: 40 }, { day: 'Tue', h: 65 }, { day: 'Wed', h: 85 },
    { day: 'Thu', h: 100 }, { day: 'Fri', h: 75 }, { day: 'Sat', h: 20 }, { day: 'Sun', h: 10 }
];

const todayTasks = [
    { name: 'Sarah Jenkins', role: 'VP Sales @ Acme Corp', task: 'Reply to objection: "Not interested right now"', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmcKMS0Oz6CHbKfTTaWs9VJAjYu1RrqVTs9-YELMqEVYOuFrUSzsdCotFYDI2bkeNfmzwmj8NX8CSekHlbz54gJkytge0QUK6yXu5-Qnh6VgrEE5BVjAGoh5nQaQCZV3KASmkD8do0FDz3ooVOQKdEyI6SeLE-I_8YEfgdkVdY6RruEww4YleaBM64T0fMmBiup1YphN_bwJn8DQ6XqDyFS7wBfbvJATUuJ7F5puxG2skyUG7Obk6CwyNTHxndlaX8_W3D38Anro4' },
    { name: 'David Miller', role: 'CTO @ TechFlow', task: 'Step 3: LinkedIn Connection Request', avatar: null, initials: 'DM' },
    { name: 'Jenny Lee', role: 'Head of Ops @ Scalar', task: 'Call: Follow up on demo request', avatar: null, initials: 'JL' },
];

const aiInsights = [
    { type: 'Hot Signal', time: '2m ago', title: 'Acme Corp just raised Series B', desc: 'High intent signal. Suggest mentioning "scaling operations" in outreach.', relevance: 98, color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' },
    { type: 'Timing', time: 'Now', title: 'John Doe is active on LinkedIn', desc: 'User posted 5 mins ago. Perfect time for a soft touch comment or connection.', relevance: null, color: 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400' },
    { type: 'Analysis', time: '1h ago', title: 'Sequence Optimization', desc: '"CTO Outreach V2" has a 15% lower open rate on Fridays. Consider pausing until Monday.', relevance: null, color: 'bg-blue-50 text-blue-700 dark:bg-primary/10 dark:text-primary' },
];

const upcoming = [
    { time: '14:00', title: 'Discovery Call: TechFlow', sub: 'with David Miller', color: 'bg-primary' },
    { time: '15:30', title: 'Team Sync', sub: 'Weekly Pipeline Review', color: 'bg-purple-500' },
];

export default function DashboardDarkPage() {
    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <PageHeader
                title="Good morning, Alex 👋"
                subtitle="You have 12 high-priority leads to action today."
                actions={
                    <div className="flex gap-3">
                        <button className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full" />
                        </button>
                    </div>
                }
            />

            <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
                <div className="max-w-7xl mx-auto flex gap-8">
                    {/* Main content */}
                    <div className="flex-1 flex flex-col gap-8">
                        {/* KPIs */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {kpis.map((k) => (
                                <MetricCard key={k.label} {...k} />
                            ))}
                        </div>

                        {/* Activity Chart */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Activity Volume</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Calls and emails over the last 7 days</p>
                                </div>
                                <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                                    <button className="px-3 py-1 text-xs font-medium text-slate-900 dark:text-white bg-white dark:bg-slate-700 rounded shadow-sm">Week</button>
                                    <button className="px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Month</button>
                                </div>
                            </div>
                            <div className="h-48 flex items-end gap-3">
                                {chartBars.map((b) => (
                                    <div key={b.day} className="flex-1 flex flex-col items-center gap-2">
                                        <div className="w-full bg-primary/20 dark:bg-primary/20 hover:bg-primary/40 transition-all rounded-t" style={{ height: `${b.h}%` }} />
                                        <span className="text-xs text-slate-500 dark:text-slate-500 uppercase">{b.day}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tasks */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                            <div className="flex items-center gap-6 border-b border-slate-200 dark:border-slate-800 px-6">
                                <button className="py-4 text-sm font-bold text-primary border-b-2 border-primary">To-Do List (12)</button>
                                <button className="py-4 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Calls (5)</button>
                                <button className="py-4 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Follow-ups (8)</button>
                            </div>
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                {todayTasks.map((t) => (
                                    <div key={t.name} className="group flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden">
                                                {t.avatar ? <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" /> : <span className="text-sm">{(t as any).initials}</span>}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</h4>
                                                    <span className="text-xs text-slate-400">• {t.role}</span>
                                                </div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.task}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-primary hover:text-white border border-slate-200 dark:border-slate-700 transition-colors">
                                                <span className="material-symbols-outlined text-[18px]">call</span>
                                            </button>
                                            <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-primary hover:text-white border border-slate-200 dark:border-slate-700 transition-colors">
                                                <span className="material-symbols-outlined text-[18px]">mail</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right column */}
                    <aside className="w-80 flex-shrink-0 flex flex-col gap-6">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-purple-500">auto_awesome</span>
                                <h3 className="text-base font-bold text-slate-900 dark:text-white">AI Insights</h3>
                            </div>
                            <div className="flex flex-col gap-3">
                                {aiInsights.map((ins) => (
                                    <div key={ins.title} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary/40 transition-colors cursor-pointer">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${ins.color}`}>{ins.type}</div>
                                            <span className="text-xs text-slate-400">{ins.time}</span>
                                        </div>
                                        <p className="text-sm text-slate-900 dark:text-white font-medium mb-1">{ins.title}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{ins.desc}</p>
                                        {ins.relevance && (
                                            <>
                                                <div className="mt-3 w-full bg-emerald-100 dark:bg-emerald-500/20 h-1 rounded-full overflow-hidden">
                                                    <div className="bg-emerald-500 h-full" style={{ width: `${ins.relevance}%` }} />
                                                </div>
                                                <p className="text-[10px] text-right mt-1 text-emerald-600 dark:text-emerald-400 font-bold">{ins.relevance}% Relevance</p>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
                            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-4 uppercase tracking-wider">Upcoming</h3>
                            <div className="flex flex-col gap-4">
                                {upcoming.map((u) => (
                                    <div key={u.time} className="flex gap-3 items-start">
                                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 min-w-[3rem]">{u.time}</span>
                                        <div className={`w-1 rounded-full ${u.color} self-stretch`} />
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{u.title}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{u.sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
