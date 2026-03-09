'use client';

import { useEffect, useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import { getUsers, User } from '@/lib/api';

const roleLabels: Record<string, string> = {
    sdr: 'SDR',
    manager: 'Manager',
    admin: 'Admin',
};

export default function TeamPage() {
    const [team, setTeam] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUsers()
            .then(setTeam)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <PageHeader
                title="Sales Team"
                subtitle="View team members, performance, and manage roles"
                actions={
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors shadow-md">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>person_add</span> Invite Member
                    </button>
                }
            />

            <div className="flex-1 overflow-y-auto no-scrollbar p-8">
                <div className="max-w-6xl mx-auto flex flex-col gap-6">
                    {/* Team stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'Team Size', value: loading ? '—' : String(team.length), icon: 'group' },
                            { label: 'SDRs', value: loading ? '—' : String(team.filter(m => m.role === 'sdr').length), icon: 'person' },
                            { label: 'Managers', value: loading ? '—' : String(team.filter(m => m.role === 'manager').length), icon: 'manage_accounts' },
                            { label: 'Admins', value: loading ? '—' : String(team.filter(m => m.role === 'admin').length), icon: 'admin_panel_settings' },
                        ].map((s) => (
                            <div key={s.label} className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
                                <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>{s.icon}</span>
                                <p className="text-xl font-bold text-text-primary dark:text-white mt-2">{s.value}</p>
                                <p className="text-xs text-text-secondary dark:text-slate-400">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Team member cards */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-48 rounded-xl bg-white dark:bg-surface-card border border-slate-200 dark:border-slate-800 animate-pulse" />
                            ))}
                        </div>
                    ) : team.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-text-secondary dark:text-slate-400">
                            <span className="material-symbols-outlined text-5xl mb-3 text-slate-300 dark:text-slate-600">group_add</span>
                            <p className="text-sm font-medium">No team members yet. Invite your first member to get started.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {team.map((member) => (
                                <div key={member.id} className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:border-primary/30 hover:shadow-md transition-all group">
                                    <div className="flex items-start gap-4">
                                        <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg overflow-hidden shrink-0">
                                            {member.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-text-primary dark:text-white truncate">{member.name}</h3>
                                            <p className="text-xs text-text-secondary dark:text-slate-400">{member.email}</p>
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full mt-1.5 inline-block bg-primary/10 text-primary">
                                                {roleLabels[member.role] ?? member.role}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <p className="text-[10px] text-text-secondary dark:text-slate-500 uppercase font-bold tracking-wider">Joined</p>
                                        <p className="text-sm font-medium text-text-primary dark:text-white mt-0.5">
                                            {new Date(member.created_at).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="mt-4 flex gap-2">
                                        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-text-secondary dark:text-slate-300 hover:border-primary hover:text-primary dark:hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-[16px]">bar_chart</span> Stats
                                        </button>
                                        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-text-secondary dark:text-slate-300 hover:border-primary hover:text-primary dark:hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-[16px]">manage_accounts</span> Manage
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
