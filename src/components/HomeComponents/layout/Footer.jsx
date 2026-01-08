import React from 'react';
import { Logo } from '@/components/HomeComponents/ui/Logo';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="bg-white dark:bg-black border-t border-gray-100 dark:border-gray-900 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
                    <div className="max-w-sm">
                        <Link href="/" className="inline-block mb-6">
                            <Logo />
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Where Events Begin, and Invites Get Made. The all-in-one platform for modern event organizers.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
                        <div>
                            <h4 className="font-bold mb-4">Product</h4>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li><Link href="#" className="hover:text-brand-green">Features</Link></li>
                                <li><Link href="#" className="hover:text-brand-green">Pricing</Link></li>
                                <li><Link href="#" className="hover:text-brand-green">Showcase</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li><Link href="#" className="hover:text-brand-green">About</Link></li>
                                <li><Link href="#" className="hover:text-brand-green">Careers</Link></li>
                                <li><Link href="#" className="hover:text-brand-green">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li><Link href="#" className="hover:text-brand-green">Terms</Link></li>
                                <li><Link href="#" className="hover:text-brand-green">Privacy</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 dark:border-gray-900 text-xs text-gray-400">
                    <p>© {new Date().getFullYear()} Invitu. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        {/* Socials placeholder */}
                        <span>Twitter</span>
                        <span>LinkedIn</span>
                        <span>Instagram</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
