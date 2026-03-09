'use client';

import { useEffect, useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import { getLeads, Lead } from '@/lib/api';

const statusConfig: Record<string, string> = {
    New: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    Contacted: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
    Replied: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
};

export default function ContactsPage() {
    const [contacts, setContacts] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setLoading(true);
        getLeads({ search: search || undefined, limit: 50 })
            .then((d) => setContacts(d.results))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [search]);

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <PageHeader
                title="Contacts & Lead Management"
                subtitle="Your full contact database with AI enrichment"
                actions={
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold text-text-primary dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>upload</span> Import
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span> Add Contact
                        </button>
                    </div>
                }
            />

            <div className="flex-1 overflow-y-auto no-scrollbar p-8">
                <div className="max-w-7xl mx-auto flex flex-col gap-6">
                    {/* Search + filters */}
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative flex-1 max-w-sm">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">search</span>
                            <input
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-text-primary dark:text-white focus:ring-2 focus:ring-primary outline-none"
                                placeholder="Search contacts..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Contacts table */}
                    <div className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800 text-text-secondary dark:text-slate-400 text-left">
                                    <th className="px-5 py-3.5 font-semibold">Contact</th>
                                    <th className="px-5 py-3.5 font-semibold">Status</th>
                                    <th className="px-5 py-3.5 font-semibold">Intent Score</th>
                                    <th className="px-5 py-3.5 font-semibold">Email</th>
                                    <th className="px-5 py-3.5 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    [...Array(5)].map((_, i) => (
                                        <tr key={i}>
                                            <td colSpan={5} className="px-5 py-4">
                                                <div className="h-6 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
                                            </td>
                                        </tr>
                                    ))
                                ) : contacts.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-5 py-16 text-center">
                                            <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600">contacts</span>
                                            <p className="mt-2 text-sm font-medium text-text-secondary dark:text-slate-400">No contacts yet. Import contacts or add them manually.</p>
                                        </td>
                                    </tr>
                                ) : contacts.map((c) => (
                                    <tr key={c.id} className="border-b border-slate-50 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm overflow-hidden shrink-0">
                                                    {c.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-text-primary dark:text-white">{c.name}</p>
                                                    <p className="text-xs text-text-secondary dark:text-slate-400">{c.job_title ?? '—'} · {c.company}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusConfig[c.status] ?? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>{c.status}</span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${c.score >= 75 ? 'bg-emerald-500' : c.score >= 55 ? 'bg-amber-400' : 'bg-slate-400'}`} style={{ width: `${c.score}%` }} />
                                                </div>
                                                <span className="text-xs font-bold text-text-primary dark:text-white">{c.score}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-text-secondary dark:text-slate-400 text-xs">{c.email}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-[18px]">mail</span></button>
                                                <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-emerald-500 transition-colors"><span className="material-symbols-outlined text-[18px]">call</span></button>
                                                <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 transition-colors"><span className="material-symbols-outlined text-[18px]">more_horiz</span></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-text-secondary dark:text-slate-500">
                            <span>Showing {contacts.length} contact{contacts.length !== 1 ? 's' : ''}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
