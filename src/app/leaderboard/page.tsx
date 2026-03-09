'use client';

import { useEffect, useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import { getUsers, User, getAnalyticsSummary, AnalyticsSummary } from '@/lib/api';

export default function LeaderboardPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([getUsers(), getAnalyticsSummary()])
            .then(([u, a]) => { setUsers(u); setAnalytics(a); })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    // Build leaderboard: merge users with their meeting count from analytics reps
    const leaders = users.map((u) => {
        const rep = analytics?.reps.find((r) => r.email === u.email);
        return { ...u, meetings: rep?.meetings ?? 0 };
    }).sort((a, b) => b.meetings - a.meetings);

    const teamMetrics = [
        { label: 'Team Members', value: loading ? '—' : String(users.length) },
        { label: 'Total Meetings', value: loading ? '—' : String(analytics?.total_meetings ?? 0) },
        { label: 'Total Leads', value: loading ? '—' : String(analytics?.total_leads ?? 0) },
        { label: 'Active Campaigns', value: loading ? '—' : String(analytics?.total_campaigns ?? 0) },
    ];

    const podium = leaders.slice(0, 3);

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <PageHeader
                title="Sales Team Leaderboard"
                subtitle="Current performance overview"
                actions={
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>download</span> Export Report
                    </button>
                }
            />

            <div className="flex-1 overflow-y-auto no-scrollbar p-8">
                <div className="max-w-5xl mx-auto flex flex-col gap-8">
                    {/* Team metrics */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {teamMetrics.map((m) => (
                            <div key={m.label} className="bg-white dark:bg-surface-card rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <p className="text-text-secondary dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">{m.label}</p>
                                {loading ? (
                                    <div className="h-8 w-16 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
                                ) : (
                                    <h3 className="text-2xl font-bold text-text-primary dark:text-white">{m.value}</h3>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Podium — only shown when there are users */}
                    {!loading && podium.length >= 1 && (
                        <div className="grid grid-cols-3 gap-4">
                            {[podium[1], podium[0], podium[2]].filter(Boolean).map((l, i) => (
                                <div key={l.id} className={`bg-white dark:bg-surface-card border rounded-xl p-6 text-center relative ${i === 1 ? 'border-primary/40 shadow-lg shadow-primary/10 -mt-4' : 'border-slate-200 dark:border-slate-800'}`}>
                                    {i === 1 && <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl">👑</div>}
                                    <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 text-xl font-bold text-primary">
                                        {l.name.charAt(0).toUpperCase()}
                                    </div>
                                    <p className="font-bold text-text-primary dark:text-white">{l.name}</p>
                                    <p className="text-xs text-text-secondary dark:text-slate-400 mb-3">{l.role}</p>
                                    <div className={`text-3xl font-extrabold mb-1 ${['text-slate-400', 'text-yellow-500', 'text-amber-700'][i]}`}>
                                        #{[2, 1, 3][i]}
                                    </div>
                                    <p className="text-sm font-bold text-primary">{l.meetings} meetings</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Full table */}
                    <div className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                            <h3 className="font-bold text-text-primary dark:text-white">Full Rankings</h3>
                        </div>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-slate-800 text-text-secondary dark:text-slate-400 text-left">
                                    <th className="px-6 py-3 font-semibold">Rank</th>
                                    <th className="px-6 py-3 font-semibold">Rep</th>
                                    <th className="px-6 py-3 font-semibold">Role</th>
                                    <th className="px-6 py-3 font-semibold">Meetings</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    [...Array(3)].map((_, i) => (
                                        <tr key={i}>
                                            <td colSpan={4} className="px-6 py-4">
                                                <div className="h-6 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
                                            </td>
                                        </tr>
                                    ))
                                ) : leaders.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-16 text-center">
                                            <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600">emoji_events</span>
                                            <p className="mt-2 text-sm font-medium text-text-secondary dark:text-slate-400">No team members yet. Invite your team to see rankings.</p>
                                        </td>
                                    </tr>
                                ) : leaders.map((l, idx) => (
                                    <tr key={l.id} className="border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-text-primary dark:text-white">
                                            {idx < 3 ? ['🥇', '🥈', '🥉'][idx] : `#${idx + 1}`}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                                    {l.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-text-primary dark:text-white">{l.name}</p>
                                                    <p className="text-xs text-text-secondary dark:text-slate-400">{l.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-text-secondary dark:text-slate-400 text-xs capitalize">{l.role}</td>
                                        <td className="px-6 py-4 text-text-primary dark:text-slate-300 font-medium">{l.meetings}</td>
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
