'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/HomeComponents/ui/Card';

const stats = [
    { value: '93%', label: 'Registration goals achieved', sub: 'using Invitu' },
    { value: '60 hrs', label: 'Time saved', sub: 'per event' },
    { value: '2X', label: 'Ticket Sales', sub: 'Increased per event' },
    { value: '34%', label: 'Overall Expense', sub: 'Reduced for recurring events' },
];

export const Impact = () => {
    return (
        <section className="py-24 bg-white dark:bg-black overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold font-display leading-[1.2] text-black dark:text-white">
                        <span className="text-brand-green">93%</span> of Organisers using Invitu hit their Invitation goals. <br className="hidden md:block" />
                        Let's make you one of them.
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            <div className="aspect-square rounded-full border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-zinc-900 flex flex-col items-center justify-center p-6 text-center hover:border-brand-green transition-colors group relative">
                                <div className="absolute inset-0 rounded-full border border-brand-green opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                <span className="text-4xl md:text-5xl font-bold font-display text-brand-green mb-2">{stat.value}</span>
                                <span className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100">{stat.label}</span>
                                <span className="text-xs text-gray-500 mt-1">{stat.sub}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
