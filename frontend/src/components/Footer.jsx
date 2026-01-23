import React from 'react';
import { cn } from '../lib/utils';

const Footer = ({ className }) => {
    return (
        <footer className={cn("bg-white dark:bg-black border-t border-gray-200 dark:border-white/[0.1] py-8 w-full z-50 relative", className)}>
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500 dark:text-neutral-400">
                <div className="mb-4 md:mb-0">
                    &copy; {new Date().getFullYear()} CollabTask. All rights reserved.
                </div>
                <div className="flex space-x-6">
                    <a href="#" className="hover:text-black dark:hover:text-white transition">Privacy Policy</a>
                    <a href="#" className="hover:text-black dark:hover:text-white transition">Terms of Service</a>
                    <a href="#" className="hover:text-black dark:hover:text-white transition">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
