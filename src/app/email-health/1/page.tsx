import PageHeader from '@/components/ui/PageHeader';

const domains = [
    { domain: 'salesai.com', reputation: 92, spf: true, dkim: true, dmarc: true, bounceRate: '1.2%', status: 'Excellent' },
    { domain: 'sales.salesai.com', reputation: 78, spf: true, dkim: true, dmarc: false, bounceRate: '3.4%', status: 'Warning' },
    { domain: 'outreach.salesai.com', reputation: 45, spf: false, dkim: false, dmarc: false, bounceRate: '8.1%', status: 'Poor' },
];

const metrics = [
    { label: 'Avg Deliverability', value: '96.2%', change: '+1.1%', up: true, icon: 'mail' },
    { label: 'Bounce Rate', value: '2.8%', change: '-0.5%', up: true, icon: 'error' },
    { label: 'Spam Rate', value: '0.04%', change: '0.0%', up: true, icon: 'report' },
    { label: 'Inbox Placement', value: '91%', change: '+2.3%', up: true, icon: 'inbox' },
];

export default function EmailHealth1Page() {
    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <PageHeader
                title="Email Deliverability & Domain Health"
                subtitle="Monitor your sending reputation and email authentication"
                actions={
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>refresh</span> Run Health Check
                    </button>
                }
            />

            <div className="flex-1 overflow-y-auto no-scrollbar p-8">
                <div className="max-w-6xl mx-auto flex flex-col gap-8">
                    {/* Metrics */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {metrics.map((m) => (
                            <div key={m.label} className="bg-white dark:bg-surface-card rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>{m.icon}</span>
                                    <span className={`text-xs font-bold ${m.up ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>{m.change}</span>
                                </div>
                                <p className="text-2xl font-bold text-text-primary dark:text-white">{m.value}</p>
                                <p className="text-xs text-text-secondary dark:text-slate-400 mt-1">{m.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Domain table */}
                    <div className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="font-bold text-text-primary dark:text-white">Sending Domains</h3>
                            <button className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span> Add Domain
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100 dark:border-slate-800 text-text-secondary dark:text-slate-400 text-left">
                                        <th className="px-6 py-3 font-semibold">Domain</th>
                                        <th className="px-6 py-3 font-semibold">Reputation</th>
                                        <th className="px-6 py-3 font-semibold">SPF</th>
                                        <th className="px-6 py-3 font-semibold">DKIM</th>
                                        <th className="px-6 py-3 font-semibold">DMARC</th>
                                        <th className="px-6 py-3 font-semibold">Bounce Rate</th>
                                        <th className="px-6 py-3 font-semibold">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {domains.map((d) => (
                                        <tr key={d.domain} className="border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-text-primary dark:text-white">{d.domain}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                                        <div className={`h-full rounded-full ${d.reputation >= 80 ? 'bg-emerald-500' : d.reputation >= 60 ? 'bg-amber-400' : 'bg-red-500'}`} style={{ width: `${d.reputation}%` }} />
                                                    </div>
                                                    <span className="text-xs font-bold text-text-primary dark:text-white">{d.reputation}</span>
                                                </div>
                                            </td>
                                            {[d.spf, d.dkim, d.dmarc].map((v, i) => (
                                                <td key={i} className="px-6 py-4">
                                                    <span className={`material-symbols-outlined text-[20px] ${v ? 'text-emerald-500' : 'text-red-500'}`}>{v ? 'check_circle' : 'cancel'}</span>
                                                </td>
                                            ))}
                                            <td className="px-6 py-4 text-text-primary dark:text-slate-300">{d.bounceRate}</td>
                                            <td className="px-6 py-4">
                                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${d.status === 'Excellent' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' : d.status === 'Warning' ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400' : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'}`}>{d.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
