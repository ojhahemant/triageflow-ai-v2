// Patient List Widget - Compact list view

import React from 'react';
import { WidgetConfig, PersonaContext } from '../../config/personas/types';

interface PatientListWidgetProps {
  config: WidgetConfig;
  context: PersonaContext;
}

export const PatientListWidget: React.FC<PatientListWidgetProps> = ({
  config,
  context,
}) => {
  const { variant = 'default', filterCondition, emptyMessage, showBadge } = config.props || {};
  const { patients } = context;

  const filteredPatients = filterCondition
    ? patients.filter(filterCondition)
    : patients;

  return (
    <div>
      <h3 className="font-bold text-slate-500 uppercase text-xs tracking-widest mb-4">
        {config.title}
      </h3>
      <div className="space-y-2">
        {filteredPatients.map(p => (
          <div
            key={p.id}
            className="bg-emerald-50 border border-emerald-100 p-3 rounded-lg flex justify-between items-center"
          >
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-sm font-bold text-emerald-900">{p.name}</span>
              <span className="text-xs text-emerald-600 font-medium">
                — {p.procedure}
              </span>
            </div>
            {showBadge && (
              <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded uppercase font-bold">
                Confirmed
              </span>
            )}
          </div>
        ))}
        {filteredPatients.length === 0 && (
          <p className="text-xs text-slate-400 italic">
            {emptyMessage || 'No items'}
          </p>
        )}
      </div>
    </div>
  );
};
