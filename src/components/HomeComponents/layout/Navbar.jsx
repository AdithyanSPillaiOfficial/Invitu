'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/HomeComponents/ui/Logo';
import { Button } from '@/components/HomeComponents/ui/Button';
import { ArrowRight, Moon, Sun, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [mounted, setMounted] = useState(false); // To prevent hydration mismatch on icons

    const router = useRouter();

    // Handle Scroll & Theme Sync
    useEffect(() => {
        setMounted(true);
        
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);

        // Sync state with the actual class set by layout.tsx script
        if (document.documentElement.classList.contains('dark')) {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    const navLinks = [
        { name: 'Customers', href: '/customers' },
        { name: 'Blogs', href: '/blogs' },
        { name: 'Pricing', href: '/pricing' },
    ];

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
            isScrolled ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 py-3" : "py-5 bg-transparent"
        )}>
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Logo />
                </Link>

                {/* Desktop Links */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-black dark:hover:text-white transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Right Side Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-yellow-400"
                        aria-label="Toggle Theme"
                    >
                        {/* Only show icon after mount to avoid server/client mismatch */}
                        {mounted ? (isDarkMode ? <Sun size={20} /> : <Moon size={20} />) : <div className="w-5 h-5" />} 
                    </button>

                    {/* Organizers Badge */}
                    <div className="hidden lg:flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-full pl-1 pr-3 py-1">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white dark:border-black flex items-center justify-center text-[8px] overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="avatar" />
                                </div>
                            ))}
                        </div>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">1.2k Organizers</span>
                    </div>

                    {/* Auth Buttons */}
                    <Button variant="ghost" size="sm" className="font-semibold text-gray-600 dark:text-gray-300" onClick = {() => router.push("/login")}>
                        Log In
                    </Button>
                    <Button variant="primary" size="pill" className="group flex items-center gap-2 text-white bg-highlight-green hover:bg-[#2a6347]" onClick = {() => router.push("/login?signup=true")}>
                        Join Now
                        <span className="bg-black/20 rounded-full p-1 ml-1 group-hover:translate-x-0.5 transition-transform">
                            <ArrowRight size={12} />
                        </span>
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-gray-900 dark:text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800 p-4 flex flex-col gap-4 shadow-lg">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-base font-medium py-2 text-gray-900 dark:text-white"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex items-center justify-between py-2 border-t border-gray-100 dark:border-gray-800">
                        <span className="text-gray-600 dark:text-gray-300">Appearance</span>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-yellow-400"
                        >
                             {mounted ? (isDarkMode ? <Sun size={20} /> : <Moon size={20} />) : <div className="w-5 h-5" />} 
                        </button>
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                        <Button variant="ghost" className="justify-start text-gray-900 dark:text-white" onClick = {() => router.push("/login")}>Log In</Button>
                        <Button variant="primary" className="justify-center" onClick = {() => router.push("/login?signup=true")}>Join Now</Button>
                    </div>
                </div>
            )}
        </header>
    );
};