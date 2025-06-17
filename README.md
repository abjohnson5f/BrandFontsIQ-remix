# BrandFontsIQ Remix

Enterprise-grade typography intelligence platform built with Remix.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

The app will run on http://localhost:3005

## Architecture

- **Framework**: Remix with TypeScript
- **Database**: Supabase
- **Styling**: Tailwind CSS with glass morphism effects
- **Animations**: Framer Motion
- **Calculation Engine**: Separate TypeScript module with 100% test coverage

## Routes

- `/` - Landing page with company showcase
- `/dashboard/:company` - Company dashboard with metrics
- `/dashboard/:company/:persona` - Persona-specific views (coming soon)

## Key Features

- Real-time data from Supabase
- Enterprise-grade visual design
- Separate calculation engine for accuracy
- Support for 6 major companies
