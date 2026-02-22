// CRM Sync & Integrations
'use client';
export default function CRMSyncPage() {
    const integrations = [
        { name: 'Salesforce', description: 'Bi-directional CRM sync for leads and contacts', connected: true, icon: '☁️', lastSync: '2 min ago', status: 'Healthy' },
        { name: 'HubSpot', description: 'Sync contacts, deals, and engagement data', connected: false, icon: '🟠', lastSync: null, status: null },
        { name: 'Outreach', description: 'Sequence and activity synchronization', connected: true, icon: '📤', lastSync: '15 min ago', status: 'Healthy' },
        { name: 'Apollo.io', description: 'Prospect enrichment and contact data', connected: false, icon: '🔵', lastSync: null, status: null },
        { name: 'LinkedIn Sales Nav', description: 'Social selling and prospect insights', connected: true, icon: '💼', lastSync: '1h ago', status: 'Warning' },
        { name: 'ZoomInfo', description: 'Company and contact intelligence', connected: false, icon: '🟣', lastSync: null, status: null },
    ];

    const syncLogs = [
        { event: 'Contact synced: Sarah Jenkins', time: '2 min ago', type: 'success' },
        { event: 'Deal updated: Acme Corp ($45K)', time: '15 min ago', type: 'success' },
        { event: 'Activity logged: Call with David Ross', time: '1h ago', type: 'success' },
        { event: 'Sync warning: LinkedIn API rate limit approaching', time: '2h ago', type: 'warning' },
        { event: 'Contact enriched: Elena Rodriguez (Globex Corp)', time: '3h ago', type: 'success' },
    ];

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <header className="flex-shrink-0 px-8 py-6 bg-surface-light dark:bg-surface-card border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-text-primary dark:text-white">CRM Sync & Integrations</h1>
                        <p className="text-text-secondary dark:text-slate-400 text-sm mt-1">Manage your connected tools and data synchronization</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover shadow-md transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>sync</span> Sync Now
                    </button>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto no-scrollbar p-8">
                <div className="max-w-6xl mx-auto flex flex-col gap-8">
                    {/* Sync health */}
                    <div className="grid grid-cols-3 gap-4">
                        {[{ label: 'Connected Apps', value: '3', icon: 'extension', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' }, { label: 'Records Synced (24h)', value: '2,847', icon: 'sync', color: 'text-primary bg-primary/10' }, { label: 'Sync Errors', value: '1', icon: 'error', color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20' }].map((s) => (
                            <div key={s.label} className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                                <div className={`inline-flex size-10 rounded-lg items-center justify-center mb-3 ${s.color}`}>
                                    <span className="material-symbols-outlined text-[20px]">{s.icon}</span>
                                </div>
                                <p className="text-2xl font-bold text-text-primary dark:text-white">{s.value}</p>
                                <p className="text-xs text-text-secondary dark:text-slate-400 mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Integration cards */}
                    <div>
                        <h2 className="font-bold text-text-primary dark:text-white mb-4">Available Integrations</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {integrations.map((int) => (
                                <div key={int.name} className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:border-primary/40 transition-colors">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{int.icon}</span>
                                            <div>
                                                <h3 className="font-bold text-text-primary dark:text-white">{int.name}</h3>
                                                {int.connected && (
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${int.status === 'Healthy' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'}`}>{int.status}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className={`size-2.5 rounded-full mt-1 ${int.connected ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                                    </div>
                                    <p className="text-xs text-text-secondary dark:text-slate-400 mb-4">{int.description}</p>
                                    {int.lastSync && <p className="text-[10px] text-text-secondary dark:text-slate-500 mb-3">Last synced: {int.lastSync}</p>}
                                    <button className={`w-full py-2 rounded-lg text-sm font-bold transition-colors ${int.connected ? 'border border-slate-200 dark:border-slate-700 text-text-secondary dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800' : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'}`}>
                                        {int.connected ? 'Manage' : 'Connect'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sync log */}
                    <div className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                            <h3 className="font-bold text-text-primary dark:text-white">Sync Log</h3>
                        </div>
                        <div className="divide-y divide-slate-50 dark:divide-slate-800">
                            {syncLogs.map((log) => (
                                <div key={log.event} className="px-6 py-3 flex items-center gap-4">
                                    <span className={`material-symbols-outlined text-[18px] shrink-0 ${log.type === 'success' ? 'text-emerald-500' : 'text-amber-500'}`}>{log.type === 'success' ? 'check_circle' : 'warning'}</span>
                                    <p className="text-sm text-text-primary dark:text-slate-200 flex-1">{log.event}</p>
                                    <span className="text-xs text-text-secondary dark:text-slate-500 shrink-0">{log.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
