// Patient Details Widget

import React from 'react';
import { WidgetConfig, PersonaContext } from '../../config/personas/types';
import { Card, CardHeader } from '../../design-system/components/Card';
import { PatientInfoGrid } from '../../design-system/components/PatientCard';
import { AlertCard } from '../../design-system/components/AlertCard';

interface PatientDetailsWidgetProps {
  config: WidgetConfig;
  context: PersonaContext;
}

export const PatientDetailsWidget: React.FC<PatientDetailsWidgetProps> = ({
  config,
  context,
}) => {
  const { selectedPatient } = context;
  const { fields = ['name', 'mrn', 'dob', 'referralDate'], showAnticoagulantAlert } = config.props || {};

  if (!selectedPatient) {
    return (
      <Card>
        <p className="text-slate-500 text-center py-8">No patient selected</p>
      </Card>
    );
  }

  const isAnticoagulant = selectedPatient.comorbidities?.some(
    c => c.toLowerCase().includes('warfarin') || c.toLowerCase().includes('anticoagulant')
  );

  return (
    <Card>
      <CardHeader
        title={config.title || 'Patient Profile'}
        action={
          <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
            selectedPatient.urgency === 'Urgent' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'
          }`}>
            GP Suggested: {selectedPatient.urgency}
          </span>
        }
      />

      <PatientInfoGrid patient={selectedPatient} fields={fields} />

      {showAnticoagulantAlert && isAnticoagulant && (
        <div className="mt-4">
          <AlertCard
            variant="error"
            title="Anticoagulant Safety Alert"
            message="Patient on Warfarin. Requires INR check pre-op. Adjust procedure coding."
          />
        </div>
      )}
    </Card>
  );
};
