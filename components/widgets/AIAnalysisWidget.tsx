// AI Analysis Widget - Referral interpretation with AI support

import React, { useState, useEffect } from 'react';
import { WidgetConfig, PersonaContext } from '../../config/personas/types';
import { Card, CardHeader } from '../../design-system/components/Card';
import { Button } from '../../design-system/components/Button';
import { analyzeReferral } from '../../services/openaiService';

interface AIAnalysisWidgetProps {
  config: WidgetConfig;
  context: PersonaContext;
}

export const AIAnalysisWidget: React.FC<AIAnalysisWidgetProps> = ({
  config,
  context,
}) => {
  const { selectedPatient } = context;
  const { showGPNote, showComorbidities, aiEnabled } = config.props || {};

  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    setResults(null);
  }, [selectedPatient?.id]);

  const handleAIRun = async () => {
    if (!selectedPatient) return;
    setAnalyzing(true);
    const data = await analyzeReferral(selectedPatient);
    setResults(data);
    setAnalyzing(false);
  };

  if (!selectedPatient) {
    return null;
  }

  return (
    <Card>
      <CardHeader
        title={config.title || 'Referral Interpretation'}
        action={
          aiEnabled && !results ? (
            <Button
              variant="primary"
              size="sm"
              onClick={handleAIRun}
              loading={analyzing}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            >
              {analyzing ? 'Reading Notes...' : 'AI Decision Support'}
            </Button>
          ) : undefined
        }
      />

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {showGPNote && (
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">
                GP Clinical Narrative
              </p>
              <p className="text-slate-700 text-sm leading-relaxed italic">
                "{selectedPatient.gpNote}"
              </p>
            </div>
          )}

          {showComorbidities && (
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">
                Comorbidities & History
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedPatient.comorbidities?.map((c, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-white border border-slate-300 rounded text-xs text-slate-600"
                  >
                    {c}
                  </span>
                ))}
                {(!selectedPatient.comorbidities || selectedPatient.comorbidities.length === 0) && (
                  <span className="text-slate-400 text-xs italic">No documented history</span>
                )}
              </div>
            </div>
          )}
        </div>

        {results && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <h4 className="text-sm font-bold text-indigo-900 tracking-tight">
                  AI CLINICAL SUMMARY
                </h4>
                <span className="text-[10px] bg-indigo-600 text-white px-1.5 rounded uppercase font-bold">
                  Augmented
                </span>
              </div>
              <p className="text-indigo-800 text-sm leading-relaxed mb-6 font-medium">
                "{results.summary}"
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/60 p-3 rounded-lg border border-indigo-200/50">
                  <p className="text-[10px] text-indigo-500 uppercase font-bold mb-1">
                    Recommended Urgency
                  </p>
                  <p className="text-indigo-900 font-bold text-sm">
                    {results.urgencyRecommendation}
                  </p>
                </div>
                <div className="bg-white/60 p-3 rounded-lg border border-indigo-200/50">
                  <p className="text-[10px] text-indigo-500 uppercase font-bold mb-1">
                    Suggested Outcome
                  </p>
                  <p className="text-indigo-900 font-bold text-sm">
                    {results.suggestedPathway}
                  </p>
                </div>
                <div className="bg-white/60 p-3 rounded-lg border border-indigo-200/50">
                  <p className="text-[10px] text-indigo-500 uppercase font-bold mb-1">
                    Pathway Logic
                  </p>
                  <p className="text-indigo-900 font-bold text-sm">Automated Triage</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
