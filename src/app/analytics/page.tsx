export default function AnalyticsPage() {
    const metrics = [
        { label: 'Total Revenue', value: '$2.4M', change: '+18.2%', up: true },
        { label: 'Win Rate', value: '34%', change: '+4.1%', up: true },
        { label: 'Avg Deal Size', value: '$12.6K', change: '-2.3%', up: false },
        { label: 'Pipeline Value', value: '$8.1M', change: '+22.7%', up: true },
    ];
    const reps = [
        { name: 'Jordan A.', deals: 12, revenue: '$156K', rate: '42%' },
        { name: 'Casey B.', deals: 10, revenue: '$134K', rate: '38%' },
        { name: 'Alex M.', deals: 9, revenue: '$118K', rate: '35%' },
        { name: 'Morgan C.', deals: 7, revenue: '$92K', rate: '28%' },
    ];

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <header className="flex-shrink-0 px-8 py-5 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Sales Analytics</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Performance overview — Q4 2023</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>calendar_today</span> This Quarter
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>download</span> Export
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
                <div className="max-w-7xl mx-auto flex flex-col gap-8">
                    {/* KPIs */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {metrics.map((m) => (
                            <div key={m.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-primary/40 transition-colors shadow-sm">
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">{m.label}</p>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white my-2">{m.value}</h3>
                                <span className={`text-xs font-bold flex items-center gap-0.5 ${m.up ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{m.up ? 'arrow_upward' : 'arrow_downward'}</span>
                                    {m.change} vs last quarter
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main chart */}
                        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Revenue Pipeline</h3>
                                <div className="flex gap-2">
                                    {['1M', '3M', '6M', '1Y'].map((t, i) => (
                                        <button key={t} className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${i === 1 ? 'bg-primary text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>{t}</button>
                                    ))}
                                </div>
                            </div>
                            {/* Bar chart simulation */}
                            <div className="h-48 flex items-end gap-3">
                                {[65, 80, 55, 90, 70, 95, 60, 85, 75, 100, 80, 88].map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                        <div className="w-full rounded-t bg-gradient-to-t from-primary to-primary-dark opacity-70 hover:opacity-100 transition-opacity" style={{ height: `${h}%` }} />
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-slate-400 dark:text-slate-500">
                                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => <span key={m}>{m}</span>)}
                            </div>
                        </div>
                        {/* Win/Loss Donut */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Win Rate Breakdown</h3>
                            <div className="flex items-center justify-center mb-6">
                                <div className="relative size-36">
                                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                                        <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#e2e8f0" className="dark:[stroke:#1e293b]" strokeWidth="3.5" />
                                        <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#0d59f2" strokeWidth="3.5" strokeDasharray="34 66" />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-2xl font-bold text-slate-900 dark:text-white">34%</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">Win Rate</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {[{ label: 'Closed Won', pct: 34, color: '#0d59f2' }, { label: 'Closed Lost', pct: 28, color: '#ef4444' }, { label: 'In Progress', pct: 38, color: '#94a3b8' }].map((s) => (
                                    <div key={s.label} className="flex items-center gap-3">
                                        <div className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                                        <span className="text-sm text-slate-600 dark:text-slate-300 flex-1">{s.label}</span>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">{s.pct}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Rep Performance Table */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Rep Performance</h3>
                        </div>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-left">
                                    <th className="px-6 py-3 font-semibold">Rep</th>
                                    <th className="px-6 py-3 font-semibold">Deals Closed</th>
                                    <th className="px-6 py-3 font-semibold">Revenue</th>
                                    <th className="px-6 py-3 font-semibold">Win Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reps.map((r) => (
                                    <tr key={r.name} className="border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">{r.name.charAt(0)}</div>
                                                <span className="text-slate-900 dark:text-white font-medium">{r.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{r.deals}</td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{r.revenue}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden max-w-[80px]">
                                                    <div className="bg-primary h-full rounded-full" style={{ width: r.rate }} />
                                                </div>
                                                <span className="text-slate-600 dark:text-slate-300 text-xs font-medium">{r.rate}</span>
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
