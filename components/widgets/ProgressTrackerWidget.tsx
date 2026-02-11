// Progress Tracker Widget

import React from 'react';
import { WidgetConfig, PersonaContext } from '../../config/personas/types';
import { Card, CardHeader } from '../../design-system/components/Card';

interface ProgressTrackerWidgetProps {
  config: WidgetConfig;
  context: PersonaContext;
}

export const ProgressTrackerWidget: React.FC<ProgressTrackerWidgetProps> = ({
  config,
  context,
}) => {
  const { items = [] } = config.props || {};

  return (
    <Card variant="filled" className="bg-slate-800 text-white">
      <h2 className="text-sm font-bold text-slate-400 uppercase mb-4 tracking-widest">
        {config.title}
      </h2>
      <div className="space-y-3">
        {items.map((item: any, i: number) => (
          <div key={i} className="flex items-center space-x-3 text-sm">
            <div
              className={`w-5 h-5 rounded border flex items-center justify-center ${
                item.done
                  ? 'bg-emerald-500 border-emerald-500'
                  : 'border-slate-600'
              }`}
            >
              {item.done && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <span className={item.done ? 'text-slate-400 line-through' : 'text-slate-200'}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};
