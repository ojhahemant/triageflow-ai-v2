# Migration Guide: V1 to V2

## Overview

This guide explains the migration from the original monolithic dashboard architecture to the new TheraForge-inspired widget-based system.

---

## What Changed

### V1 Architecture
```
App.tsx
├── PersonaSelector
└── Per-Persona Dashboards (4 separate components)
    ├── ClinicianDashboard.tsx
    ├── WaitingListDashboard.tsx
    ├── AdminDashboard.tsx
    └── ManagementDashboard.tsx
```

**Problems:**
- Code duplication across dashboards
- Difficult to maintain consistency
- Hard to add new personas
- Mixed UI and business logic

### V2 Architecture
```
App.tsx
├── PersonaSelector
└── ConfigurableDashboard (single component)
    ├── Design System (reusable components)
    ├── Widget Library (composable pieces)
    └── Persona Configs (declarative definitions)
```

**Benefits:**
- Single source of truth for UI components
- Configuration-driven persona UX
- Easy to extend and modify
- Clear separation of concerns

---

## Key Differences

### 1. Dashboard Components

**V1:**
```tsx
{currentPersona === Persona.CLINICIAN && (
  <ClinicianDashboard
    patient={selectedPatient}
    onUpdatePatient={handleUpdatePatient}
  />
)}
```

**V2:**
```tsx
<ConfigurableDashboard
  persona={currentPersona}
  patients={patients}
  selectedPatient={selectedPatient}
  onUpdatePatient={handleUpdatePatient}
  onSelectPatient={setSelectedPatientId}
/>
```

### 2. Component Structure

**V1:** Monolithic dashboard components with embedded logic

**V2:** Composable widgets defined in config files

```typescript
// clinician.config.ts
layout: {
  type: 'grid',
  columns: 3,
  widgets: [
    { id: 'patient-profile', type: 'patient-details', span: 2 },
    { id: 'triage-actions', type: 'action-panel', span: 1 },
    { id: 'ai-analysis', type: 'ai-analysis', span: 2 },
  ]
}
```

### 3. Data Filtering

**V1:** Switch statements in App.tsx
```tsx
const getRelevantPatients = () => {
  switch (currentPersona) {
    case Persona.ADMIN:
      return patients.filter(p => p.status === 'Intake Review');
    // ...
  }
};
```

**V2:** Declarative filters in persona configs
```typescript
// admin.config.ts
patientFilter: (patients) =>
  patients.filter(p => p.status === 'Intake Review')
```

### 4. Actions

**V1:** Inline handlers in dashboard components
```tsx
const triageAction = (urgency, outcome) => {
  onUpdatePatient({ ...patient, status: 'Awaiting Scheduling', urgency, procedure: outcome });
};
```

**V2:** Configured actions in persona configs
```typescript
actions: [
  {
    id: 'triage-see-and-treat',
    label: 'Excision (See & Treat)',
    variant: 'danger',
    handler: (patient, context) => {
      context.onUpdatePatient({
        ...patient,
        status: 'Awaiting Scheduling',
        urgency: 'Urgent'
      });
    }
  }
]
```

---

## Migration Steps

### Step 1: Review Old Components

Identify reusable patterns in existing dashboards:
- Common UI elements → Design system components
- Business logic → Action handlers
- Layout patterns → Widget configurations

### Step 2: Create Widget Equivalents

Map old components to new widgets:

| V1 Component | V2 Widget |
|--------------|-----------|
| Patient info card | `patient-details` widget |
| Action buttons | `action-panel` widget |
| AI analysis section | `ai-analysis` widget |
| Metrics display | `metrics-grid` widget |
| Patient table | `table` widget |

### Step 3: Configure Personas

Create configuration files for each persona:

```typescript
export const clinicianConfig: PersonaConfig = {
  persona: Persona.CLINICIAN,
  displayName: 'Clinician / Doctor',
  // ... configuration
};
```

### Step 4: Update App.tsx

