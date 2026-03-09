'use client';

import { useEffect, useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import { getLeads, Lead, PaginatedLeads } from '@/lib/api';

const stages = ['Prospecting', 'Qualification', 'Discovery', 'Proposal', 'Negotiation', 'Closed Won'];

export default function LeadsPage() {
    const [data, setData] = useState<PaginatedLeads | null>(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setLoading(true);
        getLeads({ search: search || undefined, limit: 50 })
            .then(setData)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [search]);

    const leads = data?.results ?? [];

    const stageColor = (probability: number) =>
        probability >= 70 ? 'bg-emerald-500' : probability >= 40 ? 'bg-amber-400' : 'bg-slate-400';

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
                    {/* Pipeline stats (computed from real data) */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'Total Leads', value: String(data?.total ?? '—'), icon: 'analytics' },
                            { label: 'Avg Score', value: leads.length ? `${Math.round(leads.reduce((s, l) => s + l.score, 0) / leads.length)}` : '—', icon: 'monetization_on' },
                            { label: 'New Leads', value: String(leads.filter(l => l.status === 'New').length), icon: 'person_add' },
                            { label: 'Contacted', value: String(leads.filter(l => l.status === 'Contacted').length), icon: 'schedule' },
                        ].map((s) => (
                            <div key={s.label} className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
                                <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>{s.icon}</span>
                                <p className="text-xl font-bold text-text-primary dark:text-white mt-2">{loading ? '—' : s.value}</p>
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
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[16px]">search</span>
                                <input
                                    className="pl-8 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-text-primary dark:text-white focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="Filter leads..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-slate-800 text-text-secondary dark:text-slate-400 text-left">
                                    <th className="px-6 py-3 font-semibold">Company / Contact</th>
                                    <th className="px-6 py-3 font-semibold">Industry</th>
                                    <th className="px-6 py-3 font-semibold">Status</th>
                                    <th className="px-6 py-3 font-semibold">Score</th>
                                    <th className="px-6 py-3 font-semibold">Last Updated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    [...Array(5)].map((_, i) => (
                                        <tr key={i}>
                                            <td colSpan={5} className="px-6 py-4">
                                                <div className="h-6 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
                                            </td>
                                        </tr>
                                    ))
                                ) : leads.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-16 text-center">
                                            <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600">inbox</span>
                                            <p className="mt-2 text-sm font-medium text-text-secondary dark:text-slate-400">No leads yet. Add your first lead to get started.</p>
                                        </td>
                                    </tr>
                                ) : leads.map((lead) => (
                                    <tr key={lead.id} className="border-b border-slate-50 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-text-primary dark:text-white">{lead.company}</p>
                                            <p className="text-xs text-text-secondary dark:text-slate-400">{lead.name} · {lead.job_title ?? lead.email}</p>
                                        </td>
                                        <td className="px-6 py-4 text-text-secondary dark:text-slate-400 text-xs">{lead.industry ?? '—'}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-text-secondary dark:text-slate-300 font-medium">{lead.status}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${stageColor(lead.score)}`} style={{ width: `${lead.score}%` }} />
                                                </div>
                                                <span className="text-xs font-bold text-text-primary dark:text-white">{lead.score}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-text-secondary dark:text-slate-400">
                                            {new Date(lead.created_at).toLocaleDateString()}
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
