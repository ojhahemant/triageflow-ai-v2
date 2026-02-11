# TriageFlow AI - V2 Architecture

## TheraForge-Inspired Design System Implementation

This document describes the new configuration-driven, widget-based architecture inspired by the TheraForge framework.

---

## Overview

Version 2 implements a **design system with reusable widgets** that enables:

1. **Declarative Configuration** - Define personas and their UX in config files
2. **Composable Widgets** - Build dashboards from reusable components
3. **Scalable Architecture** - Easy to add new personas or modify existing ones
4. **Separation of Concerns** - UI components decoupled from business logic

---

## Architecture Layers

### 1. Design System (`/design-system`)

A TheraForge-inspired component library with unified theming.

#### Theme System (`/design-system/theme`)
- **colors.ts** - Color palette, semantic colors, urgency/status colors
- **typography.ts** - Font system, text styles
- **spacing.ts** - Spacing scale, border radius, shadows
- **index.ts** - Unified theme export

#### Component Library (`/design-system/components`)

**Base Components:**
- `Card` - Container with variants (default, elevated, outlined, filled)
- `Button` - Hierarchical button system (primary, secondary, tertiary, danger, success)
- `Badge` - Status and urgency indicators
- `AlertCard` - Notifications and warnings

**Domain Components:**
- `PatientCard` - Specialized patient information display
- `PatientInfoGrid` - Structured patient data grid
- `MetricWidget` - KPI and statistics display
- `ProgressWidget` - Progress tracking

---

### 2. Persona Configuration System (`/config/personas`)

Declarative configuration files that define each persona's UX.

#### Configuration Structure

```typescript
PersonaConfig {
  persona: Persona
  displayName: string
  subtitle: string
  description: string
  icon: string

  // Data filtering
  patientFilter?: (patients: Patient[]) => Patient[]

  // Layout configuration
  layout: {
    type: 'grid' | 'flex' | 'stack'
    columns: number
    widgets: WidgetConfig[]
  }

  // Sidebar configuration
  sidebar?: {
    showPatientList: boolean
    patientFilter?: (patients: Patient[]) => Patient[]
  }

  // Actions available to this persona
  actions?: ActionConfig[]
}
```

#### Widget Configuration

```typescript
WidgetConfig {
  id: string
  type: WidgetType
  title?: string
  subtitle?: string
  span?: number  // Grid columns to span
  props?: Record<string, any>
  condition?: (context: PersonaContext) => boolean
}
```

#### Available Widget Types

- `patient-details` - Patient profile with demographics
- `patient-card` - Compact patient card
- `action-panel` - Action buttons for workflow
- `ai-analysis` - AI-powered referral analysis
- `metrics-grid` - Multiple KPI cards
- `metric-card` - Single KPI display
- `table` - Tabular patient data
- `patient-list` - Compact list view
- `progress-tracker` - Checklist/progress display
- `alert-card` - Alerts and warnings
- `custom` - Custom component placeholder

---

### 3. Widget System (`/components/widgets`)

Dynamic widget rendering based on configuration.

#### Widget Renderer

`WidgetRenderer.tsx` - Routes widget configs to appropriate implementations

#### Widget Implementations

Each widget type has a corresponding implementation:
- `PatientDetailsWidget` - Displays patient profile
- `ActionPanelWidget` - Renders action buttons
- `AIAnalysisWidget` - AI analysis interface
- `TableWidget` - Tabular data display
- `MetricCardWidget` - Single metric
- `MetricsGridWidget` - Multiple metrics
- etc.

---

### 4. Configurable Dashboard

`ConfigurableDashboard.tsx` - Main dashboard component that:

1. Loads persona configuration
2. Filters patients based on persona rules
3. Builds context for widgets
4. Renders widgets in configured layout

---

## Persona Configurations

### Clinician (`clinician.config.ts`)

**Focus:** Triage and clinical decision-making

**Layout:**
- 2-column patient profile with anticoagulant alerts
- AI-powered referral interpretation
- Action panel for triage outcomes
- Pre-assessment checklist

**Data Filter:** Shows only `Triage Pending` patients

**Actions:**
- Excision (See & Treat) → Urgent
- 2WW Suspected Cancer → Priority
- Routine Clinic → Routine