Replace conditional dashboard rendering with `ConfigurableDashboard`:

```diff
- {currentPersona === Persona.CLINICIAN && (
-   <ClinicianDashboard patient={selectedPatient} />
- )}
+ <ConfigurableDashboard
+   persona={currentPersona}
+   patients={patients}
+   selectedPatient={selectedPatient}
+ />
```

### Step 5: Test Each Persona

Verify functionality for each persona:
- [ ] Clinician triage workflow
- [ ] Waiting list scheduling
- [ ] Admin referral validation
- [ ] Management analytics view

---

## Backward Compatibility

The old dashboard components are **still available** for reference:
- `components/ClinicianDashboard.tsx`
- `components/WaitingListDashboard.tsx`
- `components/AdminDashboard.tsx`
- `components/ManagementDashboard.tsx`

You can switch back to V1 by reverting the App.tsx changes.

---

## Extending the System

### Adding a New Widget Type

1. Create widget component in `/components/widgets/`
2. Add to `WidgetRenderer.tsx` switch statement
3. Use in persona configs

Example:
```typescript
// NewWidget.tsx
export const NewWidget: React.FC<WidgetProps> = ({ config, context }) => {
  return <div>...</div>;
};

// WidgetRenderer.tsx
case 'new-widget':
  return <NewWidget config={config} context={context} />;

// persona.config.ts
widgets: [
  { id: 'my-widget', type: 'new-widget', span: 2 }
]
```

### Adding a New Persona

1. Create config file: `/config/personas/new-persona.config.ts`
2. Define persona enum in `types.ts`
3. Register in `/config/personas/index.ts`
4. Update `PersonaSelector.tsx` to include new persona

---

## Design System Usage

### Using Components in Custom Widgets

```tsx
import { Card, CardHeader } from '../../design-system/components/Card';
import { Button } from '../../design-system/components/Button';
import { Badge } from '../../design-system/components/Badge';

export const MyWidget = () => {
  return (
    <Card>
      <CardHeader title="My Widget" />
      <Button variant="primary">Click Me</Button>
      <Badge variant="success">Active</Badge>
    </Card>
  );
};
```

### Using Theme

```tsx
import { theme } from '../../design-system/theme';

const styles = {
  backgroundColor: theme.colors.primary[500],
  borderRadius: theme.borderRadius.lg,
  padding: theme.spacing[4],
};
```

---

## Performance Considerations

### V1 Issues
- All dashboard components loaded even when not used
- Redundant code across dashboards

### V2 Improvements
- Single dashboard component
- Widgets rendered on-demand based on config
- Shared design system reduces bundle size

---

## Testing Strategy

### Unit Tests
- Test individual widgets in isolation
- Test persona configs return correct data
- Test action handlers update state correctly

### Integration Tests
- Test `ConfigurableDashboard` with different personas
- Test widget renderer with all widget types
- Test data filtering and context passing

### E2E Tests
- Test complete workflows per persona
- Test persona switching
- Test patient updates and state management

---

## Troubleshooting

### Widget Not Rendering

**Check:**
1. Widget type registered in `WidgetRenderer`
2. Widget config has correct type name
3. Condition function (if any) returns true

### Data Not Showing

**Check:**
1. `patientFilter` in persona config
2. `PersonaContext` passed correctly
3. Widget accessing context data properly

### Actions Not Working

**Check:**
1. Action handler defined in persona config
2. `onUpdatePatient` callback provided
3. Action ID matches between config and handler

---

## Resources

- **Architecture Documentation:** `ARCHITECTURE.md`
- **TheraForge Reference:** https://github.com/TheraForge/Getting-Started
- **Design System:** `/design-system`
- **Widget Library:** `/components/widgets`
- **Persona Configs:** `/config/personas`

---

## Support

For questions or issues:
1. Review this migration guide
2. Check `ARCHITECTURE.md` for system overview
3. Examine existing persona configs for examples
4. Refer to old dashboard components for functionality reference
