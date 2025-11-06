# Safety App - Comprehensive Safety Management System

A modern, full-featured safety management system designed for workplaces to streamline EHS (Environment, Health, and Safety) processes, reduce incidents, and create safer work environments.

## Features

- **User Management**: Role-based access control for admins, safety managers, supervisors, and employees. Admins can view and manage all registered users in the User Management section.
- **Hazard Reporting**: Real-time hazard identification and reporting system
- **Safety Checklists**: Customizable checklists for different departments and roles
- **Incident Management**: Comprehensive incident tracking and analysis
- **Training Management**: Track and manage employee training programs
- **Notifications**: Automated alerts and notifications for safety concerns
- **Analytics & Reports**: Data-driven insights for safety performance using charts and graphs
- **System Settings**: Customizable theme and system configuration
- **System Theme**: Dark/light mode support
- **Mobile Responsive**: Optimized for desktop and mobile devices

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Data Fetching**: TanStack Query (React Query)
- **Charts**: Recharts
- **Theme Management**: next-themes
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Language**: JavaScript (ES6+)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <YOUR_GIT_URL>
cd Safty-App
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Dashboard, Sidebar, Navbar)
│   ├── ui/            # shadcn/ui components
│   └── ...
├── contexts/           # React contexts (Auth, Theme)
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Page components
└── ...
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## User Roles

- **Admin**: Full system access, user management, system settings
- **Safety Manager**: Hazard management, incident tracking, analytics
- **Supervisor**: Team oversight, checklist management
- **Employee**: Basic reporting, checklist completion

## Deployment

This project can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
