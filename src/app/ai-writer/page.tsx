// AI Email Writer / Personalization Studio
'use client';
import { useState } from 'react';

const tones = ['Professional', 'Friendly', 'Concise', 'Persuasive'];
const triggers = ['Funding Event', 'Hiring Surge', 'Website Visit', 'Job Change', 'Custom'];

const draftOutput = `Subject: Quick question for you, Sarah

Hi Sarah,

Congratulations on Acme Corp's Series B raise! Landing $50M is a massive achievement — it's clear you're scaling fast.

I work with high-growth SaaS companies like yours at exactly this stage, helping SDR teams 3x their outreach capacity without adding headcount.

Would it be worth a 15-minute call to see if there's a fit? I promise no long demos — just a focused conversation.

Best,
Alex Morgan
SalesAI`;

export default function AIWriterPage() {
    const [activeTone, setActiveTone] = useState('Professional');
    const [activeTrigger, setActiveTrigger] = useState('Funding Event');

    return (
        <div className="flex-1 flex h-full overflow-hidden">
            {/* Left config panel */}
            <aside className="w-80 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-card flex flex-col overflow-y-auto shrink-0">
                <div className="p-5 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="font-bold text-text-primary dark:text-white">AI Email Writer</h2>
                    <p className="text-xs text-text-secondary dark:text-slate-400 mt-0.5">Personalize at scale with AI</p>
                </div>

                <div className="flex-1 p-5 flex flex-col gap-5">
                    {/* Recipient */}
                    <div>
                        <label className="text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider block mb-2">Recipient</label>
                        <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDddHGjL1D2Xa24ru5hKt7M1m0d0D2Ew5n1Ph3HBjoFPUx1YqrR6IK3NoTfm5mqeFquzD7UeYtwetbzhDcWfRm1JLZEfdzhS3t3Rg5zgPCl4NDAiL4lg3al7S0hoc4vkLEe1LCTUqEn1jol09Oj300hI07qF4p9aH9t_7oRmidju0NQO5qzlrmsXythqKJ3HBq2R49Fs1Q4gxqiSRR4AQHIsqMg-4hO289zeupI_KiWBJWMcpUIFPVIRxgKp5BJXT4OvBcFV9nuD0I" alt="Sarah" className="size-8 rounded-full object-cover" />
                            <div>
                                <p className="text-sm font-bold text-text-primary dark:text-white">Sarah Jenkins</p>
                                <p className="text-xs text-text-secondary dark:text-slate-400">VP Sales · Acme Corp</p>
                            </div>
                        </div>
                    </div>

                    {/* Trigger */}
                    <div>
                        <label className="text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider block mb-2">Personalization Trigger</label>
                        <div className="flex flex-wrap gap-2">
                            {triggers.map((t) => (
                                <button key={t} onClick={() => setActiveTrigger(t)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeTrigger === t ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-text-secondary dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>{t}</button>
                            ))}
                        </div>
                    </div>

                    {/* Tone */}
                    <div>
                        <label className="text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider block mb-2">Email Tone</label>
                        <div className="flex flex-wrap gap-2">
                            {tones.map((t) => (
                                <button key={t} onClick={() => setActiveTone(t)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeTone === t ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-text-secondary dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>{t}</button>
                            ))}
                        </div>
                    </div>

                    {/* Value Prop */}
                    <div>
                        <label className="text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider block mb-2">Key Value Proposition</label>
                        <textarea rows={3} defaultValue="3x outreach capacity without adding headcount using AI-powered automation" className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-text-primary dark:text-white focus:ring-2 focus:ring-primary outline-none resize-none" />
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary-hover transition-colors shadow-md">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>auto_awesome</span>
                        Generate Email
                    </button>
                </div>
            </aside>

            {/* Right: Generated email */}
            <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 dark:bg-background-dark">
                <div className="flex-shrink-0 px-8 py-5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-card flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="size-2.5 bg-emerald-400 rounded-full" />
                        <h2 className="font-bold text-text-primary dark:text-white text-sm">Generated Email</h2>
                        <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">{activeTone}</span>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <span className="material-symbols-outlined text-[16px]">refresh</span> Regenerate
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-primary text-white hover:bg-primary-hover transition-colors">
                            <span className="material-symbols-outlined text-[16px]">send</span> Send Email
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-2xl mx-auto">
                        {/* Score card */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            {[{ label: 'Personalization', score: 94 }, { label: 'Clarity', score: 88 }, { label: 'Call-to-Action', score: 91 }].map((s) => (
                                <div key={s.label} className="bg-white dark:bg-surface-card rounded-lg border border-slate-200 dark:border-slate-800 p-3 text-center">
                                    <p className="text-2xl font-bold text-primary">{s.score}</p>
                                    <p className="text-xs text-text-secondary dark:text-slate-400">{s.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Email preview */}
                        <div className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                                <p className="text-xs text-text-secondary dark:text-slate-400">To: s.jenkins@acmecorp.com</p>
                                <p className="text-xs text-text-secondary dark:text-slate-400 mt-1">From: alex@salesai.com</p>
                            </div>
                            <div className="p-6">
                                <textarea defaultValue={draftOutput} rows={16} className="w-full bg-transparent border-none text-sm text-text-primary dark:text-slate-200 leading-relaxed focus:ring-0 resize-none outline-none p-0" />
                            </div>
                        </div>

                        {/* Alternatives */}
                        <div className="mt-4">
                            <p className="text-xs font-bold text-text-secondary dark:text-slate-500 uppercase tracking-wider mb-3">Alternative Subject Lines</p>
                            <div className="flex flex-col gap-2">
                                {['Congrats on the raise, Sarah 🎉', 'Scaling your SDR team after Series B?', 'Quick idea for Acme Corp post-funding'].map((s) => (
                                    <button key={s} className="text-left px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-card text-sm text-text-primary dark:text-slate-200 hover:border-primary/50 hover:bg-primary/5 transition-colors group">
                                        <span>{s}</span>
                                        <span className="material-symbols-outlined text-[14px] text-slate-300 dark:text-slate-600 group-hover:text-primary float-right mt-0.5">arrow_forward</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
