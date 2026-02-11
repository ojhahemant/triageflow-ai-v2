// Admin Persona Configuration

import { PersonaConfig } from './types';
import { Persona } from '../../types';

export const adminConfig: PersonaConfig = {
  persona: Persona.ADMIN,
  displayName: 'Referral Admin',
  subtitle: 'The Gatekeeper',
  description: 'Manages intake pool, validates GP referrals, and prepares them for triage.',
  icon: 'Inbox',

  // Show patients in intake review
  patientFilter: (patients) => patients.filter(p => p.status === 'Intake Review'),

  sidebar: {
    showPatientList: true,
    patientFilter: (patients) => patients.filter(p => p.status === 'Intake Review'),
  },

  layout: {
    type: 'grid',
    columns: 3,
    gap: 6,
    widgets: [
      {
        id: 'intake-queue',
        type: 'metrics-grid',
        span: 3,
        props: {
          metrics: [
            {
              key: 'pending',
              label: 'Pending Review',
              icon: 'inbox',
              variant: 'warning',
            },
            {
              key: 'processed-today',
              label: 'Processed Today',
              value: 12,
              icon: 'check',
              variant: 'success',
            },
            {
              key: 'avg-time',
              label: 'Avg Processing Time',
              value: '8 mins',
              icon: 'clock',
              variant: 'primary',
            },
          ],
        },
      },
      {
        id: 'referral-details',
        type: 'patient-card',
        title: 'Referral Details',
        span: 2,
        props: {
          showDetails: true,
          showGPNote: true,
        },
      },
      {
        id: 'validation-actions',
        type: 'action-panel',
        title: 'Validation Actions',
        span: 1,
        props: {
          actions: [
            {
              id: 'approve-triage',
              label: 'Approve for Triage',
              variant: 'success',
              outcome: { status: 'Triage Pending' },
            },
            {
              id: 'request-info',
              label: 'Request More Info',
              variant: 'secondary',
              outcome: { status: 'Form Pending' },
            },
            {
              id: 'reject',
              label: 'Reject Referral',
              variant: 'danger',
              outcome: { status: 'Rejected' },
            },
          ],
        },
      },
      {
        id: 'validation-checklist',
        type: 'progress-tracker',
        title: 'Validation Checklist',
        span: 3,
        props: {
          items: [
            { label: 'Referral form complete', done: true },
            { label: 'Patient demographics verified', done: true },
            { label: 'GP contact details confirmed', done: false },
            { label: 'Clinical photos attached', done: false },
          ],
        },
      },
    ],
  },

  actions: [
    {
      id: 'approve',
      label: 'Approve for Triage',
      variant: 'success',
      handler: (patient, context) => {
        if (context.onUpdatePatient) {
          context.onUpdatePatient(
            { ...patient, status: 'Triage Pending' },
            `${patient.name} approved and sent to Clinician for triage.`
          );
        }
      },
    },
    {
      id: 'request-info',
      label: 'Request More Info',
      variant: 'secondary',
      handler: (patient, context) => {
        if (context.onUpdatePatient) {
          context.onUpdatePatient(
            { ...patient, status: 'Form Pending' },
            `Requested additional information for ${patient.name}.`
          );
        }
      },
    },
    {
      id: 'reject',
      label: 'Reject Referral',
      variant: 'danger',
      handler: (patient, context) => {
        if (context.onUpdatePatient) {
          context.onUpdatePatient(
            { ...patient, status: 'Rejected' },
            `Referral for ${patient.name} has been rejected.`
          );
        }
      },
    },
  ],
};
