// Card component - Base building block for all widgets

import React, { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

const variantStyles = {
  default: 'bg-white border border-slate-200 shadow-sm',
  elevated: 'bg-white shadow-lg border border-slate-100',
  outlined: 'bg-transparent border-2 border-slate-300',
  filled: 'bg-slate-50 border border-slate-200',
};

const paddingStyles = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-6',
  lg: 'p-8',
};

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = ''
}) => {
  return (
    <div className={`rounded-xl ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}>
      {children}
    </div>
  );
};

export interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle, action, className = '' }) => {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      <div>
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export interface CardSectionProps {
  children: ReactNode;
  className?: string;
}

export const CardSection: React.FC<CardSectionProps> = ({ children, className = '' }) => {
  return <div className={`py-4 ${className}`}>{children}</div>;
};
