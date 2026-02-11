// Button component - TheraForge-inspired hierarchical button system

import React, { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
}

const variantStyles = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md',
  secondary: 'bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 hover:border-blue-600',
  tertiary: 'bg-transparent hover:bg-slate-100 text-slate-600',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md',
  success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        font-bold rounded-lg transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center space-x-2
        ${className}
      `}
    >
      {loading && (
        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!loading && icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export interface IconButtonProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  onClick,
  variant = 'secondary',
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`
        p-2 rounded-lg transition-all
        ${variant === 'primary' && 'bg-blue-600 hover:bg-blue-700 text-white'}
        ${variant === 'secondary' && 'bg-slate-100 hover:bg-slate-200 text-slate-700'}
        ${variant === 'tertiary' && 'bg-transparent hover:bg-slate-100 text-slate-600'}
        ${className}
      `}
    >
      {icon}
    </button>
  );
};
