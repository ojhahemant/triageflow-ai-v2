// Alert Card Widget

import React from 'react';
import { WidgetConfig, PersonaContext } from '../../config/personas/types';
import { AlertCard } from '../../design-system/components/AlertCard';

interface AlertCardWidgetProps {
  config: WidgetConfig;
  context: PersonaContext;
}

export const AlertCardWidget: React.FC<AlertCardWidgetProps> = ({
  config,
  context,
}) => {
  const { title, message, variant = 'info', action } = config.props || {};

  return (
    <AlertCard
      title={title}
      message={message}
      variant={variant}
      action={action}
    />
  );
};