---

### Waiting List Office (`waiting-list.config.ts`)

**Focus:** Theatre scheduling and list management

**Layout:**
- Scheduling table with patient queue
- Theatre load indicators
- Confirmed bookings list
- Smart sequencing widget

**Data Filter:** Shows `Awaiting Scheduling`, `Scheduled`, `Confirmed` patients

**Actions:**
- Find Slot → Schedule patient

---

### Admin (`admin.config.ts`)

**Focus:** Referral validation and intake management

**Layout:**
- Metrics grid (pending, processed, avg time)
- Referral details card
- Validation actions panel
- Validation checklist

**Data Filter:** Shows `Intake Review` patients

**Actions:**
- Approve for Triage
- Request More Info
- Reject Referral

---

### Management (`management.config.ts`)

**Focus:** High-level operational visibility

**Layout:**
- KPI cards (backlog, urgent cases, wait times, completion rate)
- Status breakdown chart
- Urgency distribution chart
- Bottleneck alerts

**Data Filter:** Shows all patients

**Actions:** Read-only analytics

---

## Benefits of This Architecture

### 1. **Maintainability**
- UI changes happen in design system
- Business logic changes happen in configs
- Clear separation of concerns

### 2. **Scalability**
- Add new persona: Create one config file
- Add new widget: Create one component
- Modify persona UX: Edit config, no code changes

### 3. **Consistency**
- All personas use same design system
- Unified theming and styling
- Predictable component behavior

### 4. **Flexibility**
- Mix and match widgets per persona
- Conditional widget rendering
- Dynamic data filtering

### 5. **Testability**
- Widgets are isolated and testable
- Configs are pure data
- Clear boundaries between layers

---

## Adding a New Persona

1. **Create config file** in `/config/personas/`
2. **Define layout** with widget composition
3. **Specify data filters** for patient list
4. **Define actions** with handlers
5. **Register** in `/config/personas/index.ts`

Example:

```typescript
export const nurseConfig: PersonaConfig = {
  persona: Persona.NURSE,
  displayName: 'Nurse Practitioner',
  subtitle: 'The Care Coordinator',
  description: 'Pre-assessment and patient preparation',

  patientFilter: (patients) =>
    patients.filter(p => p.status === 'Pre-Assessment'),

  layout: {
    type: 'grid',
    columns: 3,
    widgets: [
      { id: 'patient-details', type: 'patient-details', span: 2 },
      { id: 'checklist', type: 'progress-tracker', span: 1 },
    ],
  },

  actions: [
    {
      id: 'complete-assessment',
      label: 'Complete Assessment',
      variant: 'success',
      handler: (patient, context) => {
        // Update patient status
      },
    },
  ],
};
```

---

## Migration from V1

### V1 Architecture (Monolithic)
- ❌ Separate dashboard components per persona
- ❌ Hardcoded layouts and logic
- ❌ Difficult to modify or extend

### V2 Architecture (Composable)
- ✅ Single `ConfigurableDashboard` component
- ✅ Declarative configs define UX
- ✅ Reusable widget library
- ✅ Easy to add/modify personas

---

## Future Enhancements

### Potential Additions

1. **YAML Configuration** - Load configs from YAML files
2. **Plugin System** - External persona modules
3. **Workflow Engine** - Task-based navigation (CareKit-style)
4. **Theme Switching** - Dark mode, high contrast
5. **Accessibility** - Enhanced ARIA, keyboard nav
6. **Widget Marketplace** - Community-contributed widgets
7. **Real-time Collaboration** - Multi-user awareness
8. **Mobile Responsive** - Adaptive layouts

---

## Key Files Reference

```
triageflow-ai/
├── design-system/
│   ├── theme/           # Design tokens
│   └── components/      # Reusable UI components
├── config/
│   └── personas/        # Persona configurations
├── components/
│   ├── widgets/         # Widget implementations
│   └── ConfigurableDashboard.tsx
└── App.tsx             # Main application
```

---

## Conclusion

This architecture provides a scalable, maintainable foundation for multi-persona healthcare applications. By separating configuration from implementation, we enable rapid iteration and easy customization while maintaining code quality and consistency.

**Inspired by:** TheraForge's modular component system and configuration-driven approach to digital health applications.
