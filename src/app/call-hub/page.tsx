// Call Hub - SDR Smart Dialer
'use client';
export default function CallHubPage() {
    const queue = [
        { name: 'Sarah Jenkins', company: 'Acme Corp', role: 'VP Sales', score: 85, status: 'Hot', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDddHGjL1D2Xa24ru5hKt7M1m0d0D2Ew5n1Ph3HBjoFPUx1YqrR6IK3NoTfm5mqeFquzD7UeYtwetbzhDcWfRm1JLZEfdzhS3t3Rg5zgPCl4NDAiL4lg3al7S0hoc4vkLEe1LCTUqEn1jol09Oj300hI07qF4p9aH9t_7oRmidju0NQO5qzlrmsXythqKJ3HBq2R49Fs1Q4gxqiSRR4AQHIsqMg-4hO289zeupI_KiWBJWMcpUIFPVIRxgKp5BJXT4OvBcFV9nuD0I' },
        { name: 'David Ross', company: 'TechFlow', role: 'CTO', score: 72, status: 'Warm', avatar: null, initials: 'DR' },
        { name: 'Elena Rodriguez', company: 'Globex Corp', role: 'Director', score: 68, status: 'Warm', avatar: null, initials: 'ER' },
        { name: 'Michael King', company: 'SolarEnergy', role: 'Head of Ops', score: 55, status: 'Cold', avatar: null, initials: 'MK' },
    ];

    return (
        <div className="flex-1 flex h-full overflow-hidden bg-background-light dark:bg-background-dark">
            {/* Call Panel */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex-shrink-0 px-8 py-6 bg-surface-light dark:bg-surface-card border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-text-primary dark:text-white">Call Hub & Smart Dialer</h1>
                            <p className="text-sm text-text-secondary dark:text-slate-400 mt-1">AI-powered call assistance with real-time coaching</p>
                        </div>
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary-hover transition-colors shadow-md">
                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>play_arrow</span>
                            Start Queue (4)
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto no-scrollbar p-8">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Active Call Card */}
                        <div className="bg-white dark:bg-surface-card rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="bg-gradient-to-br from-primary to-indigo-600 p-6 text-center text-white">
                                <div className="size-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm overflow-hidden">
                                    <img src={queue[0].avatar!} alt={queue[0].name} className="w-full h-full object-cover" />
                                </div>
                                <h2 className="text-xl font-bold">{queue[0].name}</h2>
                                <p className="text-indigo-200 text-sm">{queue[0].role} at {queue[0].company}</p>
                                <div className="flex items-center justify-center gap-2 mt-2">
                                    <div className="size-2 bg-green-400 rounded-full animate-pulse" />
                                    <span className="text-sm font-medium">00:02:34</span>
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

                                {/* AI Coach */}
                                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="material-symbols-outlined text-primary text-[18px]">auto_awesome</span>
                                        <span className="text-xs font-bold text-primary uppercase tracking-wider">AI Coaching — Live</span>
                                    </div>
                                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                        Sarah mentioned <strong>Salesforce integration</strong> — this is her key concern. Highlight your native Salesforce connector and offer to schedule a technical demo with your solutions engineer.
                                    </p>
                                    <div className="mt-3 flex gap-2">
                                        <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">Use This Tip</button>
                                        <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Next Tip</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Call Queue */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg font-bold text-text-primary dark:text-white">Call Queue</h3>
                            {queue.map((person, i) => (
                                <div key={person.name} className={`bg-white dark:bg-surface-card rounded-xl border p-4 flex items-center gap-4 transition-colors ${i === 0 ? 'border-primary/40 bg-primary/5 dark:bg-primary/5' : 'border-slate-200 dark:border-slate-800 hover:border-primary/30'}`}>
                                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary overflow-hidden shrink-0">
                                        {person.avatar ? <img src={person.avatar} alt={person.name} className="w-full h-full object-cover" /> : person.initials}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold text-text-primary dark:text-white text-sm">{person.name}</p>
                                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${person.status === 'Hot' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' : person.status === 'Warm' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>{person.status}</span>
                                        </div>
                                        <p className="text-xs text-text-secondary dark:text-slate-400">{person.role} · {person.company}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-xs font-bold text-primary">{person.score}</p>
                                        <p className="text-[10px] text-slate-400">Intent Score</p>
                                    </div>
                                    {i === 0 && <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full shrink-0">Active</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
