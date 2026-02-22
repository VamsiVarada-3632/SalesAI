'use client';
import { useState } from 'react';

const conversations = [
    { id: 1, name: 'Sarah Jenkins', role: 'VP Sales @ Acme Corp', preview: 'Re: Q3 Strategy Sync - exciting news...', time: '10m', badge: 'Reply Suggested', badgeType: 'primary', active: true, online: true, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9vblmkG1YbG_zn52F_ahJB1CT4aVDn-g6jqGz_QjbMg8ZQ3wQMKwfwBnf-7cubCB7aN8aXHlrzs9-CuVzckOzzo50D_ANJHgO_PX62XZdgIqALKAUDhFNmr1f1Hxnn3xzl75bCd9KRCVYHXFVzUfHHeRivaGefUZlxOHLNb-b8sbPvc0oW_lbRfTK5HaNKAGaSrHQOLxqgHVYTbX0fkYLGze1OU3WZ39ZtM3Z2e3-laeoBxF7oBOESKO4Ld8HlkARh-BwKmoRutU' },
    { id: 2, name: 'David Ross', role: 'CTO @ TechFlow', preview: 'Checking in on the integration timeline...', time: '2h', badge: 'Urgent', badgeType: 'orange', active: false, online: false, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBY-GtJbRk9ALnKuLLLUICL2_1q1JMnG_53UE3vgPXfsCSM03euvFi6HDBXdBRubk17LjsVd-n2r1rRw5cbEyHsyoF4dP6woediVnqXDqLDadbeSayqw2G7nDpqRb54-wIgR3V0mo4enmLSDKVjYaz9r1q5lJ5W1M5uQPAapSRPsG8gHm3kiG0ZpJwecuVY0wpTAFT0pSp1Rz4MydUt3p3XZNMWTy80OOXnL8ooPdftiZoP-tX51SbIJl47XSjY2QqBO3dOFvoijlw' },
    { id: 3, name: 'Michael King', role: 'Head of Ops @ SolarEnergy', preview: "Thanks for the update, let's circle back.", time: 'Yesterday', badge: null, badgeType: null, active: false, online: false, avatar: null, initials: 'MK' },
    { id: 4, name: 'Elena Rodriguez', role: 'Director @ CreativeMinds', preview: 'Can you send over the pricing deck?', time: '2d ago', badge: null, badgeType: null, active: false, online: false, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZCwBwAQPSzoyGmTxl2cbVDMImqWUdBQGNVMdSvN2xfKeb32sSd2XvX0-gX-TAta4HubsZfAycZQoJJFdVpD5EsKL5GlNH9D1tQdzzXIztd-QdqUT43QTe0fjI9Aj_P4Lgcl5SCMDauym8g7ux_aNVLF4ffb0i91xtNZqUPRrtniRVfXRCNJBVx7D7BUzIGGWv4Ea6qTR1AlYsQt-BAnHlIe_MEp2aD1CgafNNL_vCjdX_bZNQ7LX4KyaIQW6TVCyuAQL42E5ViZI' },
];

const aiDraft = `Hi Sarah,

Thanks! We're really excited about the next phase.

Tuesday works perfectly for me. How does 2:00 PM EST look on your end? I'll send over a calendar invite shortly.

Looking forward to diving into the Salesforce integration details.`;

export default function InboxPage() {
    const [activeId, setActiveId] = useState(1);

    return (
        <div className="flex flex-1 h-full overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
            {/* Conversation list */}
            <aside className="w-[360px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0">
                <div className="p-5 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                            Inbox <span className="text-slate-400 dark:text-slate-500 text-lg font-medium ml-2">12</span>
                        </h1>
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
                                <span className="material-symbols-outlined text-[20px]">filter_list</span>
                            </button>
                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
                                <span className="material-symbols-outlined text-[20px]">edit_square</span>
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">search</span>
                        <input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-primary outline-none" placeholder="Search conversations..." />
                    </div>
                    <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide pb-1">
                        {['All', 'Unread', 'Urgent', 'Follow-up'].map((f, i) => (
                            <button key={f} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${i === 0 ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-transparent hover:bg-slate-200 dark:hover:bg-slate-700'}`}>{f}</button>
                        ))}
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {conversations.map((c) => (
                        <div
                            key={c.id}
                            onClick={() => setActiveId(c.id)}
                            className={`group flex gap-4 p-4 cursor-pointer transition-all border-b border-slate-100 dark:border-slate-800 border-l-2 ${activeId === c.id ? 'bg-primary/5 dark:bg-slate-800/50 border-l-primary' : 'border-l-transparent hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
                        >
                            <div className="relative shrink-0">
                                {c.avatar
                                    ? <img src={c.avatar} alt={c.name} className="size-12 rounded-full object-cover" />
                                    : <div className="size-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-bold">{(c as any).initials}</div>
                                }
                                {c.online && (
                                    <div className="absolute -bottom-0.5 -right-0.5 size-3.5 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center">
                                        <div className="size-2.5 bg-emerald-500 rounded-full" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-0.5">
                                    <h3 className={`text-sm font-${activeId === c.id ? 'bold' : 'semibold'} text-slate-900 dark:text-slate-100 truncate`}>{c.name}</h3>
                                    <span className="text-xs text-slate-400 whitespace-nowrap">{c.time}</span>
                                </div>
                                <p className="text-xs text-slate-400 dark:text-slate-500 truncate mb-1">{c.role}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-300 truncate leading-snug">{c.preview}</p>
                                {c.badge && (
                                    <div className="mt-2">
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${c.badgeType === 'primary' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-orange-50 text-orange-600 border border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800/30'}`}>
                                            <span className="material-symbols-outlined text-[12px]">{c.badgeType === 'primary' ? 'psychology' : 'priority_high'}</span>
                                            {c.badge}
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
                <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <div className="size-10 rounded-full bg-gradient-to-tr from-purple-500 to-primary p-0.5">
                            <img src={conversations[0].avatar!} alt="Sarah" className="w-full h-full rounded-full object-cover" />
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-slate-900 dark:text-white leading-tight">Sarah Jenkins</h2>
                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                <span>VP Sales @ Acme Corp</span>
                                <span className="size-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
                                <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded">San Francisco, CA</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="size-9 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-primary hover:border-primary/40 dark:hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[20px]">call</span>
                        </button>
                        <button className="size-9 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-primary hover:border-primary/40 dark:hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[20px]">videocam</span>
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                    <div className="flex items-center justify-center my-2">
                        <span className="text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">Oct 24, 2023</span>
                    </div>

                    {/* Received message */}
                    <div className="flex gap-4 max-w-3xl">
                        <img src={conversations[0].avatar!} alt="Sarah" className="size-10 rounded-full object-cover shrink-0 mt-1" />
                        <div className="flex flex-col gap-1">
                            <div className="flex items-baseline gap-2">
                                <span className="font-bold text-slate-900 dark:text-slate-100">Sarah Jenkins</span>
                                <span className="text-xs text-slate-400">10:42 AM</span>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-5 rounded-r-xl rounded-bl-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm leading-relaxed shadow-sm">
                                <p className="mb-3">Hi Alex,</p>
                                <p className="mb-3">Thanks for reaching out earlier. We've been reviewing the Q3 strategy internally and I think there's some definite alignment with what your platform offers.</p>
                                <p>I saw you just launched the new integration suite. Would that work with our current Salesforce setup? That's a key blocker for us right now.</p>
                                <p className="mt-3">Best,<br />Sarah</p>
                            </div>
                        </div>
                    </div>

                    {/* Sent message */}
                    <div className="flex gap-4 max-w-3xl self-end flex-row-reverse">
                        <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0 mt-1">ME</div>
                        <div className="flex flex-col gap-1 items-end">
                            <div className="flex items-baseline gap-2">
                                <span className="text-xs text-slate-400">11:15 AM</span>
                                <span className="font-bold text-slate-900 dark:text-slate-100">You</span>
                            </div>
                            <div className="bg-primary/10 dark:bg-slate-800 p-5 rounded-l-xl rounded-br-xl border border-primary/20 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm leading-relaxed shadow-sm">
                                <p>Hi Sarah, glad to hear that!</p>
                                <p className="mt-2">Yes, the new suite is fully compatible with Salesforce. I can walk you through the specifics on a quick call if that helps.</p>
                            </div>
                        </div>
                    </div>

                    {/* Latest received */}
                    <div className="flex gap-4 max-w-3xl">
                        <img src={conversations[0].avatar!} alt="Sarah" className="size-10 rounded-full object-cover shrink-0 mt-1" />
                        <div className="flex flex-col gap-1">
                            <div className="flex items-baseline gap-2">
                                <span className="font-bold text-slate-900 dark:text-slate-100">Sarah Jenkins</span>
                                <span className="text-xs text-slate-400">10m ago</span>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-5 rounded-r-xl rounded-bl-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                                <p>That would be great. Also, I just saw the news about your Series B funding, congrats!</p>
                                <p className="mt-2">Let's book something for Tuesday?</p>
                            </div>
                        </div>
                    </div>

                    {/* AI Draft */}
                    <div className="mt-2 relative group">
                        <div className="absolute -top-3 left-4 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md z-10">
                            <span className="material-symbols-outlined text-[12px]">auto_awesome</span> AI Draft
                        </div>
                        <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl p-6">
                            <div className="flex justify-between items-center mb-4 border-b border-primary/10 pb-3">
                                <span className="text-xs font-semibold text-primary/70 uppercase tracking-wider">Suggested Reply</span>
                                <div className="flex gap-3">
                                    <button className="text-xs text-slate-400 hover:text-primary flex items-center gap-1 transition-colors">
                                        <span className="material-symbols-outlined text-[14px]">refresh</span> Regenerate
                                    </button>
                                    <button className="text-xs text-slate-400 hover:text-primary flex items-center gap-1 transition-colors">
                                        <span className="material-symbols-outlined text-[14px]">tune</span> Adjust Tone
                                    </button>
                                </div>
                            </div>
                            <textarea defaultValue={aiDraft} className="w-full bg-transparent border-none text-slate-700 dark:text-slate-200 text-sm leading-relaxed focus:ring-0 resize-none p-0 h-32 outline-none" />
                            <div className="flex items-center justify-between mt-4 pt-2 border-t border-primary/10">
                                <div className="flex gap-2">
                                    <button className="size-8 rounded hover:bg-primary/10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">attach_file</span>
                                    </button>
                                </div>
                                <div className="flex gap-3">
                                    <button className="px-4 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Discard</button>
                                    <button className="px-4 py-2 rounded-lg text-sm font-bold bg-primary text-white hover:bg-primary-hover shadow-md flex items-center gap-2 transition-colors">
                                        Send Reply <span className="material-symbols-outlined text-[16px]">send</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Copilot panel */}
            <aside className="w-[300px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col shrink-0 overflow-y-auto">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center sticky top-0 bg-white dark:bg-slate-900 z-10">
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[18px]">smart_toy</span> Copilot
                    </h2>
                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>
                <div className="flex flex-col gap-5 p-4">
                    {/* Buying Intent */}
                    <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200">Buying Intent</h3>
                            <span className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20">HIGH</span>
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="flex-1 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-emerald-500 to-primary h-full rounded-full" style={{ width: '85%' }} />
                            </div>
                            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">85%</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Prospect has visited the pricing page 3 times in the last 48 hours and viewed the "Salesforce Integration" doc.</p>
                    </div>
                    {/* Recent News */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 px-1">Recent News</h3>
                        <a href="#" className="block bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl p-3 transition-colors group">
                            <div className="flex items-start justify-between gap-2">
                                <span className="text-xs font-bold text-primary group-hover:underline">Acme Corp</span>
                                <span className="text-[10px] text-slate-400">2d ago</span>
                            </div>
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 leading-snug">Acme Corp raises $50M Series B to expand sales ops</p>
                            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[12px]">trending_up</span> Positive Signal
                            </p>
                        </a>
                    </div>
                    {/* CRM Context */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 px-1">CRM Context</h3>
                        <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                            <div className="p-3 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="size-2 rounded-full bg-blue-500" />
                                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Salesforce</span>
                                </div>
                                <span className="text-[10px] text-slate-400">Synced</span>
                            </div>
                            <div className="p-3 space-y-3">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[10px] text-slate-400 uppercase tracking-wide">Stage</p>
                                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Discovery</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 uppercase tracking-wide">Deal Size</p>
                                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">$45k ARR</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-400 uppercase tracking-wide">Next Step</p>
                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Schedule Tech Demo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}
