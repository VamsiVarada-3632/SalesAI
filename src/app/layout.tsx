import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/ui/Sidebar';
import { ThemeProvider } from '@/components/ui/ThemeProvider';

export const metadata: Metadata = {
    title: 'SalesAI Platform',
    description: 'AI-powered B2B sales intelligence platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased overflow-hidden h-screen">
                <ThemeProvider>
                    <div className="flex h-screen w-full">
                        <Sidebar />
                        <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50 dark:bg-slate-950">
                            {children}
                        </main>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
