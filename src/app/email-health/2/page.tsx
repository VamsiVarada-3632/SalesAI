import PageHeader from '@/components/ui/PageHeader';

const providers = [
    { name: 'Gmail / Google Workspace', icon: '✉️', inbox: 94, spam: 3, missing: 3, change: '+2%' },
    { name: 'Microsoft 365 / Outlook', icon: '📧', inbox: 88, spam: 7, missing: 5, change: '-1%' },
    { name: 'Apple Mail', icon: '🍎', inbox: 96, spam: 2, missing: 2, change: '+1%' },
    { name: 'Yahoo Mail', icon: '🟣', inbox: 79, spam: 12, missing: 9, change: '-3%' },
];

const warmupDays = [
    { day: 'Mon', sent: 10, reached: 9 },
    { day: 'Tue', sent: 20, reached: 18 },
    { day: 'Wed', sent: 35, reached: 32 },
    { day: 'Thu', sent: 50, reached: 47 },
    { day: 'Fri', sent: 70, reached: 65 },
    { day: 'Sat', sent: 80, reached: 74 },
    { day: 'Sun', sent: 90, reached: 84 },
];

export default function EmailHealth2Page() {
    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <PageHeader
                title="Inbox Placement & Warm-up"
                subtitle="Track inbox vs. spam placement across email providers"
                actions={
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold text-text-primary dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>history</span> History
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>local_fire_department</span> Start Warmup
                        </button>
                    </div>
                }
            />

            <div className="flex-1 overflow-y-auto no-scrollbar p-8">
                <div className="max-w-5xl mx-auto flex flex-col gap-8">
                    {/* Warmup Chart */}
                    <div className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-text-primary dark:text-white">Warm-up Progress</h3>
                                <p className="text-sm text-text-secondary dark:text-slate-400">salesai.com — Day 7 of 30</p>
                            </div>
                            <span className="text-xs font-bold bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 px-3 py-1 rounded-full">IN PROGRESS</span>
                        </div>
                        <div className="h-40 flex items-end gap-3 mb-3">
                            {warmupDays.map((d) => (
                                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                                    <div className="w-full flex flex-col items-stretch gap-0.5">
                                        <div className="bg-primary rounded-t" style={{ height: `${d.reached * 1.3}px` }} />
                                        <div className="bg-red-300 rounded-b" style={{ height: `${(d.sent - d.reached) * 1.3}px` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-text-secondary dark:text-slate-500">
                            {warmupDays.map((d) => <span key={d.day}>{d.day}</span>)}
                        </div>
                        <div className="flex gap-4 mt-4 text-xs font-medium">
                            <span className="flex items-center gap-1"><span className="size-2.5 rounded-sm bg-primary inline-block" /> Inbox</span>
                            <span className="flex items-center gap-1"><span className="size-2.5 rounded-sm bg-red-300 inline-block" /> Spam</span>
                        </div>
                    </div>

                    {/* Provider breakdown */}
                    <div className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                            <h3 className="font-bold text-text-primary dark:text-white">Inbox Placement by Provider (Last 30 days)</h3>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {providers.map((p) => (
                                <div key={p.name} className="px-6 py-4 flex items-center gap-6 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                    <span className="text-2xl">{p.icon}</span>
                                    <div className="min-w-[200px]">
                                        <p className="font-semibold text-text-primary dark:text-white text-sm">{p.name}</p>
                                        <span className={`text-xs font-bold ${p.change.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>{p.change} vs last month</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden flex">
                                            <div className="bg-emerald-500 h-full rounded-l-full" style={{ width: `${p.inbox}%` }} />
                                            <div className="bg-red-400 h-full" style={{ width: `${p.spam}%` }} />
                                            <div className="bg-slate-300 dark:bg-slate-600 h-full rounded-r-full flex-1" />
                                        </div>
                                    </div>
                                    <div className="flex gap-4 text-sm shrink-0">
                                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">{p.inbox}% inbox</span>
                                        <span className="text-red-500 font-bold">{p.spam}% spam</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary">auto_awesome</span>
                            <h3 className="font-bold text-text-primary dark:text-white">AI Recommendations</h3>
                        </div>
                        <ul className="space-y-3">
                            {[
                                'Increase email volume gradually by 20% per day for optimal warm-up',
                                'Set up DMARC for outreach.salesai.com to improve Yahoo inbox placement',
                                'Pause sending from Yahoo on Fridays — 34% higher spam rate detected',
                            ].map((rec) => (
                                <li key={rec} className="flex items-start gap-3 text-sm text-text-primary dark:text-slate-200">
                                    <span className="material-symbols-outlined text-primary shrink-0 mt-0.5" style={{ fontSize: 18 }}>lightbulb</span>
                                    {rec}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
