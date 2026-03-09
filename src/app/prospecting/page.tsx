'use client';
import { useEffect, useState } from 'react';
import { getLeads, Lead } from '@/lib/api';

export default function ProspectingPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const load = () => {
        setLoading(true);
        getLeads({ search: search || undefined, limit: 25 })
            .then((d) => setLeads(d.results))
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(load, [search]);

    const scoreColor = (s: number) =>
        s >= 80 ? 'text-emerald-600 dark:text-emerald-400' : s >= 60 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400';

    const scoreBadge = (s: number) =>
        s >= 80 ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400' : s >= 60 ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400';

    return (
        <div className="flex-1 flex h-full overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 px-6 py-5 flex items-center justify-between sticky top-0 z-10">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI Prospecting Engine</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">{loading ? 'Loading...' : `${leads.length} opportunities in your pipeline`}</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[18px]">search</span>
                            <input
                                className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                                placeholder="Search by name or company..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <button onClick={load} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors shadow-md">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>refresh</span> Refresh
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-slate-950">
                    <div className="max-w-5xl mx-auto flex flex-col gap-4">
                        {loading ? (
                            [...Array(4)].map((_, i) => (
                                <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 h-28 animate-pulse" />
                            ))
                        ) : leads.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 text-slate-400 dark:text-slate-500">
                                <span className="material-symbols-outlined text-5xl text-slate-200 dark:text-slate-700 mb-3">manage_search</span>
                                <p className="text-sm font-medium">No prospects found. Add leads via the API or adjust your search.</p>
                            </div>
                        ) : leads.map((lead) => (
                            <div key={lead.id} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/40 rounded-xl p-5 transition-all hover:shadow-md shadow-sm">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Company Info */}
                                    <div className="flex flex-col gap-3 md:w-52">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                {lead.company[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="text-slate-900 dark:text-white font-bold leading-tight">{lead.company}</h3>
                                                <div className={`text-xs font-bold mt-0.5 ${scoreColor(lead.score)}`}>{lead.score}/100</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 flex-wrap">
                                            {lead.industry && <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded">{lead.industry}</span>}
                                            {lead.company_size && <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded">{lead.company_size}+ Emp</span>}
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${scoreBadge(lead.score)}`}>{lead.score >= 80 ? 'Hot' : lead.score >= 60 ? 'Warm' : 'Cold'}</span>
                                        </div>
                                    </div>

                                    {/* Signal */}
                                    <div className="flex-1 flex flex-col justify-center border-l border-slate-100 dark:border-slate-800 pl-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400" style={{ fontSize: 20 }}>trending_up</span>
                                            <span className="text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wide">Intent Signal</span>
                                        </div>
                                        <p className="text-slate-800 dark:text-slate-200 text-sm font-medium">Status: {lead.status} · Score: {lead.score}/100</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                                            <span className="text-slate-600 dark:text-slate-300 font-medium">Decision Maker:</span> {lead.name}{lead.job_title ? `, ${lead.job_title}` : ''}
                                        </p>
                                        {lead.location && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{lead.location}</p>}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-2 md:w-44 justify-center">
                                        <button className="flex items-center justify-center gap-2 w-full h-10 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-lg transition-colors shadow-sm">
                                            <span className="material-symbols-outlined text-[18px]">auto_awesome</span> Generate Email
                                        </button>
                                        <button className="flex items-center justify-center w-full h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-sm font-medium rounded-lg transition-colors">
                                            Add to Sequence
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
