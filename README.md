<div align="center">

# 🚀 RelowFlow Web

**Sistema de Gerenciamento de Leads para Empresas de Relocation**

[![Angular](https://img.shields.io/badge/Angular-18.2-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![Material Design](https://img.shields.io/badge/Material-Design-orange.svg)](https://material.angular.io/)
[![License](https://img.shields.io/badge/License-Private-lightgrey.svg)]()
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black.svg)](https://github.com/ltisistemas/ReloFlow-Web)

[![Feature to Develop](https://github.com/ltisistemas/ReloFlow-Web/actions/workflows/feature-to-develop.yml/badge.svg)](https://github.com/ltisistemas/ReloFlow-Web/actions/workflows/feature-to-develop.yml)
[![Develop to Main](https://github.com/ltisistemas/ReloFlow-Web/actions/workflows/develop-to-main.yml/badge.svg)](https://github.com/ltisistemas/ReloFlow-Web/actions/workflows/develop-to-main.yml)
[![Hotfix to Main](https://github.com/ltisistemas/ReloFlow-Web/actions/workflows/hotfix-to-main.yml/badge.svg)](https://github.com/ltisistemas/ReloFlow-Web/actions/workflows/hotfix-to-main.yml)

[English](#-relowflow-web) | [Português](#-relowflow-web-1)

**Repository**: [https://github.com/ltisistemas/ReloFlow-Web](https://github.com/ltisistemas/ReloFlow-Web)

</div>

---

## 🌟 Overview

**RelowFlow Web** is a modern web application for relocation companies to manage leads, companies, users, and document templates. Built with Angular 18, Material Design, and featuring a Kanban board interface.

### Key Features

- **Kanban Board**: Visual lead management with drag-and-drop
- **Company Management**: Complete CRUD for companies, users, and document templates
- **Dual Mode**: Company Mode (Kanban) and User Mode
- **JWT Authentication**: Secure authentication system
- **SSR**: Server-side rendering for better performance

---

## 📦 Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x or **yarn** >= 1.22.x
- **Git** >= 2.x

---

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/ltisistemas/ReloFlow-Web.git
cd RelowFlow-Web
yarn install
```

### 2. Configure Environment

Create `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5219/api'
};
```

### 3. Run

```bash
yarn start
```

Application will be available at `http://localhost:4200`

---

## 💻 Available Scripts

| Command | Description |
|---------|-------------|
| `yarn start` | Start development server |
| `yarn build` | Build for production |
| `yarn test` | Run unit tests |
| `yarn test --code-coverage` | Run tests with coverage |

---

## 📁 Project Structure

```
src/app/
├── core/              # Guards, interceptors
├── modules/
│   ├── auth/         # Authentication
│   ├── company/       # Company management
│   ├── lead/          # Lead management (Kanban)
│   ├── portal/        # Portal layout
│   └── user/          # User management
└── shared/            # Shared components & services
```

**Architecture**: Clean Architecture with Domain, Infrastructure, and Components separation.

---

## 🐳 Docker

```bash
# Build
docker build -t relowflow-web .

# Run
docker run -d -p 8080:80 --name relowflow-web relowflow-web
```

---

## 🔄 CI/CD

GitHub Actions workflows:
- **Feature to Develop**: Auto PR for `feature/*` branches
- **Develop to Main**: Auto PR when merged to develop
- **Hotfix to Main**: Auto PR for `hotfix/*` branches

Each workflow runs tests, builds, and creates releases.

---

## 🧪 Testing

Minimum coverage: **78%**

```bash
yarn test --code-coverage
```

---

## 📚 Documentation

- [API Documentation](./API_DOCUMENTATION.md)
- [Docker Setup](./README-DOCKER.md)
- [Workflows](./README-WORKFLOWS.md)

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and write tests
3. Ensure tests pass: `yarn test`
4. Commit and push
5. Create Pull Request

**Branch Strategy**: `main` → `develop` → `feature/*` / `hotfix/*`

---

## 📄 License

This project is proprietary and confidential.

---

<div align="center">

**Built with ❤️ using Angular**

[Report Bug](https://github.com/ltisistemas/ReloFlow-Web/issues) · [Request Feature](https://github.com/ltisistemas/ReloFlow-Web/issues) · [View Repository](https://github.com/ltisistemas/ReloFlow-Web)

</div>

---

# 🇧🇷 RelowFlow Web

**Sistema de Gerenciamento de Leads para Empresas de Relocation**

[![Angular](https://img.shields.io/badge/Angular-18.2-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![Material Design](https://img.shields.io/badge/Material-Design-orange.svg)](https://material.angular.io/)
[![License](https://img.shields.io/badge/License-Private-lightgrey.svg)]()

---

## 🌟 Visão Geral

**RelowFlow Web** é uma aplicação web moderna para empresas de relocation gerenciarem leads, empresas, usuários e templates de documentos. Construída com Angular 18, Material Design, e interface de quadro Kanban.

### Principais Funcionalidades

- **Quadro Kanban**: Gerenciamento visual de leads com arrastar e soltar
- **Gerenciamento de Empresas**: CRUD completo para empresas, usuários e templates
- **Modo Dual**: Modo Empresa (Kanban) e Modo Usuário
- **Autenticação JWT**: Sistema de autenticação seguro
- **SSR**: Server-side rendering para melhor performance

---

## 📦 Pré-requisitos

- **Node.js** >= 18.x
- **npm** >= 9.x ou **yarn** >= 1.22.x
- **Git** >= 2.x

---

## 🚀 Início Rápido

### 1. Clonar e Instalar

```bash
git clone https://github.com/ltisistemas/ReloFlow-Web.git
cd RelowFlow-Web
yarn install
```

### 2. Configurar Ambiente

Criar `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5219/api'
};
```

### 3. Executar

```bash
yarn start
```

A aplicação estará disponível em `http://localhost:4200`

---

## 💻 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `yarn start` | Iniciar servidor de desenvolvimento |
| `yarn build` | Build para produção |
| `yarn test` | Executar testes unitários |
| `yarn test --code-coverage` | Executar testes com cobertura |

---

## 📁 Estrutura do Projeto

```
src/app/
├── core/              # Guards, interceptors
├── modules/
│   ├── auth/         # Autenticação
│   ├── company/      # Gerenciamento de empresas
│   ├── lead/         # Gerenciamento de leads (Kanban)
│   ├── portal/       # Layout do portal
│   └── user/         # Gerenciamento de usuários
└── shared/           # Componentes e serviços compartilhados
```

**Arquitetura**: Clean Architecture com separação de Domain, Infrastructure e Components.

---

## 🐳 Docker

```bash
# Construir
docker build -t relowflow-web .

# Executar
docker run -d -p 8080:80 --name relowflow-web relowflow-web
```

---

## 🔄 CI/CD

Workflows do GitHub Actions:
- **Feature to Develop**: PR automático para branches `feature/*`
- **Develop to Main**: PR automático quando mergeado em develop
- **Hotfix to Main**: PR automático para branches `hotfix/*`

Cada workflow executa testes, faz build e cria releases.

---

## 🧪 Testes

Cobertura mínima: **78%**

```bash
yarn test --code-coverage
```

---

## 📚 Documentação

- [Documentação da API](./API_DOCUMENTATION.md)
- [Setup Docker](./README-DOCKER.md)
- [Workflows](./README-WORKFLOWS.md)

---

## 🤝 Contribuindo

1. Criar branch de feature: `git checkout -b feature/sua-funcionalidade`
2. Fazer alterações e escrever testes
3. Garantir que testes passem: `yarn test`
4. Commitar e fazer push
5. Criar Pull Request

**Estratégia de Branches**: `main` → `develop` → `feature/*` / `hotfix/*`

---

## 📄 Licença

Este projeto é proprietário e confidencial.

---

<div align="center">

**Construído com ❤️ usando Angular**

[Reportar Bug](https://github.com/ltisistemas/ReloFlow-Web/issues) · [Solicitar Funcionalidade](https://github.com/ltisistemas/ReloFlow-Web/issues) · [Ver Repositório](https://github.com/ltisistemas/ReloFlow-Web)

</div>
