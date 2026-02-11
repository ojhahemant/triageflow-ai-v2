// Waiting List Office Persona Configuration

import { PersonaConfig } from './types';
import { Persona } from '../../types';

export const waitingListConfig: PersonaConfig = {
  persona: Persona.WAITING_LIST,
  displayName: 'Waiting List Office',
  subtitle: 'The Orchestrator',
  description: 'Digital management of theatre lists and scheduling operations.',
  icon: 'ClipboardList',

  // Show patients awaiting scheduling or already scheduled
  patientFilter: (patients) =>
    patients.filter(p => ['Awaiting Scheduling', 'Scheduled', 'Form Pending', 'Confirmed'].includes(p.status)),

  sidebar: {
    showPatientList: false, // Table view instead
  },

  layout: {
    type: 'grid',
    columns: 3,
    gap: 6,
    widgets: [
      {
        id: 'scheduling-table',
        type: 'table',
        title: 'Ready to Schedule',
        span: 2,
        props: {
          columns: [
            { key: 'name', label: 'Patient Name', subKey: 'mrn' },
            { key: 'procedure', label: 'Required Procedure' },
            { key: 'urgency', label: 'Clinical Urgency', type: 'badge' },
            { key: 'actions', label: 'Action', type: 'actions' },
          ],
          filterCondition: (p: any) => p.status !== 'Confirmed',
          emptyMessage: 'No triaged patients awaiting scheduling.',
        },
      },
      {
        id: 'theatre-load',
        type: 'custom',
        title: 'Theatre Load',
        span: 1,
        props: {
          component: 'TheatreLoadWidget',
        },
      },
      {
        id: 'confirmed-bookings',
        type: 'patient-list',
        title: 'Confirmed Bookings (Last 24h)',
        span: 2,
        props: {
          variant: 'compact',
          filterCondition: (p: any) => p.status === 'Confirmed',
          emptyMessage: 'No bookings confirmed yet.',
          showBadge: true,
        },
      },
      {
        id: 'smart-sequencing',
        type: 'custom',
        title: 'Smart Sequencing',
        span: 1,
        props: {
          component: 'SmartSequencingWidget',
        },
      },
    ],
  },

  actions: [
    {
      id: 'find-slot',
      label: 'Find Slot',
      variant: 'primary',
      condition: (patient) => patient.status !== 'Confirmed',
      handler: (patient, context) => {
        if (context.onUpdatePatient) {
          context.onUpdatePatient(
            { ...patient, status: 'Confirmed' },
            `Successfully scheduled ${patient.name} for their ${patient.procedure || 'procedure'}.`
          );
        }
      },
    },
  ],
};
