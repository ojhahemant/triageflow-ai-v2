// Clinician Persona Configuration

import { PersonaConfig } from './types';
import { Persona } from '../../types';

export const clinicianConfig: PersonaConfig = {
  persona: Persona.CLINICIAN,
  displayName: 'Clinician / Doctor',
  subtitle: 'The Decision Maker',
  description: 'Triage referrals, record outcomes, and review complex patient contexts with AI support.',
  icon: 'Stethoscope',

  // Only show patients pending triage
  patientFilter: (patients) => patients.filter(p => p.status === 'Triage Pending'),

  sidebar: {
    showPatientList: true,
    patientFilter: (patients) => patients.filter(p => p.status === 'Triage Pending'),
  },

  layout: {
    type: 'grid',
    columns: 3,
    gap: 6,
    widgets: [
      {
        id: 'patient-profile',
        type: 'patient-details',
        title: 'Patient Profile',
        span: 2,
        props: {
          fields: ['name', 'mrn', 'dob', 'referralDate'],
          showAnticoagulantAlert: true,
        },
      },
      {
        id: 'triage-actions',
        type: 'action-panel',
        title: 'Final Triage Outcome',
        span: 1,
        props: {
          actions: [
            {
              id: 'see-and-treat',
              label: 'Excision (See & Treat)',
              badge: 'Urgent',
              variant: 'danger',
              outcome: { urgency: 'Urgent', procedure: 'Excision (See & Treat)' },
            },
            {
              id: '2ww',
              label: '2WW Suspected Cancer',
              badge: 'Priority',
              variant: 'primary',
              outcome: { urgency: 'Urgent', procedure: 'Two Week Wait Clinic' },
            },
            {
              id: 'routine',
              label: 'Routine Outpatient Clinic',
              variant: 'secondary',
              outcome: { urgency: 'Routine', procedure: 'Routine Clinic' },
            },
          ],
        },
      },
      {
        id: 'referral-interpretation',
        type: 'ai-analysis',
        title: 'Referral Interpretation',
        span: 2,
        props: {
          showGPNote: true,
          showComorbidities: true,
          aiEnabled: true,
        },
      },
      {
        id: 'pre-assessment',
        type: 'progress-tracker',
        title: 'Pre-Assessment Needs',
        span: 1,
        props: {
          items: [
            { label: 'Photos Required', done: false },
            { label: 'Histopathology Checked', done: true },
            { label: 'GP Summary Verified', done: true },
          ],
        },
      },
    ],
  },

  actions: [
    {
      id: 'triage-see-and-treat',
      label: 'Excision (See & Treat)',
      variant: 'danger',
      handler: (patient, context) => {
        if (context.onUpdatePatient) {
          context.onUpdatePatient(
            { ...patient, status: 'Awaiting Scheduling', urgency: 'Urgent', procedure: 'Excision (See & Treat)' },
            `Patient ${patient.name} triaged as Urgent. Outcome: Excision (See & Treat). Sent to List Office.`
          );
        }
      },
    },
    {
      id: 'triage-2ww',
      label: '2WW Suspected Cancer',
      variant: 'primary',
      handler: (patient, context) => {
        if (context.onUpdatePatient) {
          context.onUpdatePatient(
            { ...patient, status: 'Awaiting Scheduling', urgency: 'Urgent', procedure: 'Two Week Wait Clinic' },
            `Patient ${patient.name} triaged as Priority 2WW. Sent to List Office.`
          );
        }
      },
    },
    {
      id: 'triage-routine',
      label: 'Routine Clinic',
      variant: 'secondary',
      handler: (patient, context) => {
        if (context.onUpdatePatient) {
          context.onUpdatePatient(
            { ...patient, status: 'Awaiting Scheduling', urgency: 'Routine', procedure: 'Routine Clinic' },
            `Patient ${patient.name} triaged as Routine. Sent to List Office.`
          );
        }
      },
    },
  ],
};
