// Management Persona Configuration

import { PersonaConfig } from './types';
import { Persona } from '../../types';

export const managementConfig: PersonaConfig = {
  persona: Persona.MANAGEMENT,
  displayName: 'Management',
  subtitle: 'The Overseer',
  description: 'High-level visibility into backlog volumes, wait times, and operational bottlenecks.',
  icon: 'BarChart',

  // Show all patients for comprehensive overview
  patientFilter: (patients) => patients,

  sidebar: {
    showPatientList: false, // Dashboard view only
  },

  layout: {
    type: 'grid',
    columns: 4,
    gap: 6,
    widgets: [
      {
        id: 'total-backlog',
        type: 'metric-card',
        span: 1,
        props: {
          label: 'Total Backlog',
          valueKey: 'totalPatients',
          icon: 'users',
          variant: 'primary',
        },
      },
      {
        id: 'urgent-cases',
        type: 'metric-card',
        span: 1,
        props: {
          label: 'Urgent Cases',
          valueKey: 'urgentCount',
          icon: 'alert',
          variant: 'error',
        },
      },
      {
        id: 'avg-wait-time',
        type: 'metric-card',
        span: 1,
        props: {
          label: 'Avg Wait Time',
          value: '12 days',
          icon: 'clock',
          variant: 'warning',
          trend: { value: 15, direction: 'down', isPositive: true },
        },
      },
      {
        id: 'completion-rate',
        type: 'metric-card',
        span: 1,
        props: {
          label: 'Completion Rate',
          value: '87%',
          icon: 'check-circle',
          variant: 'success',
          trend: { value: 5, direction: 'up', isPositive: true },
        },
      },
      {
        id: 'status-breakdown',
        type: 'custom',
        title: 'Pipeline Status',
        span: 2,
        props: {
          component: 'StatusBreakdownChart',
        },
      },
      {
        id: 'urgency-distribution',
        type: 'custom',
        title: 'Urgency Distribution',
        span: 2,
        props: {
          component: 'UrgencyDistributionChart',
        },
      },
      {
        id: 'bottleneck-alert',
        type: 'alert-card',
        span: 4,
        props: {
          title: 'Bottleneck Detected',
          message: 'Theatre scheduling capacity at 95%. Consider adding slots or redistributing cases.',
          variant: 'warning',
        },
      },
    ],
  },
};
