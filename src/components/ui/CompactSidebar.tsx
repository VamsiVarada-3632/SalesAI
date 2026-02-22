'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const compactNav = [
    { href: '/inbox', icon: 'inbox', label: 'Inbox' },
    { href: '/sequences', icon: 'format_list_bulleted', label: 'Seq.' },
    { href: '/analytics', icon: 'analytics', label: 'Data' },
    { href: '/contacts/profile', icon: 'contacts', label: 'CRM' },
];

export default function CompactSidebar() {
    const pathname = usePathname();

    return (
        <nav className="w-20 bg-background-darker border-r border-border-dark flex flex-col items-center py-6 gap-8 shrink-0 z-20">
            {/* Brand */}
            <div className="size-10 rounded-xl bg-gradient-to-br from-primary-dark to-indigo-600 flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-white">smart_toy</span>
            </div>

            {/* Nav Items */}
            <div className="flex flex-col gap-6 w-full px-2">
                {compactNav.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                'group flex flex-col items-center gap-1 w-full p-2 rounded-lg relative transition-colors',
                                isActive
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-slate-400 hover:text-slate-100 hover:bg-surface-dark'
                            )}
                        >
                            {isActive && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-primary rounded-r-full" />
                            )}
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>

            {/* Bottom */}
            <div className="mt-auto flex flex-col gap-6 w-full px-2">
                <Link
                    href="/settings/crm-sync"
                    className="group flex flex-col items-center gap-1 w-full p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-surface-dark transition-colors"
                >
                    <span className="material-symbols-outlined">settings</span>
                </Link>
                <div className="size-10 rounded-full bg-surface-dark border border-border-dark overflow-hidden cursor-pointer mx-auto">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdWExAtMhOTeaXTwi6lyzDivSz4t2boFJG50MoawpyMxwvixoKyBHRrMNtU77s38b3oB4cad64GnBpR0vrT90Bb0YWFXILTS2fByKXhKKU39et859OR1XfGQRnwsaYjsX5NikLLhnpfEoFs-ufWPKIC8h4F1rflOtGmgzNJTNAkuwGVtEr8PU4IcZViCp8DRA186YxR7dUdejfJNUIyZxNncrQ7Tg8DCNSNB11jSCcJ3a3VEaxN5hpWSWsQHz--9ZrJH3RphuEg5A"
                        alt="User"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </nav>
    );
}
