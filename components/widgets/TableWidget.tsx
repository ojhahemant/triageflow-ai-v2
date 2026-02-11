// Table Widget - Display patients in tabular format

import React from 'react';
import { WidgetConfig, PersonaContext } from '../../config/personas/types';
import { Card } from '../../design-system/components/Card';
import { Button } from '../../design-system/components/Button';
import { UrgencyBadge } from '../../design-system/components/Badge';
import { getPersonaConfig } from '../../config/personas';

interface TableWidgetProps {
  config: WidgetConfig;
  context: PersonaContext;
}

export const TableWidget: React.FC<TableWidgetProps> = ({ config, context }) => {
  const { columns = [], filterCondition, emptyMessage } = config.props || {};
  const { patients, currentPersona, onUpdatePatient } = context;

  const personaConfig = getPersonaConfig(currentPersona);

  const filteredPatients = filterCondition
    ? patients.filter(filterCondition)
    : patients;

  const handleAction = (patient: any, actionId: string) => {
    const action = personaConfig.actions?.find(a => a.id === actionId);
    if (action && action.handler && onUpdatePatient) {
      action.handler(patient, context);
    }
  };

  return (
    <Card padding="none">
      <div className="p-4 bg-slate-50 border-b border-slate-200">
        <h3 className="font-bold text-slate-700 uppercase text-xs tracking-widest">
          {config.title}
        </h3>
      </div>
      <table className="w-full text-left border-collapse">
        <thead className="bg-white border-b border-slate-200">
          <tr>
            {columns.map((col: any) => (
              <th
                key={col.key}
                className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {filteredPatients.map(patient => (
            <tr key={patient.id} className="hover:bg-blue-50/30 transition-colors">
              {columns.map((col: any) => (
                <td key={col.key} className="px-6 py-4">
                  {col.type === 'badge' ? (
                    <UrgencyBadge urgency={patient[col.key]} />
                  ) : col.type === 'actions' ? (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleAction(patient, 'find-slot')}
                    >
                      Find Slot
                    </Button>
                  ) : col.subKey ? (
                    <div>
                      <p className="font-bold text-slate-900">{patient[col.key]}</p>
                      <p className="text-[10px] text-slate-500 tracking-tight">
                        MRN: {patient[col.subKey]}
                      </p>
                    </div>
                  ) : (
                    <span className="text-sm text-slate-700 font-medium">
                      {patient[col.key] || 'N/A'}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
          {filteredPatients.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-12 text-center text-slate-400 italic text-sm"
              >
                {emptyMessage || 'No data available'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
};
