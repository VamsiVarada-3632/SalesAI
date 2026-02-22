interface ProgressBarProps {
    value: number; // 0–100
    color?: string;
    showLabel?: boolean;
    labelColor?: string;
}

export default function ProgressBar({ value, color = 'bg-primary', showLabel = true, labelColor = 'text-slate-400' }: ProgressBarProps) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex-1 bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className={`${color} h-full rounded-full`} style={{ width: `${value}%` }} />
            </div>
            {showLabel && <span className={`text-xs font-medium ${labelColor}`}>{value}%</span>}
        </div>
    );
}
