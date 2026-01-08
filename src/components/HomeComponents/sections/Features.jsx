'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/HomeComponents/ui/Card';
import { Button } from '@/components/HomeComponents/ui/Button';
import { ArrowRight, Printer, Palette, QrCode, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
    {
        id: 'branding',
        label: 'Event Invitation',
        heading: 'Invite With Ease',
        description: 'Use our user friendly interface to easily create and manage events without any hussle',
        visual: (
            <div className="relative w-full h-64 md:h-80 bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden p-4 flex items-center justify-center">
                <div className="w-48 h-64 bg-white dark:bg-black rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden transform -rotate-6 transition-transform hover:rotate-0">
                    <div className="h-24 bg-brand-green/20 p-2 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-green to-transparent"></div>
                    </div>
                    <div className="p-3">
                        <div className="h-2 w-16 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
                        <div className="h-2 w-24 bg-gray-100 dark:bg-gray-900 rounded"></div>
                    </div>
                    <div className="mt-auto border-t border-dashed border-gray-300 dark:border-gray-700 p-2 flex justify-between items-center">
                        <QrCode size={24} className="text-gray-400" />
                        <div className="h-6 w-6 rounded-full bg-brand-green flex items-center justify-center text-[8px] text-white">✓</div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'management',
        label: 'Management & Insights',
        heading: 'View Guests and Manage Guests',
        description: 'Live dashboards — for invitation creation, checkins and more. Know your event pulse in real-time.',
        visual: (
            <div className="relative w-full h-64 md:h-80 bg-[#0F172A] rounded-2xl overflow-hidden p-6 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-xs text-gray-400 uppercase tracking-wider">Live Analytics</span>
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>

                <div className="flex gap-4 mb-4">
                    <div className="flex-1 bg-white/5 rounded-lg p-3">
                        <div className="text-xs text-gray-400 mb-1">Sales</div>
                        <div className="text-xl font-bold text-white">1,245</div>
                    </div>
                    <div className="flex-1 bg-white/5 rounded-lg p-3">
                        <div className="text-xs text-gray-400 mb-1">Revenue</div>
                        <div className="text-xl font-bold text-brand-green">$12k</div>
                    </div>
                </div>

                <div className="flex-1 flex items-end justify-between gap-2 px-2">
                    {[40, 70, 50, 90, 60, 80, 45].map((h, i) => (
                        <div
                            key={i}
                            style={{ height: `${h}%` }}
                            className="w-full bg-brand-green/30 rounded-t-sm hover:bg-brand-green/60 transition-colors"
                        />
                    ))}
                </div>
            </div>
        )
    },
    {
        id: 'personilised',
        label: 'Personalised Tools',
        heading: 'Personalised Invitation for Each Guests',
        description: 'Give Personilised Digital Invitation Cards to All Guests.',
        visual: (
            <div className="relative w-full h-64 md:h-80 bg-orange-50 dark:bg-gray-900 rounded-2xl overflow-hidden p-4 flex items-center justify-center">
                <div className="bg-white dark:bg-black p-4 rounded-xl shadow-xl w-56 transform rotate-3">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                            <img src="https://i.pravatar.cc/100?img=12" alt="" />
                        </div>
                        <div>
                            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded mb-1"></div>
                            <div className="h-2 w-16 bg-gray-100 dark:bg-gray-900 rounded"></div>
                        </div>
                    </div>
                    <div className="h-24 bg-black rounded-lg mb-2 flex items-center justify-center text-white text-xs">
                        Invitation Preview
                    </div>
                </div>

                <div className="absolute bottom-6 right-6 bg-brand-green text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                    <Printer size={12} /> Ready to Print
                </div>
            </div>
        )
    }
];

const Tabs = () => {
    const [activeTab, setActiveTab] = useState(features[0].id);
    const activeFeature = features.find(f => f.id === activeTab) || features[0];

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                {features.map(feature => (
                    <button
                        key={feature.id}
                        onClick={() => setActiveTab(feature.id)}
                        className={cn(
                            "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border",
                            activeTab === feature.id
                                ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-md scale-105"
                                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 dark:bg-transparent dark:text-gray-400 dark:border-gray-800 dark:hover:bg-white/5"
                        )}
                    >
                        {feature.label}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    <Card className="p-2 border-0 shadow-none bg-transparent">
                        {activeFeature.visual}
                    </Card>

                    <div className="flex flex-col justify-center p-4">
                        <h3 className="text-3xl font-bold mb-4 font-display">
                            {activeFeature.heading}
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                            {activeFeature.description}
                        </p>
                        <Button variant="primary" className="gap-2 px-6">
                            Host with us Now <ArrowRight size={16} />
                        </Button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export const Features = () => {
    return (
        <section className="py-24 bg-white dark:bg-black">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
                        Get Started with your <br />
                        <span className="text-brand-green">Favourite Features</span>
                    </h2>
                </div>

                <Tabs />

                {/* Showcase Grid */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {/* Card 1: Automated Generation */}
                    <Card variant="glass" className="md:col-span-1 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-8 flex flex-col justify-between group overflow-hidden relative">
                        <div>
                            <div className="bg-brand-green/10 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                                <Sparkles className="text-brand-green" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-black dark:text-white">Automated Guest Invitation Generation</h3>
                        </div>
                        <div className="mt-8 relative h-32 w-full">
                            {/* Abstract visual */}
                            <div className="absolute inset-x-0 top-0 bg-white dark:bg-black shadow-lg rounded-t-lg h-full border border-gray-100 dark:border-zinc-800 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                <div className="h-2 w-1/2 bg-gray-200 dark:bg-zinc-800 rounded mb-2"></div>
                                <div className="h-2 w-3/4 bg-gray-100 dark:bg-zinc-900 rounded"></div>
                            </div>
                        </div>
                    </Card>

                    {/* Card 2: Live Dashboards */}
                    <Card variant="default" className="md:col-span-1 bg-brand-green/5 dark:bg-brand-green/5 border-brand-green/20">
                        <div>
                            <div className="inline-block px-3 py-1 rounded-full bg-brand-green text-white text-xs font-bold mb-6">Live</div>
                            <h3 className="text-xl font-bold mb-2 text-black dark:text-white">Track Insights</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Real-time data at your fingertips.</p>
                        </div>
                        <div className="mt-8 flex gap-2 items-end h-24">
                            <div className="w-1/4 bg-brand-green/20 h-1/2 rounded-t-sm"></div>
                            <div className="w-1/4 bg-brand-green/40 h-2/3 rounded-t-sm"></div>
                            <div className="w-1/4 bg-brand-green h-full rounded-t-sm"></div>
                            <div className="w-1/4 bg-brand-green/60 h-3/4 rounded-t-sm"></div>
                        </div>
                    </Card>

                    {/* Card 3: No-Code Tool */}
                    <Card variant="dark" className="md:col-span-1 bg-[#1A1A1A] text-white">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-4">Create Jaw Dropping Events</h3>
                            <p className="text-gray-400 text-sm">No-Code. No-Tech. No-Designer Tool.</p>
                        </div>
                        {/* Decorative */}
                        <div className="absolute bottom-0 right-0 p-4 opacity-20 text-brand-green">
                            <Palette size={64} />
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
};
