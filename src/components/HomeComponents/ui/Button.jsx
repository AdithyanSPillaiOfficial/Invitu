import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cn } from '@/lib/utils'; // optional if you still want to use it elsewhere

export const Button = React.forwardRef(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            children,
            ...props
        },
        ref
    ) => {
        const variants = {
            primary: 'bg-highlight-green text-white hover:opacity-90',
            secondary: 'bg-white text-black hover:bg-gray-100 border border-gray-200',
            outline: 'border-2 border-brand-green text-brand-green hover:bg-brand-green/10',
            ghost: 'bg-transparent text-gray-700 hover:text-black hover:bg-gray-100',
        };

        const sizes = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-6 py-2 text-base',
            lg: 'px-8 py-3 text-lg',
            pill: 'px-4 py-2 rounded-full',
        };

        return (
            <button
                ref={ref}
                className={twMerge(
                    clsx(
                        'inline-flex items-center justify-center font-medium transition-all duration-300',
                        'focus:outline-none focus:ring-2 focus:ring-brand-green/50',
                        variant === 'primary' ? 'rounded-full' : 'rounded-lg',
                        variants[variant],
                        sizes[size],
                        className
                    )
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
