// TheraForge-inspired design tokens and color system

export const colors = {
  // Primary brand colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  // NHS Blue - for healthcare context
  nhs: {
    blue: '#005eb8',
    darkBlue: '#003087',
    lightBlue: '#41b6e6',
  },

  // Semantic colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
  },

  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
  },

  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
  },

  // Neutral grays
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
};

export const urgencyColors = {
  'Urgent': colors.error[600],
  'Routine': colors.primary[600],
  '2WW': colors.warning[600],
  'Inter Regular': colors.primary[500],
  'Not Set': colors.neutral[400],
};

export const statusColors = {
  'Intake Review': colors.warning[500],
  'Triage Pending': colors.primary[500],
  'Form Pending': colors.neutral[500],
  'Awaiting Scheduling': colors.warning[600],
  'Scheduled': colors.success[500],
  'Confirmed': colors.success[600],
  'Rejected': colors.error[600],
};
