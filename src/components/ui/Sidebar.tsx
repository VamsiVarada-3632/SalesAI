'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { navSections } from '@/lib/navigation';
import { getUsers, User } from '@/lib/api';
import clsx from 'clsx';

export default function Sidebar() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        setMounted(true);
        getUsers().then((users) => {
            if (users.length > 0) setCurrentUser(users[0]);
        }).catch(() => null);
    }, []);

    return (
        <aside className="flex w-64 flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-full flex-shrink-0">
            {/* Brand */}
            <div className="flex items-center gap-3 p-6 border-b border-slate-100 dark:border-slate-800">
                <div className="bg-primary/10 rounded-lg p-2">
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: 28 }}>auto_awesome</span>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-none tracking-tight">SalesAI</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">SDR Platform</p>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-1 px-4 mt-4 flex-1 overflow-y-auto no-scrollbar pb-4">
                {navSections.map((section, si) => (
                    <div key={si} className={si > 0 ? 'mt-4' : ''}>
                        {section.title && (
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-3 mb-2">
                                {section.title}
                            </p>
                        )}
                        {section.items.map((item) => {
                            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={clsx(
                                        'flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors text-sm',
                                        isActive
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                    )}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: 22 }}>{item.icon}</span>
                                    <span className="flex-1">{item.label}</span>
                                    {item.badge !== undefined && (
                                        <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </nav>

            {/* Bottom: theme toggle + settings + user */}
            <div className="px-4 pb-4 mt-auto flex flex-col gap-2">
                {mounted && (
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors font-medium text-sm w-full"
                        aria-label="Toggle dark mode"
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
                            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                        </span>
                        <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                )}

                <Link
                    href="/settings"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors font-medium text-sm"
                >
                    <span className="material-symbols-outlined" style={{ fontSize: 22 }}>settings</span>
                    <span>Settings</span>
                </Link>

                <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                        {currentUser ? currentUser.name.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                            {currentUser ? currentUser.name : 'No users yet'}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {currentUser ? currentUser.email : 'Add a user via API'}
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
