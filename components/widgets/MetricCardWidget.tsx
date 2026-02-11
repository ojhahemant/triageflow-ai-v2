// Single Metric Card Widget

import React from 'react';
import { WidgetConfig, PersonaContext } from '../../config/personas/types';
import { MetricWidget } from '../../design-system/components/MetricWidget';

interface MetricCardWidgetProps {
  config: WidgetConfig;
  context: PersonaContext;
}

export const MetricCardWidget: React.FC<MetricCardWidgetProps> = ({
  config,
  context,
}) => {
  const { label, valueKey, value, variant, trend, icon } = config.props || {};

  // Calculate value dynamically if valueKey is provided
  let displayValue = value;
  if (valueKey === 'totalPatients') {
    displayValue = context.patients.length;
  } else if (valueKey === 'urgentCount') {
    displayValue = context.patients.filter(p => p.urgency === 'Urgent').length;
  }

  return (
    <MetricWidget
      label={label}
      value={displayValue}
      variant={variant}
      trend={trend}
    />
  );
};
