import React from 'react';
import { cn } from '@/lib/utils';

export const Card = React.forwardRef(
    (
        {
            className,
            variant = 'default',
            children,
            ...props
        },
        ref
    ) => {
        const variants = {
            default: 'bg-white text-black border border-gray-100 shadow-sm',
            dark: 'bg-[#0a0a0a] text-white border border-gray-800',
            glass: 'bg-white/50 backdrop-blur-md border border-white/20',
        };

        return (
            <div
                ref={ref}
                className={cn(
                    'rounded-3xl p-6 md:p-8',
                    variants[variant],
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';
