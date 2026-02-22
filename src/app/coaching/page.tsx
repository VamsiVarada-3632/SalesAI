// AI Coaching & Performance Hub
export default function CoachingPage() {
    const coachCards = [
        { title: 'Opening Phrase Optimization', type: 'Email', improvement: '+23% open rate', desc: 'Your best performing emails open with a specific question about the prospect. Use "I noticed [company] recently [event]..." instead of "I hope this email finds you well."', icon: 'email', color: 'text-primary bg-primary/10' },
        { title: 'Call Talk Time', type: 'Call', improvement: '+18% meetings', desc: 'You\'re talking 72% of the time on discovery calls. High-performing reps talk 43% or less. Focus on asking open-ended questions and listening for pain points.', icon: 'call', color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400' },
        { title: 'Follow-up Timing', type: 'Sequence', improvement: '+31% reply rate', desc: 'Send your follow-ups on Tuesday and Wednesday between 8-9 AM in the recipient\'s timezone. Avoid Mondays (too competitive) and Fridays (mentally checked out).', icon: 'schedule', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400' },
        { title: 'Subject Line Length', type: 'Email', improvement: '+12% open rate', desc: 'Your best performing subject lines are 5-7 words. Shorter lines create curiosity. Try using the prospect\'s first name followed by a compelling outcome.', icon: 'mail', color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400' },
    ];

    const weeklyScores = [
        { day: 'Mon', score: 72 }, { day: 'Tue', score: 85 }, { day: 'Wed', score: 78 },
        { day: 'Thu', score: 91 }, { day: 'Fri', score: 68 }, { day: 'Sat', score: 55 }, { day: 'Sun', score: 45 }
    ];

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <header className="flex-shrink-0 px-8 py-6 bg-surface-light dark:bg-surface-card border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-text-primary dark:text-white">AI Coaching Hub</h1>
                        <p className="text-text-secondary dark:text-slate-400 text-sm mt-1">Personalized recommendations to improve your SDR performance</p>
                    </div>
                    <div className="bg-primary/10 rounded-xl px-5 py-3 text-center">
                        <p className="text-3xl font-extrabold text-primary">78</p>
                        <p className="text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider">Overall Score</p>
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto no-scrollbar p-8">
                <div className="max-w-6xl mx-auto flex flex-col gap-8">
                    {/* Weekly progression */}
                    <div className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-bold text-text-primary dark:text-white">Performance Score — This Week</h2>
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full flex items-center gap-1">
                                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_upward</span> +8 pts vs last week
                            </span>
                        </div>
                        <div className="h-32 flex items-end gap-3">
                            {weeklyScores.map((d) => (
                                <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full rounded-t transition-all hover:opacity-80" style={{ height: `${d.score}%`, backgroundColor: d.score >= 80 ? '#0d59f2' : d.score >= 65 ? '#f59e0b' : '#94a3b8' }} />
                                    <span className="text-xs text-text-secondary dark:text-slate-500">{d.day}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skill breakdown */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[{ skill: 'Email Writing', score: 85 }, { skill: 'Call Skills', score: 62 }, { skill: 'Sequencing', score: 88 }, { skill: 'CRM Hygiene', score: 71 }].map((s) => (
                            <div key={s.skill} className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                                <p className="text-text-secondary dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">{s.skill}</p>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full ${s.score >= 80 ? 'bg-emerald-500' : s.score >= 65 ? 'bg-amber-400' : 'bg-primary'}`} style={{ width: `${s.score}%` }} />
                                    </div>
                                    <span className="text-sm font-bold text-text-primary dark:text-white shrink-0">{s.score}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* AI Coaching cards */}
                    <div>
                        <h2 className="font-bold text-text-primary dark:text-white mb-4">AI Recommendations for You</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {coachCards.map((card) => (
                                <div key={card.title} className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:border-primary/30 hover:shadow-md transition-all">
                                    <div className="flex items-start gap-4">
                                        <div className={`size-10 rounded-lg flex items-center justify-center shrink-0 ${card.color}`}>
                                            <span className="material-symbols-outlined text-[20px]">{card.icon}</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-text-primary dark:text-white text-sm">{card.title}</h3>
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{card.type}</span>
                                            </div>
                                            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2">{card.improvement}</p>
                                            <p className="text-sm text-text-secondary dark:text-slate-400 leading-relaxed">{card.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
