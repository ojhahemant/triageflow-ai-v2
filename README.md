# NHS TriageFlow AI - V2

A multi-persona healthcare triage system with AI-powered decision support, built with a TheraForge-inspired design system architecture.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ojhahemant/triageflow-ai-v2)

---

## 🎯 Overview

TriageFlow AI is an augmentation layer for NHS operational systems, enabling efficient patient triage and workflow management across multiple healthcare personas.

**Version 2** implements a configuration-driven, widget-based architecture inspired by [TheraForge](https://github.com/TheraForge/Getting-Started), providing:

- 🎨 **Design System** - Reusable, accessible UI components
- 🧩 **Widget Library** - Composable dashboard elements
- ⚙️ **Persona Configs** - Declarative UX definitions
- 🤖 **AI Integration** - GPT-4 powered clinical decision support

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- OpenAI API key

### Local Development

```bash
# Clone repository
git clone https://github.com/ojhahemant/triageflow-ai-v2.git
cd triageflow-ai-v2

# Install dependencies
npm install

# Set up environment variables
echo "OPENAI_API_KEY=your-key-here" > .env.local

# Start development server
npm run dev
```

Visit `http://localhost:5173`

---

## 🏥 Personas

### 1. Clinician / Doctor
**The Decision Maker** - Triage referrals with AI-powered analysis
- Patient profile with safety alerts
- GP note interpretation
- AI clinical decision support
- Triage outcome actions (Urgent, 2WW, Routine)

### 2. Waiting List Office
**The Orchestrator** - Theatre scheduling and list management
- Patient scheduling queue
- Theatre capacity monitoring
- Confirmed bookings tracking
- Smart sequencing recommendations

### 3. Referral Admin
**The Gatekeeper** - Intake validation and processing
- Referral queue metrics
- Validation checklist
- Approval/rejection workflows
- Information requests

### 4. Management
**The Overseer** - Operational analytics
- Backlog metrics and KPIs
- Status distribution charts
- Bottleneck detection
- Performance trends

---

## 📁 Project Structure

```
triageflow-ai-v2/
├── design-system/          # Reusable UI components
│   ├── components/         # Card, Button, Badge, etc.
│   └── theme/              # Colors, typography, spacing
├── config/
│   └── personas/           # Persona UX configurations
│       ├── clinician.config.ts
│       ├── waiting-list.config.ts
│       ├── admin.config.ts
│       └── management.config.ts
├── components/
│   ├── widgets/            # Dashboard widgets
│   └── ConfigurableDashboard.tsx
├── api/
│   └── analyze.ts          # Serverless AI analysis endpoint
├── ARCHITECTURE.md         # System architecture docs
├── MIGRATION_GUIDE.md      # V1 to V2 migration
└── DEPLOYMENT.md           # Production deployment guide
```

---

## 🎨 Architecture Highlights

### Design System
Unified component library with:
- Theme tokens (colors, typography, spacing)
- Base components (Card, Button, Badge)
- Domain components (PatientCard, MetricWidget)
- Consistent styling across all personas

### Widget-Based Composition
11 configurable widget types:
- `patient-details` - Patient demographics
- `action-panel` - Workflow actions
- `ai-analysis` - AI-powered insights
- `table` - Tabular data display
- `metrics-grid` - KPI dashboard
- And more...

### Configuration-Driven UX
Define persona experiences declaratively:

```typescript
export const clinicianConfig: PersonaConfig = {
  persona: Persona.CLINICIAN,
  displayName: 'Clinician / Doctor',

  layout: {
    type: 'grid',
    columns: 3,
    widgets: [
      { id: 'patient-profile', type: 'patient-details', span: 2 },
      { id: 'triage-actions', type: 'action-panel', span: 1 },
      { id: 'ai-analysis', type: 'ai-analysis', span: 2 },
    ]
  },

  patientFilter: (patients) =>
    patients.filter(p => p.status === 'Triage Pending'),
};
```

---

## 🔐 Security

### OpenAI API Key Protection
- ✅ API key stored server-side only (`.env.local`)
- ✅ Serverless backend proxy (`/api/analyze`)
- ✅ Never exposed to browser or Git
- ✅ `.gitignore` prevents accidental commits

### Production Recommendations
- Rate limiting on API endpoints
- CORS restrictions to specific domains
- Request authentication/authorization
- Input validation and sanitization
- Usage monitoring and alerts

---

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Complete system design
- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - V1 to V2 upgrade guide
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment steps

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ojhahemant/triageflow-ai-v2)

**Manual Deployment:**

1. **Import to Vercel**
   - Visit https://vercel.com/new
   - Import `ojhahemant/triageflow-ai-v2`

2. **Configure Settings**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Add Environment Variable**
   - Key: `OPENAI_API_KEY`
   - Value: Your OpenAI API key
   - Scope: Production, Preview, Development

4. **Deploy**
   - Click "Deploy"
   - Your app will be live in ~2 minutes

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS (via utility classes)
- **AI:** OpenAI GPT-4o-mini
- **Deployment:** Vercel Serverless Functions
- **Charts:** Recharts

---

## 📈 Roadmap

### Phase 1 (Current)
- ✅ V2 architecture with design system
- ✅ 4 persona workflows
- ✅ AI-powered triage support
- ✅ Widget-based composition

### Phase 2 (Planned)
- [ ] Real backend integration (replace mock data)
- [ ] NHS Identity authentication
- [ ] Audit logging and compliance
- [ ] Mobile-responsive layouts
- [ ] Dark mode support

### Phase 3 (Future)
- [ ] Real-time collaboration
- [ ] Advanced analytics dashboard
- [ ] Clinical pathway templates
- [ ] Integration with NHS PAS/EPR systems

---

## 🧪 Testing

```bash
# Run build test
npm run build

# Preview production build
npm run preview
```

---

## 🤝 Contributing

This is a prototype for NHS operational improvement. For production deployment:

1. Conduct DPIA (Data Protection Impact Assessment)
2. Ensure GDPR compliance
3. Complete NHS DSP Toolkit requirements
4. Clinical safety assessment (DCB 0129/0160)
5. Information governance review

---

## ⚠️ Disclaimer

This is a **decision support prototype** using mock data:

- Not a diagnostic tool
- Requires clinical oversight
- AI recommendations must be reviewed
- Not for production NHS deployment without proper governance

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🙏 Acknowledgments

- **Architecture Inspiration:** [TheraForge](https://github.com/TheraForge/Getting-Started) - Modular healthcare application framework
- **NHS Design Principles:** NHS Digital Service Manual
- **AI Integration:** OpenAI GPT-4o-mini

---

## 📞 Contact

- **GitHub:** [@ojhahemant](https://github.com/ojhahemant)
- **Repository:** [triageflow-ai-v2](https://github.com/ojhahemant/triageflow-ai-v2)

---

**Built with ❤️ for NHS operational excellence**
