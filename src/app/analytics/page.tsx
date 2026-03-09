'use client';

import { useEffect, useState } from 'react';
import { getAnalyticsSummary, AnalyticsSummary } from '@/lib/api';

export default function AnalyticsPage() {
    const [data, setData] = useState<AnalyticsSummary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAnalyticsSummary()
            .then(setData)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const kpis = [
        { label: 'Total Leads', value: loading ? '—' : String(data?.total_leads ?? 0) },
        { label: 'Total Meetings', value: loading ? '—' : String(data?.total_meetings ?? 0) },
        { label: 'Active Campaigns', value: loading ? '—' : String(data?.total_campaigns ?? 0) },
        { label: 'Team Members', value: loading ? '—' : String(data?.reps.length ?? 0) },
    ];

    const reps = data?.reps ?? [];

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <header className="flex-shrink-0 px-8 py-5 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Sales Analytics</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Live performance overview</p>
                    </div>
                    <div className="flex gap-3">
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
                        {kpis.map((m) => (
                            <div key={m.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-primary/40 transition-colors shadow-sm">
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">{m.label}</p>
                                {loading ? (
                                    <div className="h-9 w-20 rounded bg-slate-100 dark:bg-slate-800 animate-pulse mt-2" />
                                ) : (
                                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white my-2">{m.value}</h3>
                                )}
                            </div>
                        ))}
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
                                    <th className="px-6 py-3 font-semibold">Email</th>
                                    <th className="px-6 py-3 font-semibold">Meetings Booked</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    [...Array(3)].map((_, i) => (
                                        <tr key={i}>
                                            <td colSpan={3} className="px-6 py-4">
                                                <div className="h-6 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
                                            </td>
                                        </tr>
                                    ))
                                ) : reps.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-16 text-center">
                                            <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600">bar_chart</span>
                                            <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">No team members yet. Add users to see performance data.</p>
                                        </td>
                                    </tr>
                                ) : reps.map((r, i) => (
                                    <tr key={r.email} className="border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                                    {r.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="text-slate-900 dark:text-white font-medium">{r.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs">{r.email}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden max-w-[80px]">
                                                    <div className="bg-primary h-full rounded-full" style={{ width: `${Math.min((r.meetings / (Math.max(...reps.map(x => x.meetings)) || 1)) * 100, 100)}%` }} />
                                                </div>
                                                <span className="text-slate-600 dark:text-slate-300 text-xs font-medium">{r.meetings}</span>
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
