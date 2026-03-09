'use client';
import { useEffect, useState } from 'react';
import { getLeads, Lead } from '@/lib/api';

export default function SignalsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getLeads({ limit: 20 })
            .then((d) => setLeads(d.results))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    // Only show high-scoring leads as signals
    const signals = leads.filter((l) => l.score > 0 || leads.length > 0);

    const intentLabel = (score: number) =>
        score >= 70 ? { label: 'High Intent', cls: 'bg-red-50 text-red-700 ring-1 ring-red-600/10 dark:bg-red-400/10 dark:text-red-400', bar: 'bg-red-500' }
            : score >= 40 ? { label: 'Growth Signal', cls: 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400', bar: 'bg-amber-400' }
                : { label: 'Low Intent', cls: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400', bar: 'bg-slate-400' };

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <header className="sticky top-0 z-20 flex flex-col gap-4 border-b border-slate-200 bg-white/80 px-6 py-5 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Buying Signals</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Real-time intent data based on lead scores.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="inline-flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>tune</span> Configure
                        </button>
                        <button onClick={() => { setLoading(true); getLeads({ limit: 20 }).then(d => setLeads(d.results)).finally(() => setLoading(false)); }} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 transition-all">
                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>refresh</span> Refresh Feed
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-background-dark p-6">
                <div className="mx-auto max-w-4xl space-y-6">
                    {loading ? (
                        [...Array(3)].map((_, i) => (
                            <div key={i} className="animate-pulse rounded-xl border border-slate-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-800/50">
                                <div className="flex gap-4">
                                    <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700" />
                                    <div className="flex-1 space-y-3">
                                        <div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-700" />
                                        <div className="h-3 w-1/4 rounded bg-slate-200 dark:bg-slate-700" />
                                    </div>
                                </div>
                                <div className="mt-4 h-24 rounded-lg bg-slate-100 dark:bg-slate-700/50" />
                            </div>
                        ))
                    ) : signals.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-slate-400 dark:text-slate-500">
                            <span className="material-symbols-outlined text-5xl text-slate-200 dark:text-slate-700 mb-3">bolt</span>
                            <p className="text-sm font-medium">No signals yet. Add leads with scores to see intent signals here.</p>
                        </div>
                    ) : signals.map((lead) => {
                        const intent = intentLabel(lead.score);
                        return (
                            <div key={lead.id} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:border-primary/50 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
                                <div className={`absolute top-0 left-0 h-full w-1 ${intent.bar}`} />
                                <div className="p-5">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                        <div className="flex gap-4">
                                            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                                                {lead.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-slate-900 dark:text-white">{lead.name}</h3>
                                                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${intent.cls}`}>{intent.label}</span>
                                                </div>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">{lead.job_title ?? 'Contact'} at <span className="font-medium text-slate-700 dark:text-slate-300">{lead.company}</span></p>
                                                <div className="mt-2 flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary text-[18px]">person</span>
                                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Score: {lead.score}/100 · Status: {lead.status}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                                            <span className="text-xs text-slate-400">{new Date(lead.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 rounded-lg p-4 border bg-primary/5 border-primary/10 dark:bg-primary/10 dark:border-primary/20">
                                        <div className="flex gap-3">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                                                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>auto_awesome</span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">AI Recommendation</p>
                                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                                    {lead.score >= 70
                                                        ? `${lead.name} at ${lead.company} has a high intent score. Consider reaching out with a personalised email referencing their industry (${lead.industry ?? 'their sector'}).`
                                                        : lead.score >= 40
                                                            ? `${lead.name} shows moderate interest. A follow-up this week would be timely.`
                                                            : `${lead.name} may need nurturing before outreach. Consider a content-first sequence.`}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-blue-600 transition-colors">
                                                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>mail</span>
                                                Generate AI Email
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
