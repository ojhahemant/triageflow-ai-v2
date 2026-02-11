// PatientCard - Specialized card for displaying patient information

import React from 'react';
import { Patient } from '../../types';
import { Card } from './Card';
import { StatusBadge, UrgencyBadge } from './Badge';

export interface PatientCardProps {
  patient: Patient;
  onClick?: () => void;
  selected?: boolean;
  showDetails?: boolean;
  actions?: React.ReactNode;
  className?: string;
}

export const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  onClick,
  selected = false,
  showDetails = true,
  actions,
  className = '',
}) => {
  return (
    <Card
      variant={selected ? 'elevated' : 'default'}
      padding="md"
      className={`
        ${onClick ? 'cursor-pointer hover:shadow-md' : ''}
        ${selected ? 'border-blue-500 border-2' : ''}
        transition-all
        ${className}
      `}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-bold text-slate-900 text-lg">{patient.name}</h4>
          <p className="text-xs text-slate-500 font-mono">MRN: {patient.mrn}</p>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <StatusBadge status={patient.status} />
          <UrgencyBadge urgency={patient.urgency} />
        </div>
      </div>

      {showDetails && (
        <div className="grid grid-cols-2 gap-3 text-sm mt-4">
          <div className="bg-slate-50 p-2 rounded">
            <p className="text-xs text-slate-400 font-bold uppercase">DOB</p>
            <p className="font-semibold text-slate-900">{patient.dob}</p>
          </div>
          <div className="bg-slate-50 p-2 rounded">
            <p className="text-xs text-slate-400 font-bold uppercase">Referred</p>
            <p className="font-semibold text-slate-900">{patient.referralDate}</p>
          </div>
        </div>
      )}

      {patient.procedure && (
        <div className="mt-3 pt-3 border-t border-slate-200">
          <p className="text-xs text-slate-500 uppercase font-bold">Procedure</p>
          <p className="text-sm text-slate-700 font-medium">{patient.procedure}</p>
        </div>
      )}

      {actions && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          {actions}
        </div>
      )}
    </Card>
  );
};

export interface PatientInfoGridProps {
  patient: Patient;
  fields?: Array<keyof Patient>;
  className?: string;
}

export const PatientInfoGrid: React.FC<PatientInfoGridProps> = ({
  patient,
  fields = ['name', 'mrn', 'dob', 'referralDate'],
  className = '',
}) => {
  const fieldLabels: Record<string, string> = {
    name: 'Full Name',
    mrn: 'MRN',
    dob: 'Date of Birth',
    referralDate: 'Referral Date',
    urgency: 'Urgency',
    status: 'Status',
    procedure: 'Procedure',
  };

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {fields.map((field) => (
        <div key={field} className="bg-slate-50 p-3 rounded-lg">
          <p className="text-[10px] text-slate-400 font-bold uppercase">
            {fieldLabels[field] || field}
          </p>
          <p className="font-semibold text-slate-900">
            {String(patient[field] || 'N/A')}
          </p>
        </div>
      ))}
    </div>
  );
};
