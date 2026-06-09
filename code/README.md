# Guide for AI Agents & Developers: Core Architecture & Coding Rules

This document specifies the core engineering rules, technology stack, directory layout, and development guidelines for this repository. Read this first to align with the codebase design system.

---

## 1. Documentation & Design References (Where to look first)
* **Visual & Style Specs**: Refer to [docs/design-rule/DESIGN.md](file:///d:/Study/TLU/human_computer_interaction/fe/docs/design-rule/DESIGN.md) for color tokens, typography (headings/body), emissive glows, radii, and spacing standards.
* **Figma to React Rules**: Refer to [docs/design-rule/conversion-guide.md](file:///d:/Study/TLU/human_computer_interaction/fe/docs/design-rule/conversion-guide.md) to understand how static layouts are translated, viewport overrides, padding resolutions, and icon shrink prevention.

---

## 2. Technology Stack & Core Packages
* **Framework**: React 19 + Vite 8
* **Styling**: Tailwind CSS 4 + Shadcn UI
* **Routing**: `react-router-dom` (v7)
* **State Management**: `zustand` (Zustand 5)
* **Form Validation**: `react-hook-form` with `zod` schemas via `@hookform/resolvers`
* **Iconography**: `lucide-react` (stroke width `2px`, inherited color)

---

## 3. Directory Layout & Architecture

```bash
code/src/
├── components/         # Global reusable React components
│   ├── ui/             # Atomic Shadcn components (Button, Card, Tabs)
│   ├── Sidebar.jsx     # Navigation sidebar (collapsible)
│   ├── Header.jsx      # Top toolbar (search bar, profile metadata)
│   ├── Footer.jsx      # Full-width footer (placed inside main content layout)
│   └── DataTable.jsx   # Shared UI table with pagination wrappers
├── mockdata/           # Decoupled mock files for local-first development
│   ├── levelMock.js    # In-memory levels array (let levelMock = [...])
│   └── unitMock.js     # In-memory units array
├── pages/              # View controllers mapped to routes
│   ├── admin/          # Administrator views (Levels, Curriculum, Exams)
│   └── student/        # Student views (Journey, Review, PracticeTest)
├── routers/            # Router configurations and path authorization
│   ├── index.jsx       # Root router & ProtectedRoute Role Guard
│   ├── adminRoutes.jsx # Admin sub-routes
│   └── studentRoutes.jsx# Student sub-routes
├── services/           # Simulated API endpoints connecting pages to mockdata
│   ├── levelService.js # Simulation CRUD for levels
│   └── unitService.js  # Simulation CRUD for units
├── store/              # Zustand state engines
│   └── authStore.js    # Active session details (roles: 'admin' | 'student')
├── figma.css           # Static styles copied from Figma. DO NOT add custom styles here.
└── index.css           # Tailwind base directives, theme tokens & custom overrides.
```

---

## 4. Coding & Architecture Rules

### Rule A: Styling & Overrides (Cascading Rule)
* `main.jsx` imports `figma.css` **first** and `index.css` **second**. 
* **Do not write custom CSS in `figma.css`**. Keep it purely for figma legacy styles.
* Custom styles, color tokens, font declarations, and resets go to `index.css`.
* Merge custom paddings/classes using the `cn(...)` utility (from `src/lib/utils.js`).

### Rule B: Form Validation (React Hook Form + Zod)
* All forms (modal popups, inputs) must be managed using `react-hook-form`.
* Input validation schemas must be defined with `zod` and integrated via `zodResolver` from `@hookform/resolvers/zod`.
* Form inputs must gracefully highlight error statuses, show validations under fields, and prevent icon shrinking:
  * Add `flex-shrink-0 min-w-[14px]` on SVG error icons.

### Rule C: Data Separation (MockData & Services)
* **Never write static lists or mock state variables inside page components.**
* **Mock Data**: Define initial in-memory data structures in `src/mockdata/` (e.g., `mockdata/levelMock.js`). Export them as mutable variables (`let`) so CRUD works.
* **Service Simulation**: Create an async CRUD service layer in `src/services/` (e.g., `services/levelService.js`). Simulate latency using Promise timeouts (e.g., `300ms`) to mimic real API fetch conditions.
* **Pages**: Pages must trigger service calls within `useEffect` hooks and manage state locally.

### Rule D: Routes & Protected Access (Role Guard)
* **Splitting**: Root routes are split into role-specific sub-routers: `adminRoutes.jsx` and `studentRoutes.jsx`.
* **Guarding**: Root router `src/routers/index.jsx` uses `<ProtectedRoute allowedRoles={['admin']}>` to wrap the admin routes.
* **Breadcrumbs**: Implement responsive breadcrumbs in page headers. The home breadcrumb must link back to `/`.

---

## 5. Development Verification (Lint & Build)
Always test your changes before pushing code. AI Agents must execute these commands to guarantee compliance:
```bash
# Run lint check (Must compile with zero warnings)
npm run lint

# Test production compilation (Must compile cleanly)
npm run build
```
