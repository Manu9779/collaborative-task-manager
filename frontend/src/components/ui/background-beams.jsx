"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const BackgroundBeams = ({ className }) => {
    return (
        <div
            className={cn(
                "absolute h-full w-full inset-0 bg-neutral-950",
                className
            )}
        >
            <div className="absolute inset-0 bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="absolute inset-0 bg-fixed bg-center bg-no-repeat bg-cover pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='smallGrid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='0.5'/%3E%3C/pattern%3E%3Cpattern id='grid' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Crect width='100' height='100' fill='url(%23smallGrid)'/%3E%3Cpath d='M 100 0 L 0 0 0 100' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`
                }}
            />
            <motion.div
                initial={{
                    opacity: 0.5,
                    width: "15rem",
                    x: -100,
                    y: 300,
                    backgroundImage: "conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
                }}
                animate={{
                    x: 200,
                    y: 0,
                    width: "30rem",
                    opacity: 0.2, // increased opacity for visibility
                }}
                transition={{
                    duration: 10,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                style={{
                    backgroundImage: "conic-gradient(from 0deg at 50% 50%, var(--blue-500) 0deg, var(--transparent) 60deg, var(--transparent) 300deg, var(--blue-500) 360deg)",
                }}
                className="absolute inset-x-0 bottom-0 h-full w-full translate-y-[20%] rounded-full bg-gradient-to-t from-neutral-950 via-neutral-950 to-transparent blur-3xl opacity-20"
            />
        </div>
    );
};
