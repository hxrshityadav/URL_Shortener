<div align="center">

  # 🚀 Lynkforge (Snipr)
  ### *Enterprise-Grade Full-Stack URL Shortener & Analytics Platform*

  [![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
  [![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![JWT](https://img.shields.io/badge/JWT-Stateless_Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

  [Live Demo](https://url-shortener-gilt-xi.vercel.app) • [API Endpoint](https://snpir-api-efba05eb7099.herokuapp.com) • [Report Bug](https://github.com/hxrshityadav/URL_Shortener/issues) • [Request Feature](https://github.com/hxrshityadav/URL_Shortener/issues)

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture & Structure](#-project-architecture--structure)
- [Step-by-Step Quick Start Guide](#-step-by-step-quick-start-guide)
  - [1. Prerequisites](#1-prerequisites)
  - [2. Clone the Repository](#2-clone-the-repository)
  - [3. Database Setup](#3-database-setup)
  - [4. Backend Configuration & Launch](#4-backend-configuration--launch)
  - [5. Frontend Configuration & Launch](#5-frontend-configuration--launch)
- [Environment Variables](#-environment-variables)
- [Core REST API Reference](#-core-rest-api-reference)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔗 Overview

**Lynkforge** (also known as **Snipr**) is a full-stack, enterprise-ready URL shortening and link management platform built with a high-performance **Spring Boot 3** backend and a responsive **React 18** frontend. 

It provides seamless link shortening, custom link alias creation, instant QR code generation, real-time click analytics, user subscription tier management powered by Razorpay, and multi-language internationalization (i18n).

> **Architectural Goal:** Built to demonstrate secure backend API design, stateless JWT security, clean database layer persistence with Spring Data JPA/Hibernate, and interactive frontend data visualization using Chart.js & Framer Motion.

---

## ✨ Key Features

| Category | Features |
| :--- | :--- |
| 🔗 **Link Management** | • Shorten long URLs into custom short links.<br>• Custom link alias support.<br>• Instant QR Code generation for any link.<br>• Automated high-speed HTTP 302 redirections. |
| 📊 **Real-time Analytics** | • Click counts & timestamped tracking.<br>• Interactive analytics dashboard with Chart.js & Recharts.<br>• Device & click volume metrics over custom date ranges. |
| 🔒 **Security & Auth** | • Stateless JWT authentication & role-based authorization.<br>• Encrypted password storage using BCrypt.<br>• Granular CORS filters and secure response headers. |
| 💳 **Monetization & Billing** | • Tiered membership plans (Free, Pro, Business).<br>• Seamless Razorpay payment gateway integration.<br>• Automated webhooks for subscription management. |
| 🌐 **Modern UX & i18n** | • Built with React 18, Vite, and Tailwind CSS.<br>• Smooth micro-animations with Framer Motion.<br>• Multi-language UI support via `i18next`. |

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [Emotion](https://emotion.sh/) + [MUI](https://mui.com/)
- **State & Routing:** [React Router v7](https://reactrouter.com/), [React Query](https://tanstack.com/query)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Charts & Data:** [Chart.js](https://www.chartjs.org/), [Recharts](https://recharts.org/)
- **Internationalization:** [i18next](https://www.i18next.com/)

### Backend
- **Framework:** [Spring Boot 3.x](https://spring.io/projects/spring-boot) (Java 17)
- **Security:** [Spring Security](https://spring.io/projects/spring-security) + JWT (`jjwt`)
- **Persistence:** [Spring Data JPA](https://spring.io/projects/spring-data-jpa) / [Hibernate](https://hibernate.org/)
- **Build Tool:** Apache Maven
- **Payments:** Razorpay Java SDK

### Database & Infrastructure
- **Database:** PostgreSQL (Production / Local) or MySQL
- **Containerization:** Docker & Docker Compose
- **Hosting:** Heroku (Backend API), Vercel (Frontend UI)

---

## 📁 Project Architecture & Structure

```
URL_Shortener/
├── Backend/                       # Spring Boot Application
│   ├── src/main/java/com/url/shortener/
│   │   ├── controller/            # REST Controllers (Auth, URL, Analytics, Payment)
│   │   ├── dtos/                  # Request & Response Data Transfer Objects
│   │   ├── models/                # JPA Domain Entities (User, UrlMapping, ClickEvent)
│   │   ├── repository/            # Spring Data JPA Repositories
│   │   ├── security/              # JWT Filters, UserDetails & Security Config
│   │   └── service/               # Core Business Logic & Razorpay Service
│   ├── src/main/resources/
│   │   ├── application.properties      # Development Configuration
│   │   └── application-prod.properties # Production Configuration
│   ├── Dockerfile                 # Backend Container Setup
│   └── pom.xml                    # Maven Dependencies & Build Script
│
├── Frontend/                      # React 18 + Vite Web Client
│   ├── src/
│   │   ├── components/            # UI Components (Dashboard, Analytics, Auth Modal)
│   │   ├── context/               # Global React Context State (Auth Context)
│   │   ├── api/                   # Axios API Interceptors & Service Calls
│   │   ├── i18n/                  # Language Translation Bundles
│   │   ├── App.jsx                # Main Application Router
│   │   └── index.css              # Global Tailwind Styles
│   ├── package.json               # NPM Dependencies & Scripts
│   ├── tailwind.config.js         # Tailwind Custom Theme Tokens
│   └── vite.config.js             # Vite Server Configuration
│
└── README.md                      # Project Documentation
```

---

## ⚡ Step-by-Step Quick Start Guide

Follow these simple steps to set up and run **Lynkforge** on your local system.

---

### 1. Prerequisites

Ensure you have the following installed on your developer machine:
- **Java JDK 17** or higher (`java -version`)
- **Node.js v18.x** or higher & **npm** (`node -v`, `npm -v`)
- **PostgreSQL 15+** or **Docker Desktop** (for running PostgreSQL in a container)
- **Git** (`git --version`)

---

### 2. Clone the Repository

Clone the project from GitHub and navigate into the workspace directory:

```bash
git clone https://github.com/hxrshityadav/URL_Shortener.git
cd URL_Shortener
```

---

### 3. Database Setup

You can run PostgreSQL locally or launch it instantly using Docker.

#### Option A: Using Docker (Recommended)
Run a quick PostgreSQL container on port `5433`:

```bash
docker run --name postgres-snipr \
  -e POSTGRES_DB=url_shortener \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5433:5432 \
  -d postgres:15
```

#### Option B: Using Local PostgreSQL Installation
Create a database named `url_shortener` via `psql` or pgAdmin:

```sql
CREATE DATABASE url_shortener;
```

---

### 4. Backend Configuration & Launch

1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```

2. *(Optional)* Configure environment variables or modify `src/main/resources/application.properties` if your database credentials differ:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5433/url_shortener
   spring.datasource.username=postgres
   spring.datasource.password=postgres
   jwt.secret=snipr-dev-jwt-hmac-secret-at-least-thirty-two-bytes-long
   ```

3. Build and launch the Spring Boot application:
   ```bash
   # On Windows PowerShell / Command Prompt:
   .\mvnw.cmd spring-boot:run

   # On macOS / Linux:
   ./mvnw spring-boot:run
   ```

4. The backend server will start running at **`http://localhost:8080`**.

---

### 5. Frontend Configuration & Launch

1. Open a new terminal window and navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```

2. Install all required npm packages:
   ```bash
   npm install
   ```

3. Create or verify the local `.env` configuration file in the `Frontend` directory:
   ```env
   VITE_BACKEND_URL=http://localhost:8080
   VITE_REACT_FRONT_END_URL=http://localhost:5173
   ```

4. Start the Vite development server:
   ```bash
   npm run dev
   ```

5. Open your web browser and navigate to **`http://localhost:5173`**.

🎉 **Congratulations!** You now have the full Lynkforge stack running locally!

---

## 🔑 Environment Variables

### Backend Configuration (`Backend/src/main/resources/application.properties`)

| Environment Variable | Default Value | Description |
| :--- | :--- | :--- |
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://localhost:5433/url_shortener` | PostgreSQL Connection URL |
| `SPRING_DATASOURCE_USERNAME` | `postgres` | Database Username |
| `SPRING_DATASOURCE_PASSWORD` | `postgres` | Database Password |
| `JWT_SECRET` | `snipr-dev-jwt-hmac-secret...` | HMAC SHA secret key for JWT signing |
| `FRONTEND_URL` | `http://localhost:5173` | Allowed CORS origin for frontend |
| `RAZORPAY_KEY_ID` | `""` *(Optional)* | Razorpay Gateway API Key ID |
| `RAZORPAY_KEY_SECRET` | `""` *(Optional)* | Razorpay Gateway API Secret |

### Frontend Configuration (`Frontend/.env`)

| Variable Name | Default Value | Description |
| :--- | :--- | :--- |
| `VITE_BACKEND_URL` | `http://localhost:8080` | URL of the running Spring Boot API server |
| `VITE_REACT_FRONT_END_URL` | `http://localhost:5173` | Public origin URL of the React application |

---

## 🌐 Core REST API Reference

| HTTP Method | Endpoint Path | Auth Required | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/auth/public/register` | ❌ No | Create a new user account |
| `POST` | `/api/auth/public/login` | ❌ No | Authenticate user & receive JWT |
| `POST` | `/api/urls/shorten` | 🔒 Yes | Shorten a long URL |
| `GET` | `/api/urls/myurls` | 🔒 Yes | Fetch all URLs created by authenticated user |
| `GET` | `/api/urls/analytics/{shortUrl}` | 🔒 Yes | Fetch click analytics for a specific URL |
| `GET` | `/{shortUrl}` | ❌ No | Redirect to destination target URL |
| `POST` | `/api/payments/create-order` | 🔒 Yes | Initiate a Razorpay payment order |

---

## 🚀 Deployment

- **Backend Containerization:** A production-ready `Dockerfile` is provided in `/Backend/Dockerfile`. It compiles the JAR artifact via multi-stage builds and runs in a lightweight Alpine JDK runtime.
- **Frontend Build:** Run `npm run build` in `/Frontend` to create an optimized production bundle inside the `dist/` directory, ready to serve via Nginx or Vercel.

---

## 🤝 Contributing

Contributions make the open-source community an incredible place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git checkout -b feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

<div align="center">
  <sub>Designed & Developed by <a href="https://github.com/hxrshityadav">Harshit Yadav</a>. Crafted with ❤️ for engineers worldwide.</sub>
</div>
