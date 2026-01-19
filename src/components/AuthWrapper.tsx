'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { SidebarProvider } from '@/contexts/SidebarContext';
import MainContent from '@/components/MainContent';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname?.startsWith('/login') || 
                       pathname?.startsWith('/signup') || 
                       pathname?.startsWith('/forgot-password');

    if (isAuthPage) {
        return <>{children}</>;
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                <Sidebar />
                <MainContent>
                    {children}
                </MainContent>
            </div>
        </SidebarProvider>
    );
}

