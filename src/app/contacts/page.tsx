import PageHeader from '@/components/ui/PageHeader';

const contacts = [
    { name: 'Sarah Jenkins', company: 'Acme Corp', role: 'VP Sales', score: 85, status: 'Interested', lastContact: '2d ago', email: 's.jenkins@acmecorp.com', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDddHGjL1D2Xa24ru5hKt7M1m0d0D2Ew5n1Ph3HBjoFPUx1YqrR6IK3NoTfm5mqeFquzD7UeYtwetbzhDcWfRm1JLZEfdzhS3t3Rg5zgPCl4NDAiL4lg3al7S0hoc4vkLEe1LCTUqEn1jol09Oj300hI07qF4p9aH9t_7oRmidju0NQO5qzlrmsXythqKJ3HBq2R49Fs1Q4gxqiSRR4AQHIsqMg-4hO289zeupI_KiWBJWMcpUIFPVIRxgKp5BJXT4OvBcFV9nuD0I' },
    { name: 'Mike Ross', company: 'Pearson & Co', role: 'VP Sales', score: 72, status: 'Engaged', lastContact: '5h ago', email: 'm.ross@pearson.com', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHlFraENG47EfXX0NAS_0jv6sBjUUXdMThQqgXJ09oTCgQfeLb1ur95jIej-C3AkLb13afgynVOGe9askKW2Y6uxC2SiL-hBCV50AxTT848aiVF4gnW2qZ8AcHiKquWZip1Rn_cAai439n12trWa4CVAbfwp_WHfLhA_9EHEcdgBA8a7UyIpcrH_PQ0fBhUpQlOa3eJzA2MaQZdBDJKnlyFIGXtHIlYlJKikpiu27l97U5gggzEGGGj-d16W9sfb0TZG1p2sppuCE' },
    { name: 'Harvey Specter', company: 'PSL Partners', role: 'Senior Partner', score: 45, status: 'Cold', lastContact: '2w ago', email: 'h.specter@psl.com', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcus6rmTnSkDCOVxDNlrI3wViY1NIPfqtg_GpVBUDsAlVFRicd-rx0QZrxKTQxBjZ7mAy-UY8yFQyr7B4JJFim1V0U_AMqIyg1FY1mM3PqTqCWUT2mUOFREWohBl2b6ScD20TdxOPCdPLBqX203X-WaAlWDfuQ3K7HR-2p_ecSYofmgNDA7DGXjQ8hj5sO92fw3UcQsIuaI8eKnZySfzPstaNdJU-o0leffDoDlSNdGP0vqeMTfyCJ2wrCsNvljZGY0JeIEDOqfdI' },
    { name: 'Jessica Pearson', company: 'PSL Partners', role: 'Managing Partner', score: 60, status: 'Nurturing', lastContact: '3d ago', email: 'j.pearson@psl.com', avatar: null, initials: 'JP' },
    { name: 'Donna Paulsen', company: 'PSL Partners', role: 'COO', score: 68, status: 'Engaged', lastContact: '1d ago', email: 'd.paulsen@psl.com', avatar: null, initials: 'DP' },
];

const statusConfig: Record<string, string> = {
    Interested: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
    Engaged: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    Cold: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
    Nurturing: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
};

export default function ContactsPage() {
    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <PageHeader
                title="Contacts & Lead Management"
                subtitle="Your full contact database with AI enrichment"
                actions={
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold text-text-primary dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>upload</span> Import
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span> Add Contact
                        </button>
                    </div>
                }
            />

            <div className="flex-1 overflow-y-auto no-scrollbar p-8">
                <div className="max-w-7xl mx-auto flex flex-col gap-6">
                    {/* Search + filters */}
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative flex-1 max-w-sm">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">search</span>
                            <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-text-primary dark:text-white focus:ring-2 focus:ring-primary outline-none" placeholder="Search contacts..." />
                        </div>
                        <select className="px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-text-primary dark:text-white focus:ring-2 focus:ring-primary outline-none">
                            <option>All Statuses</option>
                            <option>Interested</option>
                            <option>Engaged</option>
                            <option>Cold</option>
                        </select>
                        <select className="px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-text-primary dark:text-white focus:ring-2 focus:ring-primary outline-none">
                            <option>All Companies</option>
                        </select>
                    </div>

                    {/* Contacts table */}
                    <div className="bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800 text-text-secondary dark:text-slate-400 text-left">
                                    <th className="px-5 py-3.5 font-semibold">Contact</th>
                                    <th className="px-5 py-3.5 font-semibold">Status</th>
                                    <th className="px-5 py-3.5 font-semibold">Intent Score</th>
                                    <th className="px-5 py-3.5 font-semibold">Last Contact</th>
                                    <th className="px-5 py-3.5 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((c) => (
                                    <tr key={c.name} className="border-b border-slate-50 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm overflow-hidden shrink-0">
                                                    {c.avatar ? <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" /> : (c as any).initials}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-text-primary dark:text-white">{c.name}</p>
                                                    <p className="text-xs text-text-secondary dark:text-slate-400">{c.role} · {c.company}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusConfig[c.status]}`}>{c.status}</span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${c.score >= 75 ? 'bg-emerald-500' : c.score >= 55 ? 'bg-amber-400' : 'bg-slate-400'}`} style={{ width: `${c.score}%` }} />
                                                </div>
                                                <span className="text-xs font-bold text-text-primary dark:text-white">{c.score}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-text-secondary dark:text-slate-400 text-xs">{c.lastContact}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-[18px]">mail</span></button>
                                                <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-emerald-500 transition-colors"><span className="material-symbols-outlined text-[18px]">call</span></button>
                                                <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-[#0077b5] transition-colors"><span className="material-symbols-outlined text-[18px]">public</span></button>
                                                <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 transition-colors"><span className="material-symbols-outlined text-[18px]">more_horiz</span></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-text-secondary dark:text-slate-500">
                            <span>Showing 5 of 248 contacts</span>
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-text-primary dark:text-slate-300">Prev</button>
                                <button className="px-3 py-1.5 rounded bg-primary text-white font-bold">1</button>
                                <button className="px-3 py-1.5 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-text-primary dark:text-slate-300">2</button>
                                <button className="px-3 py-1.5 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-text-primary dark:text-slate-300">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
