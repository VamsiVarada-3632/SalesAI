'use client';

import { useEffect, useState } from 'react';
import MetricCard from '@/components/ui/MetricCard';
import PageHeader from '@/components/ui/PageHeader';
import { getDashboardSummary, DashboardSummary } from '@/lib/api';

export default function DashboardPage() {
    const [data, setData] = useState<DashboardSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getDashboardSummary()
            .then(setData)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    const metrics = data?.metrics.map((m) => ({
        label: m.label,
        value: m.value,
        trend: m.trend || '—',
        sparkHeights: [40, 55, 45, 65, 50, 75],
    })) ?? [];

    const tasks = data?.tasks ?? [];

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <PageHeader
                title="Good morning ☀️"
                subtitle="Here is your daily overview"
                actions={
                    <>
                        <button className="flex items-center gap-2 h-10 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold text-text-primary dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>calendar_today</span>
                            Schedule
                        </button>
                        <button className="flex items-center gap-2 h-10 px-5 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-md transition-all hover:-translate-y-0.5">
                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>add</span>
                            New Campaign
                        </button>
                    </>
                }
            />

            <div className="flex-1 overflow-y-auto no-scrollbar p-8">
                <div className="flex flex-col gap-8 max-w-[1400px] mx-auto">
                    {/* Metrics */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 p-5 h-28 animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {metrics.map((m) => (
                                <MetricCard key={m.label} {...m} />
                            ))}
                        </div>
                    )}

                    {/* Main columns */}
                    <div className="flex flex-col lg:flex-row gap-6 min-h-[500px]">
                        {/* Tasks */}
                        <div className="lg:w-3/5 flex flex-col bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-bold text-text-primary dark:text-white">Top Priority Tasks</h3>
                                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold px-2 py-0.5 rounded-full">{tasks.length}</span>
                                </div>
                                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg gap-1">
                                    {['All Tasks', 'Calls', 'Emails', 'LinkedIn'].map((t, i) => (
                                        <button key={t} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${i === 0 ? 'bg-white dark:bg-slate-700 shadow-sm font-bold text-text-primary dark:text-white' : 'text-text-secondary dark:text-slate-400 hover:text-text-primary dark:hover:text-white'}`}>{t}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                {loading ? (
                                    <div className="p-6 flex flex-col gap-3">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="h-14 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse" />
                                        ))}
                                    </div>
                                ) : tasks.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-48 text-text-secondary dark:text-slate-400">
                                        <span className="material-symbols-outlined text-4xl mb-2">check_circle</span>
                                        <p className="text-sm font-medium">No tasks yet — add some leads to get started</p>
                                    </div>
                                ) : (
                                    <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {tasks.map((task) => (
                                            <li key={task.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group flex items-center gap-4">
                                                <input type="checkbox" className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary dark:border-slate-600 dark:bg-slate-700" />
                                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                                                    <span className="text-xs font-bold text-primary">{task.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-sm font-bold text-text-primary dark:text-white truncate">{task.name}</p>
                                                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${task.score >= 60 ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                                                            Score {task.score}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-text-secondary dark:text-slate-400 truncate">{task.company} • {task.status}</p>
                                                </div>
                                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 transition-colors">
                                                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>call</span>
                                                    </button>
                                                    <button className="p-2 rounded-lg bg-blue-50 text-primary hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 transition-colors">
                                                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>mail</span>
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            {tasks.length > 0 && (
                                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800">
                                    <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-md transition-all hover:scale-[1.01]">
                                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>play_arrow</span>
                                        Start Task Queue ({tasks.length})
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Summary panel */}
                        <div className="lg:w-2/5 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">auto_awesome</span>
                                    <h3 className="text-lg font-bold text-text-primary dark:text-white">Overview</h3>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col gap-3">
                                {loading ? (
                                    <div className="h-40 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
                                ) : (
                                    <div className="bg-white dark:bg-surface-card p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                        <p className="text-sm text-text-secondary dark:text-slate-400 mb-4">
                                            {tasks.length > 0
                                                ? `You have ${tasks.length} high-priority lead${tasks.length > 1 ? 's' : ''} to follow up with today.`
                                                : 'No leads in the system yet. Add leads to see your daily priorities here.'}
                                        </p>
                                        {error && (
                                            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-medium">
                                                <span className="material-symbols-outlined text-[16px]">error</span>
                                                Could not connect to backend: {error}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
