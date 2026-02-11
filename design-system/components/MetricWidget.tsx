// MetricWidget - For displaying KPIs and statistics

import React, { ReactNode } from 'react';
import { Card } from './Card';

export interface MetricWidgetProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
    isPositive?: boolean;
  };
  description?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  className?: string;
}

const variantStyles = {
  default: 'bg-white border-slate-200',
  primary: 'bg-blue-50 border-blue-200',
  success: 'bg-emerald-50 border-emerald-200',
  warning: 'bg-amber-50 border-amber-200',
  error: 'bg-red-50 border-red-200',
};

const iconColorStyles = {
  default: 'text-slate-600',
  primary: 'text-blue-600',
  success: 'text-emerald-600',
  warning: 'text-amber-600',
  error: 'text-red-600',
};

export const MetricWidget: React.FC<MetricWidgetProps> = ({
  label,
  value,
  icon,
  trend,
  description,
  variant = 'default',
  className = '',
}) => {
  return (
    <div
      className={`
        rounded-xl border p-6 transition-all hover:shadow-md
        ${variantStyles[variant]}
        ${className}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
            {label}
          </p>
          <p className="text-3xl font-bold text-slate-900 mb-1">{value}</p>
          {description && (
            <p className="text-sm text-slate-600">{description}</p>
          )}
        </div>
        {icon && (
          <div className={`p-3 rounded-lg bg-white/60 ${iconColorStyles[variant]}`}>
            {icon}
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="flex items-center space-x-2">
            <span
              className={`flex items-center text-sm font-bold ${
                trend.isPositive
                  ? 'text-emerald-600'
                  : 'text-red-600'
              }`}
            >
              {trend.direction === 'up' ? (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              ) : (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
              {trend.value}%
            </span>
            <span className="text-xs text-slate-500">vs last period</span>
          </div>
        </div>
      )}
    </div>
  );
};

export interface ProgressWidgetProps {
  label: string;
  current: number;
  total: number;
  variant?: 'primary' | 'success' | 'warning' | 'error';
  className?: string;
}

export const ProgressWidget: React.FC<ProgressWidgetProps> = ({
  label,
  current,
  total,
  variant = 'primary',
  className = '',
}) => {
  const percentage = Math.round((current / total) * 100);

  const barColorStyles = {
    primary: 'bg-blue-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold text-slate-700">{label}</span>
        <span className="text-sm font-bold text-slate-900">
          {current} / {total}
        </span>
      </div>
      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${barColorStyles[variant]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-slate-500 mt-1">{percentage}% complete</p>
    </div>
  );
};
