'use client';

import { useState, useMemo } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Lead {
    name: string;
    company: string;
    industry: string;
    size: string;
    location: string;
    jobTitle: string;
    score: number;
    signal: string;
    signalIcon: string;
    decisionMaker: string;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const ALL_LEADS: Lead[] = [
    { name: 'Sarah Jenkins', company: 'Acme Corp', industry: 'B2B SaaS', size: '500-1k', location: 'San Francisco, CA', jobTitle: 'VP Sales', score: 91, signal: 'Hiring 5 SDRs', signalIcon: 'trending_up', decisionMaker: 'Sarah Jenkins, VP Sales' },
    { name: 'Mike Ross', company: 'Nebular Systems', industry: 'FinTech', size: '50-200', location: 'New York, NY', jobTitle: 'CFO', score: 74, signal: 'Raised $30M Series B', signalIcon: 'monetization_on', decisionMaker: 'Mike Ross, CFO' },
    { name: 'Elena Rodriguez', company: 'Vortex AI', industry: 'AI / ML', size: '10-50', location: 'Austin, TX', jobTitle: 'Director of Sales', score: 88, signal: 'Multiple pricing page visits', signalIcon: 'visibility', decisionMaker: 'Elena Rodriguez, Director' },
    { name: 'Michael King', company: 'Proxima Inc', industry: 'Retail', size: '1k+', location: 'Chicago, IL', jobTitle: 'Head of Ops', score: 55, signal: 'Installed HubSpot recently', signalIcon: 'integration_instructions', decisionMaker: 'Michael King, Head of Ops' },
    { name: 'Priya Sharma', company: 'Horizon Health', industry: 'HealthTech', size: '200-500', location: 'Boston, MA', jobTitle: 'CRO', score: 82, signal: 'Job posting for VP Sales', signalIcon: 'work', decisionMaker: 'Priya Sharma, CRO' },
    { name: 'James Walton', company: 'Apex Logistics', industry: 'Logistics', size: '1k+', location: 'Dallas, TX', jobTitle: 'VP Operations', score: 63, signal: 'Visited case studies 4 times', signalIcon: 'menu_book', decisionMaker: 'James Walton, VP Operations' },
    { name: 'Aisha Thompson', company: 'Finova', industry: 'FinTech', size: '50-200', location: 'Miami, FL', jobTitle: 'CEO', score: 95, signal: 'Downloaded ROI calculator', signalIcon: 'calculate', decisionMaker: 'Aisha Thompson, CEO' },
    { name: 'David Chen', company: 'CloudSpark', industry: 'B2B SaaS', size: '10-50', location: 'Seattle, WA', jobTitle: 'Head of Sales', score: 78, signal: 'Competitor announced pricing hike', signalIcon: 'price_change', decisionMaker: 'David Chen, Head of Sales' },
    { name: 'Laura Becker', company: 'Zenith Retail', industry: 'Retail', size: '200-500', location: 'Los Angeles, CA', jobTitle: 'Director', score: 45, signal: 'Attended our webinar', signalIcon: 'live_tv', decisionMaker: 'Laura Becker, Director' },
    { name: 'Omar Farouk', company: 'DataPulse', industry: 'AI / ML', size: '10-50', location: 'Austin, TX', jobTitle: 'CTO', score: 86, signal: 'Signed up for free trial', signalIcon: 'science', decisionMaker: 'Omar Farouk, CTO' },
    { name: 'Nina Patel', company: 'MedSync', industry: 'HealthTech', size: '50-200', location: 'Boston, MA', jobTitle: 'VP Product', score: 67, signal: 'Raised $10M Seed Round', signalIcon: 'monetization_on', decisionMaker: 'Nina Patel, VP Product' },
    { name: 'Carlos Mendez', company: 'ShiftFlow', industry: 'Logistics', size: '200-500', location: 'Houston, TX', jobTitle: 'COO', score: 41, signal: 'Visited pricing page once', signalIcon: 'visibility', decisionMaker: 'Carlos Mendez, COO' },
    { name: 'Rachel Kim', company: 'Orbit SaaS', industry: 'B2B SaaS', size: '500-1k', location: 'San Francisco, CA', jobTitle: 'VP Sales', score: 93, signal: 'Hiring 3 AEs + 2 SDRs', signalIcon: 'trending_up', decisionMaker: 'Rachel Kim, VP Sales' },
    { name: 'Tom Fischer', company: 'NeuralEdge', industry: 'AI / ML', size: '10-50', location: 'New York, NY', jobTitle: 'CEO', score: 79, signal: 'Featured in TechCrunch article', signalIcon: 'article', decisionMaker: 'Tom Fischer, CEO' },
    { name: 'Anita Voss', company: 'PayLedger', industry: 'FinTech', size: '500-1k', location: 'Chicago, IL', jobTitle: 'Head of Revenue', score: 84, signal: 'Raised $50M Series C', signalIcon: 'monetization_on', decisionMaker: 'Anita Voss, Head of Revenue' },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
const INDUSTRIES = ['All Industries', ...Array.from(new Set(ALL_LEADS.map(l => l.industry)))];
const SIZES = ['All Sizes', ...Array.from(new Set(ALL_LEADS.map(l => l.size)))];
const LOCATIONS = ['All Locations', ...Array.from(new Set(ALL_LEADS.map(l => l.location)))];
const JOB_TITLES = ['All Titles', ...Array.from(new Set(ALL_LEADS.map(l => l.jobTitle)))];
const SIGNAL_TABS = ['All Signals', 'High Intent Only', 'Website Visits', 'Hiring Surges', 'Funding News'];

function scoreBadge(score: number) {
    if (score > 80) return { label: 'Hot', classes: 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800' };
    if (score >= 50) return { label: 'Warm', classes: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800' };
    return { label: 'Cold', classes: 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700' };
}

function scoreTextColor(score: number) {
    if (score > 80) return 'text-red-600 dark:text-red-400';
    if (score >= 50) return 'text-amber-600 dark:text-amber-400';
    return 'text-slate-500 dark:text-slate-400';
}

// ─── Select component ─────────────────────────────────────────────────────────
function FilterSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
    return (
        <select
            value={value}
            onChange={e => onChange(e.target.value)}
            className="h-9 px-3 pr-8 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
        >
            {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProspectingPage() {
    const [search, setSearch] = useState('');
    const [industry, setIndustry] = useState('All Industries');
    const [size, setSize] = useState('All Sizes');
    const [location, setLocation] = useState('All Locations');
    const [jobTitle, setJobTitle] = useState('All Titles');
    const [activeTab, setActiveTab] = useState('All Signals');
    const [addedLeads, setAddedLeads] = useState<Set<string>>(new Set());
    const [showFilters, setShowFilters] = useState(false);

    const filtered = useMemo(() => {
        return ALL_LEADS.filter(l => {
            const q = search.toLowerCase();
            const matchSearch = !q || l.name.toLowerCase().includes(q) || l.company.toLowerCase().includes(q);
            const matchIndustry = industry === 'All Industries' || l.industry === industry;
            const matchSize = size === 'All Sizes' || l.size === size;
            const matchLoc = location === 'All Locations' || l.location === location;
            const matchTitle = jobTitle === 'All Titles' || l.jobTitle === jobTitle;
            const matchTab = activeTab === 'All Signals' || (
                activeTab === 'High Intent Only' ? l.score >= 80 :
                    activeTab === 'Website Visits' ? ['visibility', 'menu_book'].includes(l.signalIcon) :
                        activeTab === 'Hiring Surges' ? l.signalIcon === 'trending_up' :
                            activeTab === 'Funding News' ? l.signalIcon === 'monetization_on' : true
            );
            return matchSearch && matchIndustry && matchSize && matchLoc && matchTitle && matchTab;
        });
    }, [search, industry, size, location, jobTitle, activeTab]);

    const handleAddToSequence = (lead: Lead) => {
        console.log('[Sequence] Adding lead:', { name: lead.name, company: lead.company, score: lead.score, jobTitle: lead.jobTitle });
        setAddedLeads(prev => new Set(prev).add(lead.company));
    };

    return (
        <div className="flex-1 flex h-full overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">

                {/* ── Header ── */}
                <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 px-6 py-5 flex items-center justify-between sticky top-0 z-10">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI Prospecting Engine</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
                            {filtered.length} of {ALL_LEADS.length} opportunities shown
                        </p>
                    </div>
                    <div className="flex gap-3 items-center">
                        {/* Search */}
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" style={{ fontSize: 18 }}>search</span>
                            <input
                                type="text"
                                placeholder="Search by name or company…"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="h-9 pl-9 pr-4 w-64 text-sm rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(f => !f)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${showFilters ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>filter_list</span> Filters
                        </button>
                        <button
                            onClick={() => { setSearch(''); setIndustry('All Industries'); setSize('All Sizes'); setLocation('All Locations'); setJobTitle('All Titles'); setActiveTab('All Signals'); }}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors shadow-md"
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>refresh</span> Refresh Feed
                        </button>
                    </div>
                </header>

                {/* ── Advanced Filters (collapsible) ── */}
                {showFilters && (
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-wrap items-center gap-3">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Filter by:</span>
                        <FilterSelect value={industry} onChange={setIndustry} options={INDUSTRIES} />
                        <FilterSelect value={size} onChange={setSize} options={SIZES} />
                        <FilterSelect value={location} onChange={setLocation} options={LOCATIONS} />
                        <FilterSelect value={jobTitle} onChange={setJobTitle} options={JOB_TITLES} />
                        {(industry !== 'All Industries' || size !== 'All Sizes' || location !== 'All Locations' || jobTitle !== 'All Titles') && (
                            <button
                                onClick={() => { setIndustry('All Industries'); setSize('All Sizes'); setLocation('All Locations'); setJobTitle('All Titles'); }}
                                className="text-xs text-primary font-semibold hover:underline"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                )}

                {/* ── Signal Tab Bar ── */}
                <div className="px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-white dark:bg-slate-900 overflow-x-auto no-scrollbar">
                    {SIGNAL_TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeTab === tab ? 'bg-primary text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* ── Lead Cards ── */}
                <div className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-slate-950">
                    <div className="max-w-5xl mx-auto flex flex-col gap-4">
                        {filtered.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <span className="material-symbols-outlined text-slate-300 dark:text-slate-700" style={{ fontSize: 56 }}>search_off</span>
                                <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium">No leads match your search or filters.</p>
                                <button onClick={() => { setSearch(''); setIndustry('All Industries'); setSize('All Sizes'); setLocation('All Locations'); setJobTitle('All Titles'); setActiveTab('All Signals'); }} className="mt-3 text-sm text-primary font-semibold hover:underline">Clear all filters</button>
                            </div>
                        ) : filtered.map((lead) => {
                            const badge = scoreBadge(lead.score);
                            const isAdded = addedLeads.has(lead.company);
                            return (
                                <div key={lead.company} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/40 dark:hover:border-primary/40 rounded-xl p-5 transition-all hover:shadow-md shadow-sm">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Company Info */}
                                        <div className="flex flex-col gap-3 md:w-52">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                                                    {lead.company[0]}
                                                </div>
                                                <div>
                                                    <h3 className="text-slate-900 dark:text-white font-bold leading-tight">{lead.company}</h3>
                                                    <div className={`flex items-center gap-1.5 mt-0.5`}>
                                                        <span className={`text-xs font-bold ${scoreTextColor(lead.score)}`}>{lead.score}/100</span>
                                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${badge.classes}`}>{badge.label}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-1 flex-wrap">
                                                <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded">{lead.industry}</span>
                                                <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded">{lead.size} Emp</span>
                                                <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded">{lead.location}</span>
                                            </div>
                                        </div>

                                        {/* Signal */}
                                        <div className="flex-1 flex flex-col justify-center border-l border-slate-100 dark:border-slate-800 pl-6">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400" style={{ fontSize: 20 }}>{lead.signalIcon}</span>
                                                <span className="text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wide">Intent Signal</span>
                                            </div>
                                            <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-relaxed">{lead.signal}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                                                <span className="text-slate-600 dark:text-slate-300 font-medium">Decision Maker:</span> {lead.decisionMaker}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                                <span className="text-slate-600 dark:text-slate-300 font-medium">Title:</span> {lead.jobTitle}
                                            </p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-col gap-2 md:w-44 justify-center">
                                            <button className="flex items-center justify-center gap-2 w-full h-10 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-lg transition-colors shadow-sm">
                                                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                                                Generate Email
                                            </button>
                                            <button
                                                onClick={() => handleAddToSequence(lead)}
                                                disabled={isAdded}
                                                className={`flex items-center justify-center gap-1.5 w-full h-10 border text-sm font-medium rounded-lg transition-colors ${isAdded ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 cursor-default' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
                                            >
                                                <span className="material-symbols-outlined text-[16px]">{isAdded ? 'check_circle' : 'playlist_add'}</span>
                                                {isAdded ? 'Added' : 'Add to Sequence'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {filtered.length > 0 && (
                            <div className="flex justify-center mt-2">
                                <p className="text-slate-400 text-sm font-semibold">
                                    Showing all {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
