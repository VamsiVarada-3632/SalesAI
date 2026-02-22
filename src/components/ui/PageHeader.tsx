interface PageHeaderProps {
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
    return (
        <header className="flex-shrink-0 px-8 py-6 bg-surface-light dark:bg-surface-card border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-text-primary dark:text-white tracking-tight">{title}</h2>
                    {subtitle && <p className="text-text-secondary dark:text-slate-400 text-sm mt-1">{subtitle}</p>}
                </div>
                {actions && <div className="flex items-center gap-3">{actions}</div>}
            </div>
        </header>
    );
}
