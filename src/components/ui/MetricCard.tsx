interface MetricCardProps {
    label: string;
    value: string;
    trend?: string;
    trendDirection?: 'up' | 'down' | 'neutral';
    sparkHeights?: number[];
}

export default function MetricCard({ label, value, trend, trendDirection = 'up', sparkHeights }: MetricCardProps) {
    const heights = sparkHeights ?? [40, 60, 45, 70, 55, 85];
    return (
        <div className="bg-white dark:bg-surface-card rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm group hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start mb-2">
                <p className="text-text-secondary dark:text-slate-400 text-sm font-medium">{label}</p>
                {trend && (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 ${trendDirection === 'up'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : trendDirection === 'down'
                                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800'
                        }`}>
                        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                            {trendDirection === 'up' ? 'arrow_upward' : trendDirection === 'down' ? 'arrow_downward' : 'remove'}
                        </span>
                        {trend}
                    </span>
                )}
            </div>
            <h3 className="text-3xl font-bold text-text-primary dark:text-white mb-4">{value}</h3>
            {/* Sparkline */}
            <div className="h-8 w-full flex items-end gap-1">
                {heights.map((h, i) => (
                    <div
                        key={i}
                        className="flex-1 rounded-t-sm"
                        style={{
                            height: `${h}%`,
                            backgroundColor: `rgba(13,89,242,${0.2 + (i / heights.length) * 0.8})`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
