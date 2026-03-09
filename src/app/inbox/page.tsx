'use client';
import { useEffect, useState } from 'react';
import { getLeads, Lead } from '@/lib/api';

export default function InboxPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [activeId, setActiveId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getLeads({ limit: 20 })
            .then((d) => {
                setLeads(d.results);
                if (d.results.length > 0) setActiveId(d.results[0].id);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const active = leads.find((l) => l.id === activeId);

    return (
        <div className="flex flex-1 h-full overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
            {/* Conversation list */}
            <aside className="w-[360px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0">
                <div className="p-5 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                            Inbox <span className="text-slate-400 dark:text-slate-500 text-lg font-medium ml-2">{leads.length}</span>
                        </h1>
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
                            <span className="material-symbols-outlined text-[20px]">edit_square</span>
                        </button>
                    </div>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">search</span>
                        <input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-primary outline-none" placeholder="Search conversations..." />
                    </div>
                    <div className="flex gap-2 mt-4">
                        {['All', 'Unread', 'Urgent', 'Follow-up'].map((f, i) => (
                            <button key={f} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${i === 0 ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-transparent hover:bg-slate-200 dark:hover:bg-slate-700'}`}>{f}</button>
                        ))}
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        [...Array(4)].map((_, i) => (
                            <div key={i} className="flex gap-4 p-4 border-b border-slate-100 dark:border-slate-800">
                                <div className="size-12 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-1/2 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
                                    <div className="h-3 w-3/4 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
                                </div>
                            </div>
                        ))
                    ) : leads.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                            <span className="material-symbols-outlined text-4xl mb-2">inbox</span>
                            <p className="text-sm">No leads to show. Add leads to populate inbox.</p>
                        </div>
                    ) : leads.map((lead) => (
                        <div
                            key={lead.id}
                            onClick={() => setActiveId(lead.id)}
                            className={`group flex gap-4 p-4 cursor-pointer transition-all border-b border-slate-100 dark:border-slate-800 border-l-2 ${activeId === lead.id ? 'bg-primary/5 dark:bg-slate-800/50 border-l-primary' : 'border-l-transparent hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
                        >
                            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                                {lead.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-0.5">
                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{lead.name}</h3>
                                    <span className="text-xs text-slate-400 whitespace-nowrap">{new Date(lead.created_at).toLocaleDateString()}</span>
                                </div>
                                <p className="text-xs text-slate-400 dark:text-slate-500 truncate mb-1">{lead.job_title ?? lead.email} @ {lead.company}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-300 truncate leading-snug">Status: {lead.status}</p>
                                {lead.score >= 70 && (
                                    <div className="mt-2">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
                                            <span className="material-symbols-outlined text-[12px]">psychology</span>
                                            High Intent
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main thread */}
            <main className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-slate-950">
                {active ? (
                    <>
                        <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                    {active.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-slate-900 dark:text-white">{active.name}</h2>
                                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                        <span>{active.job_title ?? active.email}</span>
                                        {active.company && <>
                                            <span className="size-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
                                            <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded">{active.company}</span>
                                        </>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="size-9 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary/40 transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">call</span>
                                </button>
                                <button className="size-9 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary/40 transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">videocam</span>
                                </button>
                            </div>
                        </header>
                        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 items-center justify-center">
                            <div className="flex flex-col items-center gap-3 text-slate-400 dark:text-slate-500">
                                <span className="material-symbols-outlined text-5xl text-slate-200 dark:text-slate-700">mail</span>
                                <p className="text-sm font-medium">Select a lead to view conversation history</p>
                                <p className="text-xs">Messages will appear here once you start communicating via the API</p>
                            </div>
                        </div>

                        {/* Reply composer */}
                        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                            <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl p-4">
                                <div className="flex justify-between items-center mb-3 border-b border-primary/10 pb-3">
                                    <span className="text-xs font-semibold text-primary/70 uppercase tracking-wider">AI Draft Reply</span>
                                    <button className="text-xs text-slate-400 hover:text-primary flex items-center gap-1 transition-colors">
                                        <span className="material-symbols-outlined text-[14px]">auto_awesome</span> Generate
                                    </button>
                                </div>
                                <textarea className="w-full bg-transparent border-none text-slate-700 dark:text-slate-200 text-sm leading-relaxed focus:ring-0 resize-none p-0 h-20 outline-none" placeholder={`Write a reply to ${active.name}...`} />
                                <div className="flex justify-end mt-3 pt-2 border-t border-primary/10 gap-3">
                                    <button className="px-4 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Discard</button>
                                    <button className="px-4 py-2 rounded-lg text-sm font-bold bg-primary text-white hover:bg-primary-hover shadow-md flex items-center gap-2">
                                        Send Reply <span className="material-symbols-outlined text-[16px]">send</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-slate-400 dark:text-slate-500">
                        <div className="text-center">
                            <span className="material-symbols-outlined text-5xl text-slate-200 dark:text-slate-700">inbox</span>
                            <p className="mt-2 text-sm">Add leads to see them in your inbox</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
