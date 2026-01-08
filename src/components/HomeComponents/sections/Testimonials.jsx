'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
    { id: 1, name: 'Abhishek', role: 'Event Organizer', img: 'https://i.pravatar.cc/150?img=11', audio: '/audio/sample1.mp3' },
    { id: 2, name: 'Sarah', role: 'Community Manager', img: 'https://i.pravatar.cc/150?img=5', audio: '/audio/sample2.mp3' },
    { id: 3, name: 'David', role: 'Tech Lead', img: 'https://i.pravatar.cc/150?img=3', audio: '/audio/sample3.mp3' },
    { id: 4, name: 'Priya', role: 'Marketing Head', img: 'https://i.pravatar.cc/150?img=9', audio: '/audio/sample4.mp3' },
    { id: 5, name: 'James', role: 'Founder', img: 'https://i.pravatar.cc/150?img=13', audio: '/audio/sample5.mp3' },
];

export const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(2); // Center item initially
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Prevent hydration mismatch by detecting when component is mounted on client
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const activeTestimonial = testimonials[activeIndex];

    return (
        <section className="py-24 bg-white dark:bg-black border-t border-b border-gray-100 dark:border-gray-900">
            <div className="container mx-auto px-4 text-center mb-12">
                <h2 className="text-3xl font-bold font-display">Listen to what our Latest Clients say</h2>
                <p className="text-gray-500 mt-2">the art (and science) of events.</p>
            </div>

            {/* Carousel Wrapper */}
            <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center gap-4 md:gap-8 overflow-hidden px-4 py-8">
                {testimonials.map((t, i) => {
                    const isCenter = i === activeIndex;
                    const dist = Math.abs(i - activeIndex);
                    // Simple visual limitation to 5 items centered
                    if (dist > 2) return null;

                    return (
                        <motion.div
                            key={t.id}
                            className={cn(
                                "rounded-full overflow-hidden transition-all duration-500 cursor-pointer relative",
                                isCenter ? "w-32 h-32 md:w-40 md:h-40 border-4 border-brand-green shadow-xl z-10" : "w-16 h-16 md:w-20 md:h-20 grayscale brightness-75 opacity-60 hover:opacity-100 hover:grayscale-0"
                            )}
                            onClick={() => {
                                setActiveIndex(i);
                                setIsPlaying(false);
                            }}
                            layout
                        >
                            <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                            {isCenter && (
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                    <button
                                        className="bg-brand-green text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsPlaying(!isPlaying);
                                        }}
                                    >
                                        {isPlaying ? <Pause fill="currentColor" size={20} /> : <Play fill="currentColor" size={20} className="ml-1" />}
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Audio Details */}
            <div className="text-center mt-8 max-w-md mx-auto">
                <h3 className="text-xl font-bold">{activeTestimonial.name}</h3>
                <p className="text-sm text-brand-green font-medium">{activeTestimonial.role}</p>

                {/* Visual Waveform */}
                <div className="mt-6 flex items-center justify-center gap-1 h-12">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "w-1 bg-gray-300 dark:bg-gray-700 rounded-full transition-all duration-300",
                                isPlaying ? "animate-pulse" : ""
                            )}
                            style={{
                                // Use static initial values during SSR/Hydration to avoid mismatch.
                                // Use .toFixed(2) to ensure consistent string formatting between server/client.
                                height: isMounted 
                                    ? (isPlaying ? `${Math.random() * 100}%` : `${(20 + Math.sin(i) * 20).toFixed(2)}%`)
                                    : `${(20 + Math.sin(i) * 20).toFixed(2)}%`,
                                animationDelay: `${(i * 0.05).toFixed(2)}s`
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        </section>
    );
};