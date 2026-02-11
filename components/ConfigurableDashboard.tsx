// Configurable Dashboard - TheraForge-inspired widget-based composition

import React from 'react';
import { Persona, Patient } from '../types';
import { getPersonaConfig } from '../config/personas';
import { PersonaContext } from '../config/personas/types';
import { WidgetRenderer } from './widgets/WidgetRenderer';

interface ConfigurableDashboardProps {
  persona: Persona;
  patients: Patient[];
  selectedPatient?: Patient;
  onUpdatePatient?: (patient: Patient, message?: string) => void;
  onSelectPatient?: (patientId: string) => void;
}

export const ConfigurableDashboard: React.FC<ConfigurableDashboardProps> = ({
  persona,
  patients,
  selectedPatient,
  onUpdatePatient,
  onSelectPatient,
}) => {
  const config = getPersonaConfig(persona);

  // Apply persona-specific patient filtering
  const filteredPatients = config.patientFilter
    ? config.patientFilter(patients)
    : patients;

  // Build context for widgets
  const context: PersonaContext = {
    patients: filteredPatients,
    selectedPatient,
    currentPersona: persona,
    onUpdatePatient,
    onSelectPatient,
  };

  // Check if there's no relevant content for this persona
  const hasNoPatients = filteredPatients.length === 0;
  const requiresSelectedPatient = config.layout.widgets.some(
    w => ['patient-details', 'ai-analysis', 'action-panel'].includes(w.type)
  );

  if (hasNoPatients && requiresSelectedPatient) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500">
        <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-xl font-medium">No patients available.</p>
        <p className="text-sm">Select a patient from the sidebar or wait for new referrals.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns: `repeat(${config.layout.columns || 3}, minmax(0, 1fr))`,
        }}
      >
        {config.layout.widgets.map(widgetConfig => (
          <div
            key={widgetConfig.id}
            style={{
              gridColumn: widgetConfig.span ? `span ${widgetConfig.span}` : undefined,
            }}
          >
            <WidgetRenderer config={widgetConfig} context={context} />
          </div>
        ))}
      </div>
    </div>
  );
};
