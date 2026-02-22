export default function ProspectingPage() {
    const companies = [
        { name: 'Acme Corp', industry: 'B2B SaaS', size: '500-1k', score: 91, signal: 'Hiring 5 SDRs', signalIcon: 'trending_up', decision: 'Sarah Jenkins, VP Sales' },
        { name: 'Nebular Systems', industry: 'FinTech', size: '50-200', score: 74, signal: 'Raised $30M Series B', signalIcon: 'monetization_on', decision: 'Mike Ross, CFO' },
        { name: 'Vortex AI', industry: 'AI / ML', size: 'Series B', score: 88, signal: 'Multiple pricing page visits', signalIcon: 'visibility', decision: 'Elena Rodriguez, Director' },
        { name: 'Proxima Inc', industry: 'Retail', size: '1k+', score: 55, signal: 'Installed HubSpot recently', signalIcon: 'integration_instructions', decision: 'Michael King, Head of Ops' },
    ];

    const scoreColor = (s: number) => s >= 80 ? 'text-emerald-600 dark:text-emerald-400' : s >= 60 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400';

    return (
        <div className="flex-1 flex h-full overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 px-6 py-5 flex items-center justify-between sticky top-0 z-10">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI Prospecting Engine</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">52 new opportunities detected in the last hour</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>filter_list</span> Filter
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors shadow-md">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>refresh</span> Refresh Feed
                        </button>
                    </div>
                </header>

                {/* Filter bar */}
                <div className="px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-white dark:bg-slate-900 overflow-x-auto no-scrollbar">
                    {['All Signals', 'High Intent Only', 'Website Visits', 'Hiring Surges', 'Funding News'].map((f, i) => (
                        <button key={f} className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${i === 0 ? 'bg-primary text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>{f}</button>
                    ))}
                </div>

                <div className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-slate-950">
                    <div className="max-w-5xl mx-auto flex flex-col gap-4">
                        {companies.map((c) => (
                            <div key={c.name} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/40 dark:hover:border-primary/40 rounded-xl p-5 transition-all hover:shadow-md shadow-sm">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Company Info */}
                                    <div className="flex flex-col gap-3 md:w-52">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                {c.name[0]}
                                            </div>
                                            <div>
                                                <h3 className="text-slate-900 dark:text-white font-bold leading-tight">{c.name}</h3>
                                                <div className={`flex items-center gap-1 mt-0.5 text-xs font-bold ${scoreColor(c.score)}`}>
                                                    {c.score}/100
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 flex-wrap">
                                            <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded">{c.industry}</span>
                                            <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded">{c.size} Emp</span>
                                        </div>
                                    </div>

                                    {/* Signal */}
                                    <div className="flex-1 flex flex-col justify-center border-l border-slate-100 dark:border-slate-800 pl-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400" style={{ fontSize: 20 }}>{c.signalIcon}</span>
                                            <span className="text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wide">Intent Signal</span>
                                        </div>
                                        <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-relaxed">{c.signal}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                                            <span className="text-slate-600 dark:text-slate-300 font-medium">Decision Maker:</span> {c.decision}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-2 md:w-44 justify-center">
                                        <button className="flex items-center justify-center gap-2 w-full h-10 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-lg transition-colors shadow-sm">
                                            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                                            Generate Email
                                        </button>
                                        <button className="flex items-center justify-center w-full h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-sm font-medium rounded-lg transition-colors">
                                            View Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-center mt-2">
                            <button className="text-slate-400 text-sm font-semibold hover:text-primary flex items-center gap-2 transition-colors">
                                Load More Signals <span className="material-symbols-outlined text-[16px]">expand_more</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
