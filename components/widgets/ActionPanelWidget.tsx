// Action Panel Widget - Configurable action buttons

import React from 'react';
import { WidgetConfig, PersonaContext } from '../../config/personas/types';
import { Card, CardHeader } from '../../design-system/components/Card';
import { Button } from '../../design-system/components/Button';
import { getPersonaConfig } from '../../config/personas';

interface ActionPanelWidgetProps {
  config: WidgetConfig;
  context: PersonaContext;
}

export const ActionPanelWidget: React.FC<ActionPanelWidgetProps> = ({
  config,
  context,
}) => {
  const { selectedPatient, currentPersona, onUpdatePatient } = context;
  const { actions = [] } = config.props || {};

  if (!selectedPatient) {
    return null;
  }

  const personaConfig = getPersonaConfig(currentPersona);

  const handleAction = (actionId: string, outcome: any) => {
    const action = personaConfig.actions?.find(a => a.id === actionId);
    if (action && action.handler) {
      action.handler(selectedPatient, context);
    } else if (onUpdatePatient && outcome) {
      // Fallback to outcome-based update
      const updates: any = { ...selectedPatient };
      if (outcome.status) updates.status = outcome.status;
      if (outcome.urgency) updates.urgency = outcome.urgency;
      if (outcome.procedure) updates.procedure = outcome.procedure;

      onUpdatePatient(updates, `Updated ${selectedPatient.name}`);
    }
  };

  return (
    <Card variant="elevated">
      <CardHeader title={config.title || 'Actions'} />

      <div className="space-y-3">
        {actions.map((action: any) => (
          <Button
            key={action.id}
            variant={action.variant || 'primary'}
            fullWidth
            onClick={() => handleAction(action.id, action.outcome)}
          >
            <span>{action.label}</span>
            {action.badge && (
              <span className="text-[10px] bg-white/20 px-1.5 rounded uppercase">
                {action.badge}
              </span>
            )}
          </Button>
        ))}
      </div>

      <div className="mt-6 flex items-center text-xs text-slate-400 italic">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Signed as Dr. Sarah Wilson
      </div>
    </Card>
  );
};
