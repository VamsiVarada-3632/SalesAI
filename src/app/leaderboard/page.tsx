import PageHeader from '@/components/ui/PageHeader';

const leaders = [
    { rank: 1, name: 'Jordan Anderson', role: 'Senior SDR', avatar: null, initials: 'JA', meetings: 24, revenue: '$312K', openRate: '68%', badge: '🏆 Top Performer' },
    { rank: 2, name: 'Casey Brown', role: 'SDR', avatar: null, initials: 'CB', meetings: 21, revenue: '$278K', openRate: '64%', badge: null },
    { rank: 3, name: 'Alex Morgan', role: 'SDR Lead', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdWExAtMhOTeaXTwi6lyzDivSz4t2boFJG50MoawpyMxwvixoKyBHRrMNtU77s38b3oB4cad64GnBpR0vrT90Bb0YWFXILTS2fByKXhKKU39et859OR1XfGQRnwsaYjsX5NikLLhnpfEoFs-ufWPKIC8h4F1rflOtGmgzNJTNAkuwGVtEr8PU4IcZViCp8DRA186YxR7dUdejfJNUIyZxNncrQ7Tg8DCNSNB11jSCcJ3a3VEaxN5hpWSWsQHz--9ZrJH3RphuEg5A', initials: 'AM', meetings: 18, revenue: '$234K', openRate: '59%', badge: 'You' },
    { rank: 4, name: 'Morgan Chen', role: 'SDR', avatar: null, initials: 'MC', meetings: 16, revenue: '$208K', openRate: '55%', badge: null },
    { rank: 5, name: 'Riley Johnson', role: 'SDR', avatar: null, initials: 'RJ', meetings: 14, revenue: '$189K', openRate: '51%', badge: null },
];

const teamMetrics = [
    { label: 'Team Total Revenue', value: '$1.22M', trend: '+23%' },
    { label: 'Avg Open Rate', value: '59%', trend: '+6%' },
    { label: 'Total Meetings', value: '93', trend: '+12%' },
    { label: 'Quota Attainment', value: '87%', trend: '+3%' },
];

export default function LeaderboardPage() {
    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <PageHeader
                title="Sales Team Leaderboard"
                subtitle="Current Quarter Performance — Q4 2023"
                actions={
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>download</span> Export Report
                    </button>
                }
            />

            <div className="flex-1 overflow-y-auto no-scrollbar p-8">
                <div className="max-w-5xl mx-auto flex flex-col gap-8">
                    {/* Team metrics */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {teamMetrics.map((m) => (
                            <div key={m.label} className="bg-white dark:bg-surface-card rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <p className="text-text-secondary dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">{m.label}</p>
                                <h3 className="text-2xl font-bold text-text-primary dark:text-white">{m.value}</h3>
                                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 mt-1">
                                    <span className="material-symbols-outlined" style={{ fontSize: 12 }}>arrow_upward</span>{m.trend}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Top 3 podium */}
                    <div className="grid grid-cols-3 gap-4">
                        {[leaders[1], leaders[0], leaders[2]].map((l, i) => (
                            <div key={l.name} className={`bg-white dark:bg-surface-card border rounded-xl p-6 text-center relative ${i === 1 ? 'border-primary/40 shadow-lg shadow-primary/10 -mt-4' : 'border-slate-200 dark:border-slate-800'}`}>
                                {i === 1 && <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl">👑</div>}
                                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 text-xl font-bold text-primary overflow-hidden">
                                    {l.avatar ? <img src={l.avatar} alt={l.name} className="w-full h-full object-cover" /> : l.initials}
                                </div>
                                <p className="font-bold text-text-primary dark:text-white">{l.name}</p>
                                <p className="text-xs text-text-secondary dark:text-slate-400 mb-3">{l.role}</p>
                                <div className={`text-3xl font-extrabold mb-1 ${['text-slate-400', 'text-yellow-500', 'text-amber-700'][i]}`}>#{[2, 1, 3][i]}</div>
                                <p className="text-sm font-bold text-primary">{l.revenue}</p>
                            </div>
                        ))}
                    </div>

                    {/* Full table */}
                    <div className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                            <h3 className="font-bold text-text-primary dark:text-white">Full Rankings</h3>
                        </div>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-slate-800 text-text-secondary dark:text-slate-400 text-left">
                                    <th className="px-6 py-3 font-semibold">Rank</th>
                                    <th className="px-6 py-3 font-semibold">Rep</th>
                                    <th className="px-6 py-3 font-semibold">Meetings</th>
                                    <th className="px-6 py-3 font-semibold">Revenue</th>
                                    <th className="px-6 py-3 font-semibold">Open Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaders.map((l) => (
                                    <tr key={l.rank} className={`border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${l.badge === 'You' ? 'bg-primary/5' : ''}`}>
                                        <td className="px-6 py-4 font-bold text-text-primary dark:text-white">
                                            {l.rank <= 3 ? ['🥇', '🥈', '🥉'][l.rank - 1] : `#${l.rank}`}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs overflow-hidden">
                                                    {l.avatar ? <img src={l.avatar} alt={l.name} className="w-full h-full object-cover" /> : l.initials}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-text-primary dark:text-white">{l.name}</p>
                                                    <p className="text-xs text-text-secondary dark:text-slate-400">{l.role}</p>
                                                </div>
                                                {l.badge && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{l.badge}</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-text-primary dark:text-slate-300 font-medium">{l.meetings}</td>
                                        <td className="px-6 py-4 text-text-primary dark:text-slate-300 font-medium">{l.revenue}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-primary h-full rounded-full" style={{ width: l.openRate }} />
                                                </div>
                                                <span className="text-xs font-medium text-text-primary dark:text-slate-300">{l.openRate}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
