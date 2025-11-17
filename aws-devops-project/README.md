## 🚀 React + Vite Application
A lightweight, fast, and scalable front-end setup powered by React and Vite, designed for quick development, optimized builds, and smooth CI/CD automation.
Perfect for modern cloud-native deployments, including Docker-based workflows.

## 📁 Project Structure
1. /public: Static assets
2. /src: Source code (React components)
3. Dockerfile: Production build steps for containerization
4. package.json, package-lock.json: Project metadata and dependencies
5. vite.config.js: Vite build configuration

## ⚡ Getting Started
## Install dependencies
Make sure you have Node.js & npm installed. Then:
```bash
npm install
```
## Run the development server
```bash
npm run dev
```
## Build a production bundle
```bash
npm run build
```
## Preview the production build locally
```bash
npm run preview
```
## 🧩 Main Dependencies
1. React
2. Vite
3. ESLint (with custom config for linting)
## 🐳 Docker Support
Build the Docker image for the app:
```bash
docker build -t aws-devops-app
```
Run the container locally:
```bash
docker run -p 80:80 aws-devops-app
```
## 🛠 CI/CD Ready

This project is designed for automated workflows.
Refer to the root infrastructure documentation for:

Automated builds

Deployment pipelines

Environment configuration

## 📘 Notes:
For TypeScript setup, see Vite + React TS Template.
Project is CI/CD-ready—see the root infrastructure documentation for automated build & deployment flow.

