// AlertCard - For warnings, errors, and important notifications

import React, { ReactNode } from 'react';

export interface AlertCardProps {
  title: string;
  message: string;
  variant?: 'info' | 'warning' | 'error' | 'success';
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const variantStyles = {
  info: {
    container: 'bg-blue-50 border-blue-200',
    icon: 'bg-blue-500 text-white',
    title: 'text-blue-800',
    message: 'text-blue-700',
  },
  warning: {
    container: 'bg-amber-50 border-amber-200',
    icon: 'bg-amber-500 text-white',
    title: 'text-amber-800',
    message: 'text-amber-700',
  },
  error: {
    container: 'bg-red-50 border-red-200',
    icon: 'bg-red-500 text-white',
    title: 'text-red-800',
    message: 'text-red-700',
  },
  success: {
    container: 'bg-emerald-50 border-emerald-200',
    icon: 'bg-emerald-500 text-white',
    title: 'text-emerald-800',
    message: 'text-emerald-700',
  },
};

const defaultIcons = {
  info: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  success: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export const AlertCard: React.FC<AlertCardProps> = ({
  title,
  message,
  variant = 'info',
  icon,
  action,
  dismissible = false,
  onDismiss,
  className = '',
}) => {
  const styles = variantStyles[variant];

  return (
    <div className={`rounded-lg border p-4 ${styles.container} ${className}`}>
      <div className="flex items-start space-x-3">
        <div className={`p-1 rounded ${styles.icon} flex-shrink-0`}>
          {icon || defaultIcons[variant]}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-bold uppercase ${styles.title}`}>{title}</h4>
          <p className={`text-sm mt-1 ${styles.message}`}>{message}</p>
          {action && (
            <button
              onClick={action.onClick}
              className={`mt-3 text-sm font-bold underline ${styles.title} hover:opacity-80`}
            >
              {action.label}
            </button>
          )}
        </div>
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className={`flex-shrink-0 ${styles.title} hover:opacity-70`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
