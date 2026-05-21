<div align="center">
  <img src="frontend/public/logo.png" alt="NammaDiscover Logo" width="340" />

[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://namma-discover.vercel.app)
[![Render Deployment](https://img.shields.io/badge/Deployed%20on-Render-blue?style=flat-square&logo=render)](https://namma-discover.onrender.com)
[![Build Status](https://img.shields.io/github/actions/workflow/status/Pranay-Bhaskar/nammadiscover-f/ci.yml?branch=main&style=flat-square)](https://github.com/Pranay-Bhaskar/nammadiscover-f/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](./LICENSE)
[![Contributors](https://img.shields.io/github/contributors/Pranay-Bhaskar/nammadiscover-f?style=flat-square&color=blue)](https://github.com/Pranay-Bhaskar/nammadiscover-f/graphs/contributors)


NammaDiscover Frontend is the client application for **NammaDiscover**, a Karnataka-focused discovery platform that helps users explore authentic places, connect with local guides, browse community-driven content, and access AI-assisted travel discovery through a modern web interface.

</div>

## Overview

This repository contains the frontend codebase for the NammaDiscover platform. It is responsible for the user-facing experience, including authentication screens, landing pages, dashboards, exploration flows, media browsing, and role-based interfaces for general users and administrators.

The frontend is designed to work with the NammaDiscover backend API and is deployed on Vercel.

**Live Application:** [namma-discover.vercel.app](https://namma-discover.vercel.app)

## Features

- Responsive user interface for desktop and mobile
- Authentication flows for login and registration
- Public landing page and protected user dashboard
- Location discovery and detail views
- Media and gallery experience
- Explorer Studio for user-generated content workflows
- Role-based admin dashboard and moderation pages
- API integration with the backend service
- Toast notifications and route protection

## Tech Stack

- React
- Vite
- React Router DOM
- Axios
- Context API
- React Hot Toast
- Vercel for deployment

## Project Structure

```bash
src/
├── components/
├── context/
├── pages/
├── store/
├── assets/
├── App.jsx
└── main.jsx
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Access to the NammaDiscover backend API

### Installation

```bash
git clone <frontend-repository-url>
cd <frontend-repository-folder>
npm install
```

### Environment Variables

Create a `.env` file in the project root and configure the API base URL:

```env
VITE_API_URL=<your-backend-base-url>
```

Example:

```env
VITE_API_URL=http://localhost:5000
```

### Run Locally

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment

This frontend is intended to be deployed on Vercel. Ensure the production environment variable for `VITE_API_URL` points to the deployed backend API.

## Backend Dependency

This repository depends on the NammaDiscover backend repository for:

- Authentication
- User management
- Location and content APIs
- Media and moderation workflows
- Admin operations


## License

Add your preferred license here, for example:

```text
MIT License
```
