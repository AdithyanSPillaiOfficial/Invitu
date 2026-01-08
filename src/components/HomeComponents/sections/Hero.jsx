'use client';

import React from 'react';
import { HeroCanvas } from '@/components/HomeComponents/ui/HeroCanvas';
import { Button } from '@/components/HomeComponents/ui/Button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const SidebarMarquee = () => {
    // 1. Create a larger array to ensure the content is taller than the screen
    const items = ["Invitu", "Invite with ease", "Organize events", "Seamless Invites"];
    
    // 2. Triple the items to ensure there is never a blank space on large screens
    const tripleItems = [...items, ...items, ...items];

    return (
        <div className="hidden md:flex absolute left-0 top-0 bottom-0 w-16 md:w-20 overflow-hidden
            border-r border-gray-100 dark:border-gray-800
            bg-white/50 dark:bg-black/50 backdrop-blur-sm z-10 flex-col">

            <motion.div
                className="flex flex-col gap-12 py-6"
                animate={{ 
                    // Move from 0 to -33.33% because we have 3 sets of items
                    y: [0, "-33.33%"] 
                }}
                transition={{
                    repeat: Infinity,
                    duration: 15,
                    ease: "linear",
                }}
            >
                {tripleItems.map((item, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-center py-4"
                    >
                        <span
                            style={{ writingMode: 'vertical-rl' }}
                            className="text-xs font-medium text-gray-400 dark:text-gray-600
                            rotate-180 whitespace-nowrap tracking-widest uppercase"
                        >
                            {item}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};


export const Hero = () => {
    return (
        <section className="relative min-h-screen w-full flex items-center pt-24 pb-12 overflow-hidden bg-white dark:bg-black transition-colors duration-300">
            {/* Background */}
            <HeroCanvas />

            {/* Sidebar */}
            <SidebarMarquee />

            <div className="container mx-auto px-4 md:px-6 relative z-20 flex flex-col md:pl-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl"
                >
                    {/* UPDATED: Changed text-white to text-gray-900 dark:text-white */}
                    <h1 className="text-5xl md:text-[72px] font-semibold leading-[1.1] md:leading-[1.15] tracking-tight text-gray-900 dark:text-white">
                        Where Events <span className="text-highlight-green inline-flex items-center align-middle">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-16 md:h-16 inline-block mx-2 text-brand-green">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        </span> <br />
                        Begin, and Invites <br />
                        <span className="text-brand-green">Get Made</span> with Invitu
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="mt-8 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed"
                    >
                        <span className="text-brand-green font-medium">Trusted by 360+ organizers</span> — from startup house warming, Wedding, and Birthday to Any Events.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex flex-wrap gap-4 mt-8"
                    >
                        {/* Partner Logos could go here or below */}
                    </motion.div>
                </motion.div>

                {/* Logos Strip */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-16 grayscale opacity-70 hover:opacity-100 transition-opacity duration-500"
                >
                    <div className="flex flex-wrap gap-8 md:gap-12 items-center">
                        {/* Placeholders for logos: EkStep, Launchpad, FAYA:80, H Evolve, IEEE, Elevate, IN50HRS */}
                        {['EkStep', 'Launchpad', 'FAYA:80', 'H Evolve', 'IEEE', 'Elevate', 'IN50HRS'].map((logo) => (
                            <span key={logo} className="text-xl md:text-2xl font-bold font-sans text-gray-400">{logo}</span>
                        ))}
                        {/* Replaced real SVGs with text placeholders for now as I don't have them yet. */}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
