'use client';

import { useEffect, useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import { getCampaigns, Campaign, updateCampaign, deleteCampaign } from '@/lib/api';

const statusConfig: Record<string, string> = {
    Active: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
    Paused: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
    Draft: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
};

export default function CampaignsPage() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);

    const load = () => {
        setLoading(true);
        getCampaigns()
            .then(setCampaigns)
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(load, []);

    const handleToggle = async (c: Campaign) => {
        const next = c.status === 'Active' ? 'Paused' : 'Active';
        await updateCampaign(c.id, { status: next });
        load();
    };

    const handleDelete = async (id: number) => {
        await deleteCampaign(id);
        load();
    };

    const active = campaigns.filter(c => c.status === 'Active').length;
    const enrolled = campaigns.reduce((s, c) => s + c.contacts_count, 0);
    const meetings = campaigns.reduce((s, c) => s + c.meetings, 0);

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <PageHeader
                title="Campaigns"
                subtitle="Manage and monitor your outreach campaigns"
                actions={
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors shadow-md">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span> New Campaign
                    </button>
                }
            />

            <div className="flex-1 overflow-y-auto no-scrollbar p-8">
                <div className="max-w-6xl mx-auto flex flex-col gap-6">
                    {/* Summary stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'Active Campaigns', value: loading ? '—' : String(active), icon: 'play_arrow' },
                            { label: 'Total Enrolled', value: loading ? '—' : String(enrolled), icon: 'group' },
                            { label: 'Total Campaigns', value: loading ? '—' : String(campaigns.length), icon: 'mail_open' },
                            { label: 'Meetings Generated', value: loading ? '—' : String(meetings), icon: 'calendar_today' },
                        ].map((s) => (
                            <div key={s.label} className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
                                <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>{s.icon}</span>
                                <p className="text-xl font-bold text-text-primary dark:text-white mt-2">{s.value}</p>
                                <p className="text-xs text-text-secondary dark:text-slate-400">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Campaign table */}
                    <div className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="font-bold text-text-primary dark:text-white">All Campaigns</h3>
                        </div>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-slate-800 text-text-secondary dark:text-slate-400 text-left">
                                    <th className="px-6 py-3 font-semibold">Campaign</th>
                                    <th className="px-6 py-3 font-semibold">Status</th>
                                    <th className="px-6 py-3 font-semibold">Contacts</th>
                                    <th className="px-6 py-3 font-semibold">Open Rate</th>
                                    <th className="px-6 py-3 font-semibold">Reply Rate</th>
                                    <th className="px-6 py-3 font-semibold">Meetings</th>
                                    <th className="px-6 py-3 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    [...Array(3)].map((_, i) => (
                                        <tr key={i}>
                                            <td colSpan={7} className="px-6 py-4">
                                                <div className="h-6 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
                                            </td>
                                        </tr>
                                    ))
                                ) : campaigns.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-16 text-center">
                                            <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600">campaign</span>
                                            <p className="mt-2 text-sm font-medium text-text-secondary dark:text-slate-400">No campaigns yet. Create your first campaign to get started.</p>
                                        </td>
                                    </tr>
                                ) : campaigns.map((c) => (
                                    <tr key={c.id} className="border-b border-slate-50 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-text-primary dark:text-white">{c.name}</p>
                                            <p className="text-xs text-text-secondary dark:text-slate-400">Created {new Date(c.created_at).toLocaleDateString()}</p>
                                        </td>
                                        <td className="px-6 py-4"><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusConfig[c.status]}`}>{c.status}</span></td>
                                        <td className="px-6 py-4 text-text-primary dark:text-slate-300 font-medium">{c.contacts_count}</td>
                                        <td className="px-6 py-4 text-text-primary dark:text-slate-300 font-medium">{c.open_rate ?? '—'}</td>
                                        <td className="px-6 py-4 text-text-primary dark:text-slate-300 font-medium">{c.reply_rate ?? '—'}</td>
                                        <td className="px-6 py-4 text-text-primary dark:text-slate-300 font-medium">{c.meetings}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleToggle(c)} className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-amber-500">
                                                    <span className="material-symbols-outlined text-[18px]">{c.status === 'Active' ? 'pause' : 'play_arrow'}</span>
                                                </button>
                                                <button onClick={() => handleDelete(c.id)} className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500">
                                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                                </button>
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
