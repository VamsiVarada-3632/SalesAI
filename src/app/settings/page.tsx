'use client';
import { useState } from 'react';

const sections = ['Account', 'Notifications', 'Email', 'Integrations', 'Team', 'Billing'];

export default function SettingsPage() {
    const [active, setActive] = useState('Account');

    return (
        <div className="flex-1 flex h-full overflow-hidden">
            {/* Settings nav */}
            <aside className="w-56 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-card flex flex-col py-6 px-3 gap-1 shrink-0">
                <p className="text-xs font-bold text-text-secondary dark:text-slate-500 uppercase tracking-wider px-3 mb-3">Settings</p>
                {sections.map((s) => (
                    <button key={s} onClick={() => setActive(s)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${active === s ? 'bg-primary/10 text-primary' : 'text-text-secondary dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-text-primary dark:hover:text-white'}`}>
                        <span className="material-symbols-outlined text-[18px]">{['manage_accounts', 'notifications', 'mail', 'extension', 'group', 'credit_card'][sections.indexOf(s)]}</span>
                        {s}
                    </button>
                ))}
            </aside>

            {/* Settings content */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-8">
                <div className="max-w-2xl">
                    <h1 className="text-2xl font-bold text-text-primary dark:text-white mb-1">Account Settings</h1>
                    <p className="text-text-secondary dark:text-slate-400 text-sm mb-8">Manage your account information and preferences</p>

                    {/* Profile section */}
                    <div className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 mb-6">
                        <h2 className="font-bold text-text-primary dark:text-white mb-5">Profile Information</h2>
                        <div className="flex items-center gap-5 mb-6">
                            <div className="relative">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdWExAtMhOTeaXTwi6lyzDivSz4t2boFJG50MoawpyMxwvixoKyBHRrMNtU77s38b3oB4cad64GnBpR0vrT90Bb0YWFXILTS2fByKXhKKU39et859OR1XfGQRnwsaYjsX5NikLLhnpfEoFs-ufWPKIC8h4F1rflOtGmgzNJTNAkuwGVtEr8PU4IcZViCp8DRA186YxR7dUdejfJNUIyZxNncrQ7Tg8DCNSNB11jSCcJ3a3VEaxN5hpWSWsQHz--9ZrJH3RphuEg5A" alt="Avatar" className="size-20 rounded-full object-cover border-2 border-primary/20" />
                                <button className="absolute -bottom-1 -right-1 size-7 bg-primary rounded-full flex items-center justify-center text-white shadow-md">
                                    <span className="material-symbols-outlined text-[14px]">edit</span>
                                </button>
                            </div>
                            <div>
                                <p className="font-bold text-text-primary dark:text-white text-lg">Alex Morgan</p>
                                <p className="text-text-secondary dark:text-slate-400 text-sm">SDR Lead · alex@salesai.com</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[['First Name', 'Alex'], ['Last Name', 'Morgan'], ['Email', 'alex@salesai.com'], ['Phone', '+1 (555) 234-5678']].map(([label, value]) => (
                                <div key={label}>
                                    <label className="block text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider mb-1.5">{label}</label>
                                    <input defaultValue={value} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-text-primary dark:text-white focus:ring-2 focus:ring-primary/30 outline-none" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 mb-6">
                        <h2 className="font-bold text-text-primary dark:text-white mb-5">Preferences</h2>
                        {[
                            { label: 'Email Notifications', desc: 'Receive email updates for new signals', defaultOn: true },
                            { label: 'AI Suggestions', desc: 'Show AI-generated email drafts in inbox', defaultOn: true },
                            { label: 'Weekly Digest', desc: 'Receive a weekly performance summary', defaultOn: false },
                            { label: 'Buying Signal Alerts', desc: 'Get notified for high-intent signals', defaultOn: true },
                        ].map((pref) => (
                            <label key={pref.label} className="flex items-center justify-between py-3 border-b border-slate-50 dark:border-slate-800 last:border-0 cursor-pointer group">
                                <div>
                                    <p className="text-sm font-semibold text-text-primary dark:text-white group-hover:text-primary transition-colors">{pref.label}</p>
                                    <p className="text-xs text-text-secondary dark:text-slate-400">{pref.desc}</p>
                                </div>
                                <div className={`relative w-11 h-6 rounded-full transition-colors ${pref.defaultOn ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}>
                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${pref.defaultOn ? 'right-1' : 'left-1'}`} />
                                </div>
                            </label>
                        ))}
                    </div>

                    <div className="flex gap-3">
                        <button className="flex-1 py-2.5 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary-hover transition-colors shadow-md">Save Changes</button>
                        <button className="py-2.5 px-5 rounded-lg border border-slate-200 dark:border-slate-700 text-text-secondary dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
