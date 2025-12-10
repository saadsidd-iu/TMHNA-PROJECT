import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    elevation?: 0 | 1 | 2 | 3 | 4;
    padding?: boolean;
    children: ReactNode;
}

export function Card({
    elevation = 2,
    padding = true,
    className = '',
    children,
    ...props
}: CardProps) {
    const elevationClasses = {
        0: '',
        1: 'shadow-[0_0_0_1px_rgba(16,22,26,0.1),0_0_0_rgba(16,22,26,0),0_1px_1px_rgba(16,22,26,0.2)]',
        2: 'shadow-[0_0_0_1px_rgba(16,22,26,0.1),0_1px_1px_rgba(16,22,26,0.2),0_2px_6px_rgba(16,22,26,0.2)]',
        3: 'shadow-[0_0_0_1px_rgba(16,22,26,0.1),0_2px_4px_rgba(16,22,26,0.2),0_8px_24px_rgba(16,22,26,0.2)]',
        4: 'shadow-[0_0_0_1px_rgba(16,22,26,0.1),0_4px_8px_rgba(16,22,26,0.2),0_18px_46px_6px_rgba(16,22,26,0.2)]',
    };

    const classes = `
    bg-[#2F343C] 
    border border-[#404854] 
    ${padding ? 'p-5' : ''} 
    ${elevationClasses[elevation]} 
    ${className}
  `.trim().replace(/\s+/g, ' ');

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
}
