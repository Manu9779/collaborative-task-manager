"use client";
import React, { useState } from "react";
import {
    motion,
    AnimatePresence,
} from "framer-motion";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

export const FloatingNav = ({
    navItems,
    className,
    children
}) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 1,
                    y: -100,
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                transition={{
                    duration: 0.2,
                }}
                className={cn(
                    "flex max-w-2xl fixed top-10 inset-x-0 mx-auto border border-neutral-200 dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-8 pl-8 py-4 items-center justify-center space-x-6",
                    className
                )}
            >
                {navItems.map((navItem, idx) => (
                    <Link
                        key={`link=${idx}`}
                        to={navItem.link}
                        className={cn(
                            "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-800 dark:hover:text-neutral-300 hover:text-black font-medium"
                        )}
                    >
                        <span className="block sm:hidden">{navItem.icon}</span>
                        <span className="hidden sm:block text-sm">{navItem.name}</span>
                    </Link>
                ))}
                {children}
            </motion.div>
        </AnimatePresence>
    );
};
