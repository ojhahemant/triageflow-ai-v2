// Badge component for status, urgency, and labels

import React, { ReactNode } from 'react';
import { PatientStatus } from '../../types';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

const variantStyles = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  error: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  return (
    <span
      className={`
        inline-flex items-center rounded-full font-bold uppercase
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export interface StatusBadgeProps {
  status: PatientStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getVariant = (): 'default' | 'success' | 'warning' | 'error' | 'info' => {
    switch (status) {
      case 'Confirmed':
      case 'Scheduled':
        return 'success';
      case 'Intake Review':
      case 'Awaiting Scheduling':
        return 'warning';
      case 'Rejected':
        return 'error';
      case 'Triage Pending':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Badge variant={getVariant()} size="sm" className={className}>
      {status}
    </Badge>
  );
};

export interface UrgencyBadgeProps {
  urgency: string;
  className?: string;
}

export const UrgencyBadge: React.FC<UrgencyBadgeProps> = ({ urgency, className = '' }) => {
  const getVariant = (): 'default' | 'success' | 'warning' | 'error' | 'info' => {
    switch (urgency) {
      case 'Urgent':
      case '2WW':
        return 'error';
      case 'Inter Regular':
        return 'warning';
      case 'Routine':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Badge variant={getVariant()} size="sm" className={className}>
      {urgency}
    </Badge>
  );
};
