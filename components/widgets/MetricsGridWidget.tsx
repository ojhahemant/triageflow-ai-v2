// Metrics Grid Widget

import React from 'react';
import { WidgetConfig, PersonaContext } from '../../config/personas/types';
import { MetricWidget } from '../../design-system/components/MetricWidget';

interface MetricsGridWidgetProps {
  config: WidgetConfig;
  context: PersonaContext;
}

export const MetricsGridWidget: React.FC<MetricsGridWidgetProps> = ({
  config,
  context,
}) => {
  const { metrics = [] } = config.props || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric: any) => {
        // Calculate value dynamically if needed
        let value = metric.value;
        if (metric.key === 'pending') {
          value = context.patients.filter(p => p.status === 'Intake Review').length;
        } else if (metric.key === 'urgentCount') {
          value = context.patients.filter(p => p.urgency === 'Urgent').length;
        } else if (metric.key === 'totalPatients') {
          value = context.patients.length;
        }

        return (
          <MetricWidget
            key={metric.key}
            label={metric.label}
            value={value}
            variant={metric.variant}
            trend={metric.trend}
            icon={
              metric.icon === 'inbox' ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              ) : metric.icon === 'check' ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : metric.icon === 'clock' ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : metric.icon === 'users' ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : metric.icon === 'alert' ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              ) : metric.icon === 'check-circle' ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : undefined
            }
          />
        );
      })}
    </div>
  );
};
