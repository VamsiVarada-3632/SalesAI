// Visual Outreach Sequence Builder
'use client';
import { useState } from 'react';

const steps = [
    { id: 1, type: 'Email', name: 'Day 1 — Initial Outreach', icon: 'mail', color: 'bg-blue-500', subject: 'Quick question about your Q4 sales goals', status: 'active' },
    { id: 2, type: 'Wait', name: 'Wait 2 Days', icon: 'timer', color: 'bg-slate-400', subject: null, status: 'wait' },
    { id: 3, type: 'LinkedIn', name: 'Day 3 — LinkedIn Connect', icon: 'public', color: 'bg-[#0077b5]', subject: 'Connection request with personalized note', status: 'pending' },
    { id: 4, type: 'Wait', name: 'Wait 1 Day', icon: 'timer', color: 'bg-slate-400', subject: null, status: 'wait' },
    { id: 5, type: 'Call', name: 'Day 4 — Intro Call', icon: 'call', color: 'bg-emerald-500', subject: 'Follow up on email + LinkedIn', status: 'pending' },
    { id: 6, type: 'Email', name: 'Day 7 — Follow-up', icon: 'mail', color: 'bg-blue-500', subject: 'Re: Quick question (following up)', status: 'pending' },
];

export default function SequencesPage() {
    const [active, setActive] = useState(1);
    return (
        <div className="flex-1 flex h-full overflow-hidden bg-background-light dark:bg-background-dark">
            {/* Canvas */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex-shrink-0 px-8 py-5 bg-surface-light dark:bg-surface-card border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-text-primary dark:text-white">Visual Outreach Sequence Builder</h1>
                        <p className="text-sm text-text-secondary dark:text-slate-400 mt-0.5">CTO Outreach V2 — SaaS Segment</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold text-text-primary dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>edit</span> Edit Draft
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors shadow-md">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>play_arrow</span> Activate Sequence
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto no-scrollbar p-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Stats bar */}
                        <div className="grid grid-cols-4 gap-4 mb-8">
                            {[{ label: 'Enrolled', value: '124', icon: 'group' }, { label: 'Open Rate', value: '64%', icon: 'mail_open' }, { label: 'Reply Rate', value: '18%', icon: 'reply' }, { label: 'Meetings', value: '11', icon: 'calendar_today' }].map((s) => (
                                <div key={s.label} className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 p-4 text-center shadow-sm">
                                    <span className="material-symbols-outlined text-primary mb-1" style={{ fontSize: 22 }}>{s.icon}</span>
                                    <p className="text-2xl font-bold text-text-primary dark:text-white">{s.value}</p>
                                    <p className="text-xs text-text-secondary dark:text-slate-400 mt-0.5">{s.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Sequence Steps */}
                        <div className="relative">
                            {/* Vertical connector line */}
                            <div className="absolute left-[28px] top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />

                            <div className="flex flex-col gap-4">
                                {steps.map((step, i) => (
                                    <div key={step.id} className={`relative flex gap-5 items-start cursor-pointer group`} onClick={() => setActive(step.id)}>
                                        <div className={`relative z-10 flex-shrink-0 size-14 rounded-xl flex items-center justify-center text-white shadow-md ${step.status === 'wait' ? 'bg-slate-300 dark:bg-slate-600' : step.color}`}>
                                            <span className="material-symbols-outlined text-[22px]">{step.icon}</span>
                                        </div>
                                        <div className={`flex-1 bg-white dark:bg-surface-card rounded-xl border p-4 transition-all ${active === step.id ? 'border-primary/40 shadow-md shadow-primary/10' : 'border-slate-200 dark:border-slate-800 hover:border-primary/30'}`}>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{step.type}</span>
                                                        <p className="font-bold text-text-primary dark:text-white text-sm">{step.name}</p>
                                                    </div>
                                                    {step.subject && <p className="text-xs text-text-secondary dark:text-slate-400 mt-1">{step.subject}</p>}
                                                </div>
                                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                                                    <button className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Add Step */}
                                <div className="relative flex gap-5 items-center">
                                    <div className="relative z-10 flex-shrink-0 size-14 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-400 hover:border-primary hover:text-primary transition-colors cursor-pointer">
                                        <span className="material-symbols-outlined text-[24px]">add</span>
                                    </div>
                                    <p className="text-sm font-medium text-text-secondary dark:text-slate-400">Add Next Step</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Step Editor Panel */}
            <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-card flex flex-col overflow-y-auto">
                <div className="p-5 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="font-bold text-text-primary dark:text-white">Step Editor</h2>
                    <p className="text-xs text-text-secondary dark:text-slate-400 mt-0.5">Day 1 — Initial Outreach</p>
                </div>
                <div className="p-5 flex flex-col gap-5">
                    <div>
                        <label className="block text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider mb-2">From</label>
                        <div className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                            <span className="material-symbols-outlined text-slate-400 text-[18px]">person</span>
                            <span className="text-sm text-text-primary dark:text-white">Alex Morgan (alex@salesai.com)</span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider mb-2">Subject Line</label>
                        <input defaultValue="Quick question about your Q4 sales goals" className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-text-primary dark:text-white focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider">Body</label>
                            <button className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline">
                                <span className="material-symbols-outlined text-[14px]">auto_awesome</span> AI Rewrite
                            </button>
                        </div>
                        <textarea rows={6} defaultValue={'Hi {{first_name}},\n\nI noticed that {{company}} recently {{trigger_event}}.\n\nI help companies like yours {{value_prop}}.\n\nWorth a 15-min call?\n\n— Alex'} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-text-primary dark:text-white focus:ring-2 focus:ring-primary outline-none resize-none" />
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors">
                        Save Changes
                    </button>
                </div>
            </aside>
        </div>
    );
}
