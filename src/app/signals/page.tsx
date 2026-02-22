import PageHeader from '@/components/ui/PageHeader';

const signals = [
    {
        id: 1,
        name: 'Sarah Jenkins',
        title: 'VP of Sales',
        company: 'Acme Corp',
        badge: 'High Intent',
        badgeClass: 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10 dark:bg-red-400/10 dark:text-red-400',
        intentColor: 'bg-red-500',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgCPx8nm4Yv0FFYgGTV0Xea44b2Xqcqmq62NmL6ABgWf-gA5PPz6pJzE5lSeA1NloKb-iDcfLSTkKmVQaTGxLKCZjb1CdNKZgmpePQVUvont7iEmffY9SLeCN7E5uK7br4QK-uuv4qyuh7UIjFch2EZoiDEO-hULiVIyQf9bBGBh6-z4-lCFyZ0qBprMMppBlnYO0FyXGCxHCGSRlKmiJqcgk3VA9p5f9qhN1qrf0Vqil2a33eQ0_l94WfAb88qC-oyfUYeAoBzqQ',
        event: { icon: 'visibility', label: 'Visited Enterprise Pricing Page 3 times in the last 24h' },
        time: '2 mins ago',
        ai: { label: 'AI Recommendation', text: 'Sarah is clearly evaluating enterprise options. Mention their recent <strong>Series B funding</strong> and offer a demo of the API integration to address their scaling needs.', aiColor: 'bg-primary/5 border-primary/10 dark:bg-primary/10 dark:border-primary/20', iconBg: 'bg-primary/20 text-primary' },
        cta: 'Generate AI Email',
    },
    {
        id: 2,
        name: 'David Lee',
        title: 'Head of Ops',
        company: 'TechFlow',
        badge: 'Growth Signal',
        badgeClass: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400',
        intentColor: 'bg-amber-400',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvB_uw1yLifBZZQemVcB1gWyIv2qtOw5dYP5RkhETcnxk6eThngoURXrj6HvctuyL1uFBNXsykunUxPmMULMKNj1jKm0-4S44ZbYmLjcEl_CJi012r96ciIN0bg1h-W1aZUjYh8SF5g_Qb1kVp7dZAhsaOJnJWFymmWbrR2QDDxBOPTQrbnMi5updujktbIwUm27uorYArOxM09Lfr2cjlLM1DZA_V1REp_VvkaN2v1XZtBHOtt2GW2mLJjqjYiydpqZ8PVXoZiOI',
        event: { icon: 'trending_up', label: 'Company hired 5 new SDRs this week' },
        time: '1 hour ago',
        ai: { label: 'Strategy', text: 'They are growing the sales team rapidly. Pitch our <strong>seat-based scaling pricing</strong> and emphasize the easy onboarding features for new hires.', aiColor: 'bg-slate-50 border-slate-100 dark:bg-slate-700/30 dark:border-slate-700', iconBg: 'bg-white text-amber-500 shadow-sm dark:bg-slate-800' },
        cta: 'Generate AI Email',
    },
    {
        id: 3,
        name: 'Elena Rodriguez',
        title: 'Director of Marketing',
        company: 'Globex Corp',
        badge: 'Job Change',
        badgeClass: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-400',
        intentColor: 'bg-emerald-500',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3W5fFyfpFGJlG4SqQEpKk5TGEpwByPAUobECtGn6CcPK4jIhLswHHaC29gsoHzc2UuVW8r0npPKUZR4bZkX9NScw-eLM2VsylMWlVZa729dSFH4J3S0gwPSr-QzhH2TojrnySq_RMYonrMwfVuGVGEscl6eNWY9PxcR_yrdTowoCGJUf32nLlxueugrx48j0zYJh4V9KraNpZf9gc6f_JeoHcy5-0LzLrbhACCN7H8aFJDQKCmRsFjUD1BLJKNRAH8tVdrY6xq5k',
        event: { icon: 'workspace_premium', label: 'Promoted to VP of Marketing' },
        time: '3 hours ago',
        ai: { label: 'Context', text: 'New leadership often means new budget allocation. Congratulate her on the promotion and suggest a review of their current marketing stack efficiency.', aiColor: 'bg-slate-50 border-slate-100 dark:bg-slate-700/30 dark:border-slate-700', iconBg: 'bg-white text-emerald-600 shadow-sm dark:bg-slate-800' },
        cta: 'Generate AI Email',
    },
];

export default function SignalsPage() {
    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <header className="sticky top-0 z-20 flex flex-col gap-4 border-b border-slate-200 bg-white/80 px-6 py-5 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Buying Signals</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Real-time intent data and AI-recommended actions for your leads.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="inline-flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-primary dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700">
                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>tune</span>
                            Configure
                        </button>
                        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 transition-all active:scale-95">
                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>refresh</span>
                            Refresh Feed
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
                    {['Signal Type: All', 'Score: High Intent', 'Date: Today'].map((f) => (
                        <button key={f} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-600 hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 whitespace-nowrap">
                            {f}
                            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>expand_more</span>
                        </button>
                    ))}
                    <button className="text-xs font-semibold text-primary hover:underline whitespace-nowrap">Clear all filters</button>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-background-dark p-6">
                <div className="mx-auto max-w-4xl space-y-6">
                    {signals.map((s) => (
                        <div key={s.id} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:border-primary/50 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
                            <div className={`absolute top-0 left-0 h-full w-1 ${s.intentColor}`} />
                            <div className="p-5">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="flex gap-4">
                                        <div className="relative">
                                            <div className="h-12 w-12 rounded-full bg-center bg-cover ring-2 ring-white dark:ring-slate-800" style={{ backgroundImage: `url('${s.avatar}')` }} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-slate-900 dark:text-white">{s.name}</h3>
                                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${s.badgeClass}`}>{s.badge}</span>
                                            </div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{s.title} at <span className="font-medium text-slate-700 dark:text-slate-300">{s.company}</span></p>
                                            <div className="mt-2 flex items-start gap-2">
                                                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontSize: 20 }}>{s.event.icon}</span>
                                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200" dangerouslySetInnerHTML={{ __html: s.event.label }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                                        <span className="text-xs text-slate-400">{s.time}</span>
                                        <div className="flex gap-2">
                                            <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300">
                                                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>close</span>
                                            </button>
                                            <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300">
                                                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>open_in_new</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className={`mt-4 rounded-lg p-4 border ${s.ai.aiColor}`}>
                                    <div className="flex gap-3">
                                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${s.ai.iconBg}`}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>auto_awesome</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">{s.ai.label}</p>
                                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: s.ai.text }} />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-end">
                                        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-blue-600 transition-colors w-full sm:w-auto">
                                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>mail</span>
                                            {s.cta}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Skeleton loader */}
                    <div className="animate-pulse rounded-xl border border-slate-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-800/50">
                        <div className="flex gap-4">
                            <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700" />
                            <div className="flex-1 space-y-3">
                                <div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-700" />
                                <div className="h-3 w-1/4 rounded bg-slate-200 dark:bg-slate-700" />
                                <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-700 mt-2" />
                            </div>
                        </div>
                        <div className="mt-4 h-24 rounded-lg bg-slate-100 dark:bg-slate-700/50" />
                    </div>
                </div>
            </div>
        </div>
    );
}
