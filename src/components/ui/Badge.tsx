import clsx from 'clsx';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'amber' | 'purple' | 'default';
    size?: 'xs' | 'sm';
    className?: string;
}

const variantStyles: Record<string, string> = {
    primary: 'bg-primary/10 text-primary border border-primary/20 dark:bg-primary/20',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-amber-50 text-amber-700 border border-amber-100 dark:bg-amber-900/30 dark:text-amber-400',
    danger: 'bg-red-50 text-red-700 border border-red-100 dark:bg-red-400/10 dark:text-red-400',
    amber: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400',
    purple: 'bg-purple-50 text-purple-700 border border-purple-100 dark:bg-purple-900/30 dark:text-purple-300',
    default: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
};

export default function Badge({ children, variant = 'default', size = 'xs', className }: BadgeProps) {
    return (
        <span
            className={clsx(
                'inline-flex items-center gap-1 font-bold rounded-full',
                size === 'xs' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs',
                variantStyles[variant],
                className
            )}
        >
            {children}
        </span>
    );
}
