'use client';
import { useEffect, useState } from 'react';
import { getLeads, Lead } from '@/lib/api';

export default function CallHubPage() {
    const [queue, setQueue] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        getLeads({ limit: 10 })
            .then((d) => setQueue(d.results.sort((a, b) => b.score - a.score)))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const active = queue[activeIdx];

    const statusBadge = (score: number) =>
        score >= 70 ? { label: 'Hot', cls: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' }
            : score >= 50 ? { label: 'Warm', cls: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' }
                : { label: 'Cold', cls: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400' };

    return (
        <div className="flex-1 flex h-full overflow-hidden bg-background-light dark:bg-background-dark">
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex-shrink-0 px-8 py-6 bg-surface-light dark:bg-surface-card border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-text-primary dark:text-white">Call Hub & Smart Dialer</h1>
                            <p className="text-sm text-text-secondary dark:text-slate-400 mt-1">AI-powered call assistance with real-time coaching</p>
                        </div>
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary-hover transition-colors shadow-md">
                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>play_arrow</span>
                            Start Queue ({queue.length})
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto no-scrollbar p-8">
                    {loading ? (
                        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="h-80 rounded-2xl bg-white dark:bg-surface-card border border-slate-200 dark:border-slate-800 animate-pulse" />
                            <div className="flex flex-col gap-4">
                                {[...Array(4)].map((_, i) => <div key={i} className="h-16 rounded-xl bg-white dark:bg-surface-card border border-slate-200 dark:border-slate-800 animate-pulse" />)}
                            </div>
                        </div>
                    ) : queue.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-500">
                            <span className="material-symbols-outlined text-5xl text-slate-200 dark:text-slate-700 mb-3">call_end</span>
                            <p className="text-sm font-medium">No leads in your call queue. Add leads to get started.</p>
                        </div>
                    ) : (
                        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Active Call Card */}
                            {active && (
                                <div className="bg-white dark:bg-surface-card rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                                    <div className="bg-gradient-to-br from-primary to-indigo-600 p-6 text-center text-white">
                                        <div className="size-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm text-2xl font-bold">
                                            {active.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                        </div>
                                        <h2 className="text-xl font-bold">{active.name}</h2>
                                        <p className="text-indigo-200 text-sm">{active.job_title ?? 'Contact'} at {active.company}</p>
                                        <div className="flex items-center justify-center gap-2 mt-2">
                                            <div className="size-2 bg-green-400 rounded-full animate-pulse" />
                                            <span className="text-sm font-medium">Ready to Call</span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-center gap-4 mb-6">
                                            <button className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                                <span className="size-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500"><span className="material-symbols-outlined text-[24px]">mic_off</span></span>
                                                <span className="text-[10px] text-slate-500">Mute</span>
                                            </button>
                                            <button className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-red-50 transition-colors">
                                                <span className="size-12 rounded-full bg-red-500 flex items-center justify-center text-white"><span className="material-symbols-outlined text-[24px]">call_end</span></span>
                                                <span className="text-[10px] text-slate-500">End Call</span>
                                            </button>
                                            <button className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                                <span className="size-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500"><span className="material-symbols-outlined text-[24px]">note_add</span></span>
                                                <span className="text-[10px] text-slate-500">Note</span>
                                            </button>
                                        </div>
                                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="material-symbols-outlined text-primary text-[18px]">auto_awesome</span>
                                                <span className="text-xs font-bold text-primary uppercase tracking-wider">AI Coaching</span>
                                            </div>
                                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                                {active.industry
                                                    ? `${active.name} works in ${active.industry}. Lead score is ${active.score}/100 — tailor your pitch accordingly.`
                                                    : `Focus on ${active.name}'s role at ${active.company}. Ask about current pain points and decision timeline.`}
                                            </p>
                                            <div className="mt-3 flex gap-2">
                                                <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">Use This Tip</button>
                                                <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Next Tip</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Call Queue */}
                            <div className="flex flex-col gap-4">
                                <h3 className="text-lg font-bold text-text-primary dark:text-white">Call Queue</h3>
                                {queue.map((lead, i) => {
                                    const badge = statusBadge(lead.score);
                                    return (
                                        <div
                                            key={lead.id}
                                            onClick={() => setActiveIdx(i)}
                                            className={`bg-white dark:bg-surface-card rounded-xl border p-4 flex items-center gap-4 transition-colors cursor-pointer ${i === activeIdx ? 'border-primary/40 bg-primary/5 dark:bg-primary/5' : 'border-slate-200 dark:border-slate-800 hover:border-primary/30'}`}
                                        >
                                            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm shrink-0">
                                                {lead.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-bold text-text-primary dark:text-white text-sm">{lead.name}</p>
                                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${badge.cls}`}>{badge.label}</span>
                                                </div>
                                                <p className="text-xs text-text-secondary dark:text-slate-400">{lead.job_title ?? 'Contact'} · {lead.company}</p>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <p className="text-xs font-bold text-primary">{lead.score}</p>
                                                <p className="text-[10px] text-slate-400">Intent Score</p>
                                            </div>
                                            {i === activeIdx && <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full shrink-0">Active</span>}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
