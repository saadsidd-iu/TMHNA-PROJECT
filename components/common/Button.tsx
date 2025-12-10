import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'minimal' | 'outlined';
    size?: 'small' | 'default' | 'large';
    intent?: 'primary' | 'success' | 'warning' | 'danger';
    children: ReactNode;
}

export function Button({
    variant = 'primary',
    size = 'default',
    intent = 'primary',
    className = '',
    children,
    ...props
}: ButtonProps) {
    // Size classes
    const sizeClasses = {
        small: 'h-[24px] px-3 text-sm',
        default: 'h-[30px] px-4 text-sm',
        large: 'h-[40px] px-5 text-base',
    };

    // Variant and intent color classes
    const variantClasses = {
        primary: {
            primary: 'bg-[#2D72D2] text-white hover:bg-[#215DB0]',
            success: 'bg-[#238551] text-white hover:bg-[#1C6E42]',
            warning: 'bg-[#C87619] text-white hover:bg-[#935610]',
            danger: 'bg-[#CD4246] text-white hover:bg-[#AC2F33]',
        },
        minimal: {
            primary: 'bg-transparent text-[#2D72D2] hover:bg-[#2D72D2]/10',
            success: 'bg-transparent text-[#238551] hover:bg-[#238551]/10',
            warning: 'bg-transparent text-[#C87619] hover:bg-[#C87619]/10',
            danger: 'bg-transparent text-[#CD4246] hover:bg-[#CD4246]/10',
        },
        outlined: {
            primary: 'bg-transparent border border-[#404854] text-[#F6F7F9] hover:bg-[#2F343C]',
            success: 'bg-transparent border border-[#238551] text-[#238551] hover:bg-[#238551]/10',
            warning: 'bg-transparent border border-[#C87619] text-[#C87619] hover:bg-[#C87619]/10',
            danger: 'bg-transparent border border-[#CD4246] text-[#CD4246] hover:bg-[#CD4246]/10',
        },
    };

    const classes = `
    inline-flex items-center justify-center font-medium transition-colors 
    disabled:opacity-50 disabled:cursor-not-allowed
    ${sizeClasses[size]} 
    ${variantClasses[variant][intent]} 
    ${className}
  `.trim().replace(/\s+/g, ' ');

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}
