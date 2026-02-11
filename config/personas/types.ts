// Persona Configuration Types - TheraForge-inspired declarative config system

import { ReactNode } from 'react';
import { Persona, Patient } from '../../types';

export type WidgetType =
  | 'patient-list'
  | 'patient-details'
  | 'patient-card'
  | 'action-panel'
  | 'metrics-grid'
  | 'metric-card'
  | 'alert-card'
  | 'ai-analysis'
  | 'table'
  | 'progress-tracker'
  | 'custom';

export interface WidgetConfig {
  id: string;
  type: WidgetType;
  title?: string;
  subtitle?: string;
  span?: number; // Grid columns to span (1-12)
  props?: Record<string, any>;
  condition?: (data: PersonaContext) => boolean;
}

export interface LayoutConfig {
  type: 'grid' | 'flex' | 'stack';
  columns?: number;
  gap?: number;
  widgets: WidgetConfig[];
}

export interface PersonaContext {
  patients: Patient[];
  selectedPatient?: Patient;
  currentPersona: Persona;
  onUpdatePatient?: (patient: Patient, message?: string) => void;
  onSelectPatient?: (patientId: string) => void;
}

export interface ActionConfig {
  id: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'success';
  icon?: string;
  condition?: (patient: Patient) => boolean;
  handler: (patient: Patient, context: PersonaContext) => void;
}

export interface PersonaConfig {
  persona: Persona;
  displayName: string;
  subtitle: string;
  description: string;
  icon: string;

  // Data filtering
  patientFilter?: (patients: Patient[]) => Patient[];

  // Layout configuration
  layout: LayoutConfig;

  // Sidebar configuration
  sidebar?: {
    showPatientList: boolean;
    patientFilter?: (patients: Patient[]) => Patient[];
  };

  // Actions available to this persona
  actions?: ActionConfig[];
}
