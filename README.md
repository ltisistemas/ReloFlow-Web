<div align="center">

# 🚀 RelowFlow Web

**Sistema de Gerenciamento de Leads para Empresas de Relocation**

[![Angular](https://img.shields.io/badge/Angular-18.2-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![Material Design](https://img.shields.io/badge/Material-Design-orange.svg)](https://material.angular.io/)
[![License](https://img.shields.io/badge/License-Private-lightgrey.svg)]()

[English](#-relowflow-web) | [Português](#-relowflow-web-1)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Testing](#-testing)
- [Building](#-building)
- [Docker](#-docker)
- [CI/CD](#-cicd)
- [API Documentation](#-api-documentation)
- [Important Notes](#-important-notes)
- [Contributing](#-contributing)

---

## 🌟 Overview

**RelowFlow Web** is a modern, full-featured web application designed for relocation companies to manage leads, companies, users, and document templates efficiently. Built with Angular 18 and Material Design, it provides an intuitive Kanban board interface for lead management and comprehensive company administration tools.

### Key Capabilities

- **Lead Management**: Visual Kanban board with drag-and-drop functionality
- **Company Administration**: Complete CRUD operations for companies, users, and document templates
- **Dual Mode Interface**: Switch between Company Mode (Kanban) and User Mode (personal workflows)
- **Document Templates**: Configure required documents per Kanban position
- **User Management**: Associate users with companies, with automatic signup for new users
- **Analytics Dashboard**: Company manager dashboard with lead analytics
- **Authentication**: Secure JWT-based authentication system
- **Server-Side Rendering**: Optimized SSR for better performance and SEO

---

## ✨ Features

### 🎯 Lead Management
- **Kanban Board**: Visual representation of leads across different positions/stages
- **Drag & Drop**: Move leads between positions seamlessly
- **Lead Details**: Comprehensive lead information including addresses, currency, members
- **Member Management**: Add members to leads with automatic user registration
- **Real-time Updates**: Automatic synchronization with backend

### 🏢 Company Management
- **Company CRUD**: Create, read, update company information
- **Position Management**: Configure Kanban columns (positions) per company
- **Document Templates**: Define required documents for each position
- **User Association**: Link users to companies with automatic signup
- **Company Dashboard**: Analytics and metrics for company managers

### 👥 User Management
- **Authentication**: Secure login and signup
- **User Search**: Find existing users by email
- **Automatic Registration**: Register new users when adding to companies/leads
- **Profile Management**: Complete user profile with personal information

### 🎨 User Experience
- **Material Design**: Modern, responsive UI with Angular Material
- **Dark/Light Theme**: Toggle between themes
- **Responsive Layout**: Works seamlessly on desktop and mobile
- **Accessibility**: WCAG compliant components

---

## 🛠 Tech Stack

### Core Technologies
- **Angular 18.2**: Latest Angular framework with standalone components
- **TypeScript 5.5**: Type-safe development
- **RxJS 7.8**: Reactive programming
- **Angular Material 18.14**: UI component library
- **Angular CDK**: Component development kit

### Build & Development
- **Angular CLI 18.2.21**: Development and build tools
- **Karma & Jasmine**: Unit testing framework
- **Express**: SSR server
- **Nginx**: Production web server

### DevOps
- **Docker**: Containerization
- **GitHub Actions**: CI/CD pipelines
- **Node.js**: Runtime environment

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.x
- **npm** >= 9.x or **yarn** >= 1.22.x
- **Angular CLI** >= 18.2.21 (optional, can be installed globally)
- **Git** >= 2.x
- **Docker** (optional, for containerized deployment)

### Verify Installation

```bash
node --version  # Should be >= 18.0.0
npm --version   # Should be >= 9.0.0
# or
yarn --version  # Should be >= 1.22.0
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd RelowFlow-Web
```

### 2. Install Dependencies

Using **yarn** (recommended):
```bash
yarn install
```

Or using **npm**:
```bash
npm install
```

### 3. Configure Environment

Create or update `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5219/api'  // Your API URL
};
```

For production, update `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com/api'
};
```

### 4. Start Development Server

```bash
yarn start
# or
npm start
```

The application will be available at `http://localhost:4200`

The app will automatically reload if you change any of the source files.

### 5. Access the Application

- **Login Page**: `http://localhost:4200/auth/login`
- **Signup Page**: `http://localhost:4200/auth/signup`
- **Portal**: `http://localhost:4200/portal` (requires authentication)

---

## 📁 Project Structure

```
RelowFlow-Web/
├── src/
│   ├── app/
│   │   ├── core/                    # Core functionality
│   │   │   └── config/
│   │   │       ├── guards/          # Route guards (auth)
│   │   │       └── interceptors/   # HTTP interceptors
│   │   ├── modules/
│   │   │   ├── auth/                # Authentication module
│   │   │   │   ├── domain/
│   │   │   │   │   ├── components/  # Login, Signup
│   │   │   │   │   ├── services/    # Auth services
│   │   │   │   │   └── interface/   # Type definitions
│   │   │   │   └── infra/
│   │   │   │       └── repositories/ # API repositories
│   │   │   ├── company/             # Company management
│   │   │   ├── lead/                # Lead management
│   │   │   ├── portal/              # Portal layout & dashboard
│   │   │   └── user/                # User management
│   │   └── shared/                  # Shared components & services
│   ├── environments/                # Environment configurations
│   ├── styles/                      # Global styles & themes
│   └── main.ts                      # Application entry point
├── scripts/
│   └── version.js                   # Version generation script
├── .github/
│   └── workflows/                   # GitHub Actions workflows
├── Dockerfile                       # Docker configuration
├── docker-compose.yml              # Docker Compose configuration
├── nginx.conf                      # Nginx configuration
├── angular.json                    # Angular configuration
├── package.json                    # Dependencies & scripts
└── README.md                       # This file
```

### Architecture Pattern

The project follows a **Clean Architecture** approach with clear separation:

- **Domain**: Business logic, interfaces, services
- **Infrastructure**: API repositories, external integrations
- **Components**: UI components (standalone)
- **Shared**: Reusable utilities and services

---

## 💻 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `yarn start` | Start development server on `http://localhost:4200` |
| `yarn build` | Build for production (includes version generation) |
| `yarn test` | Run unit tests with Karma |
| `yarn watch` | Build in watch mode for development |
| `yarn serve:ssr:RelowFlow-Web` | Serve SSR build locally |

### Code Generation

Generate new components, services, etc.:

```bash
ng generate component component-name
ng generate service service-name
ng generate guard guard-name
```

### Development Tips

1. **Hot Reload**: The dev server automatically reloads on file changes
2. **Proxy Configuration**: API proxy is configured in `proxy.conf.json`
3. **Environment Variables**: Use `environment.ts` for development, `environment.prod.ts` for production
4. **Linting**: Use your IDE's Angular Language Service for real-time linting

---

## 🧪 Testing

### Run Tests

```bash
# Run all tests
yarn test

# Run tests with coverage
yarn test --code-coverage

# Run tests in watch mode
yarn test --watch
```

### Test Coverage

The project maintains a minimum of **78% code coverage**:

- **Statements**: 78.81%
- **Branches**: 65.51%
- **Functions**: 73.68%
- **Lines**: 78.26%

### Test Structure

Tests are located alongside source files with `.spec.ts` extension:

```
src/app/modules/company/domain/services/
├── company.service.ts
└── company.service.spec.ts
```

---

## 🏗 Building

### Development Build

```bash
yarn build
```

### Production Build

```bash
yarn build --configuration production
```

### Build Output

The build artifacts will be stored in the `dist/relow-flow-web/` directory:

- `browser/`: Client-side application
- `server/`: SSR server files
- `version.json`: Build version information

### Version Generation

The build process automatically generates version information:

- **Main/Production**: Semantic versioning (e.g., `0.0.1`)
- **Develop**: Development version with timestamp (e.g., `0.0.0-dev.2025-12-31T12-15-54`)
- **Feature/Hotfix**: Branch-specific versions

Version is generated by `scripts/version.js` before each build.

---

## 🐳 Docker

### Quick Start

```bash
# Build image
docker build -t relowflow-web .

# Run container
docker run -d -p 8080:80 --name relowflow-web relowflow-web
```

### Docker Compose

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Environment Variables

```bash
docker run -d -p 8080:80 \
  -e API_URL=https://api.example.com \
  --name relowflow-web \
  relowflow-web
```

For detailed Docker documentation, see [README-DOCKER.md](./README-DOCKER.md).

---

## 🔄 CI/CD

The project uses GitHub Actions for automated CI/CD pipelines.

### Workflows

1. **Feature to Develop**: Automatically creates PR to `develop` for `feature/*` branches
2. **Develop to Main**: Creates PR to `main` when PR to `develop` is merged
3. **Hotfix to Main**: Creates PR to `main` for `hotfix/*` branches

### Automated Steps

Each workflow:
- ✅ Runs tests with coverage
- ✅ Generates version number
- ✅ Builds the application
- ✅ Creates/updates Pull Request
- ✅ Creates versioned release

For detailed workflow documentation, see [README-WORKFLOWS.md](./README-WORKFLOWS.md).

---

## 📚 API Documentation

The application communicates with a RESTful API. For complete API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

### Base URL

- **Development**: `http://localhost:5219/api`
- **Production**: Configure in `environment.prod.ts`

### Authentication

All endpoints (except `/api/auth/*`) require JWT authentication:

```
Authorization: {token}
```

### Main Endpoints

- **Auth**: `/api/auth/signin`, `/api/auth/signup`
- **Companies**: `/api/company`
- **Leads**: `/api/lead`
- **Users**: `/api/user`
- **Company Users**: `/api/companyuser`
- **Document Templates**: `/api/companypositiondocumenttemplate`

---

## ⚠ Important Notes

### Security

- JWT tokens are stored in `localStorage`
- All API requests include authentication headers automatically
- Route guards protect authenticated routes

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Performance

- **SSR**: Server-side rendering for better initial load
- **Lazy Loading**: Routes are lazy-loaded for optimal bundle size
- **Code Splitting**: Automatic code splitting by route

### Known Limitations

- Minimum test coverage: 78% (target: 95%)
- Some features may require backend API availability

---

## 🤝 Contributing

### Branch Strategy

- `main`: Production-ready code
- `develop`: Development branch
- `feature/*`: New features
- `hotfix/*`: Urgent fixes

### Development Workflow

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Write/update tests
4. Ensure tests pass: `yarn test`
5. Ensure build succeeds: `yarn build`
6. Commit changes: `git commit -m "Add your feature"`
7. Push to remote: `git push origin feature/your-feature`
8. Create Pull Request

### Code Style

- Follow Angular Style Guide
- Use TypeScript strict mode
- Write meaningful commit messages
- Maintain test coverage above 78%

---

## 📄 License

This project is proprietary and confidential.

---

<div align="center">

**Built with ❤️ using Angular**

[Report Bug](https://github.com/your-repo/issues) · [Request Feature](https://github.com/your-repo/issues)

</div>

---

# 🇧🇷 RelowFlow Web

**Sistema de Gerenciamento de Leads para Empresas de Relocation**

[![Angular](https://img.shields.io/badge/Angular-18.2-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![Material Design](https://img.shields.io/badge/Material-Design-orange.svg)](https://material.angular.io/)
[![License](https://img.shields.io/badge/License-Private-lightgrey.svg)]()

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Stack Tecnológico](#-stack-tecnológico)
- [Pré-requisitos](#-pré-requisitos)
- [Começando](#-começando)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Desenvolvimento](#-desenvolvimento)
- [Testes](#-testes)
- [Build](#-build)
- [Docker](#-docker-1)
- [CI/CD](#-cicd-1)
- [Documentação da API](#-documentação-da-api)
- [Notas Importantes](#-notas-importantes)
- [Contribuindo](#-contribuindo)

---

## 🌟 Visão Geral

**RelowFlow Web** é uma aplicação web moderna e completa projetada para empresas de relocation gerenciarem leads, empresas, usuários e templates de documentos de forma eficiente. Construída com Angular 18 e Material Design, oferece uma interface intuitiva de quadro Kanban para gerenciamento de leads e ferramentas abrangentes de administração de empresas.

### Principais Capacidades

- **Gerenciamento de Leads**: Quadro Kanban visual com funcionalidade de arrastar e soltar
- **Administração de Empresas**: Operações CRUD completas para empresas, usuários e templates de documentos
- **Interface Dual**: Alternar entre Modo Empresa (Kanban) e Modo Usuário (fluxos pessoais)
- **Templates de Documentos**: Configurar documentos obrigatórios por posição do Kanban
- **Gerenciamento de Usuários**: Associar usuários a empresas, com cadastro automático para novos usuários
- **Dashboard Analítico**: Dashboard para gerentes de empresa com análises de leads
- **Autenticação**: Sistema de autenticação seguro baseado em JWT
- **Server-Side Rendering**: SSR otimizado para melhor performance e SEO

---

## ✨ Funcionalidades

### 🎯 Gerenciamento de Leads
- **Quadro Kanban**: Representação visual de leads em diferentes posições/estágios
- **Arrastar e Soltar**: Mover leads entre posições de forma fluida
- **Detalhes do Lead**: Informações completas do lead incluindo endereços, moeda, membros
- **Gerenciamento de Membros**: Adicionar membros aos leads com registro automático de usuários
- **Atualizações em Tempo Real**: Sincronização automática com o backend

### 🏢 Gerenciamento de Empresas
- **CRUD de Empresas**: Criar, ler, atualizar informações da empresa
- **Gerenciamento de Posições**: Configurar colunas do Kanban (posições) por empresa
- **Templates de Documentos**: Definir documentos obrigatórios para cada posição
- **Associação de Usuários**: Vincular usuários a empresas com cadastro automático
- **Dashboard da Empresa**: Análises e métricas para gerentes de empresa

### 👥 Gerenciamento de Usuários
- **Autenticação**: Login e cadastro seguros
- **Busca de Usuários**: Encontrar usuários existentes por email
- **Registro Automático**: Registrar novos usuários ao adicionar a empresas/leads
- **Gerenciamento de Perfil**: Perfil completo do usuário com informações pessoais

### 🎨 Experiência do Usuário
- **Material Design**: UI moderna e responsiva com Angular Material
- **Tema Escuro/Claro**: Alternar entre temas
- **Layout Responsivo**: Funciona perfeitamente em desktop e mobile
- **Acessibilidade**: Componentes compatíveis com WCAG

---

## 🛠 Stack Tecnológico

### Tecnologias Principais
- **Angular 18.2**: Framework Angular mais recente com componentes standalone
- **TypeScript 5.5**: Desenvolvimento type-safe
- **RxJS 7.8**: Programação reativa
- **Angular Material 18.14**: Biblioteca de componentes UI
- **Angular CDK**: Kit de desenvolvimento de componentes

### Build e Desenvolvimento
- **Angular CLI 18.2.21**: Ferramentas de desenvolvimento e build
- **Karma & Jasmine**: Framework de testes unitários
- **Express**: Servidor SSR
- **Nginx**: Servidor web de produção

### DevOps
- **Docker**: Containerização
- **GitHub Actions**: Pipelines CI/CD
- **Node.js**: Ambiente de execução

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

- **Node.js** >= 18.x
- **npm** >= 9.x ou **yarn** >= 1.22.x
- **Angular CLI** >= 18.2.21 (opcional, pode ser instalado globalmente)
- **Git** >= 2.x
- **Docker** (opcional, para deploy containerizado)

### Verificar Instalação

```bash
node --version  # Deve ser >= 18.0.0
npm --version   # Deve ser >= 9.0.0
# ou
yarn --version  # Deve ser >= 1.22.0
```

---

## 🚀 Começando

### 1. Clonar o Repositório

```bash
git clone <url-do-repositório>
cd RelowFlow-Web
```

### 2. Instalar Dependências

Usando **yarn** (recomendado):
```bash
yarn install
```

Ou usando **npm**:
```bash
npm install
```

### 3. Configurar Ambiente

Criar ou atualizar `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5219/api'  // URL da sua API
};
```

Para produção, atualizar `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.seudominio.com/api'
};
```

### 4. Iniciar Servidor de Desenvolvimento

```bash
yarn start
# ou
npm start
```

A aplicação estará disponível em `http://localhost:4200`

A aplicação recarregará automaticamente se você alterar qualquer arquivo de origem.

### 5. Acessar a Aplicação

- **Página de Login**: `http://localhost:4200/auth/login`
- **Página de Cadastro**: `http://localhost:4200/auth/signup`
- **Portal**: `http://localhost:4200/portal` (requer autenticação)

---

## 📁 Estrutura do Projeto

```
RelowFlow-Web/
├── src/
│   ├── app/
│   │   ├── core/                    # Funcionalidade principal
│   │   │   └── config/
│   │   │       ├── guards/          # Guards de rota (auth)
│   │   │       └── interceptors/   # Interceptadores HTTP
│   │   ├── modules/
│   │   │   ├── auth/                # Módulo de autenticação
│   │   │   │   ├── domain/
│   │   │   │   │   ├── components/  # Login, Signup
│   │   │   │   │   ├── services/    # Serviços de autenticação
│   │   │   │   │   └── interface/   # Definições de tipos
│   │   │   │   └── infra/
│   │   │   │       └── repositories/ # Repositórios de API
│   │   │   ├── company/             # Gerenciamento de empresas
│   │   │   ├── lead/                # Gerenciamento de leads
│   │   │   ├── portal/              # Layout do portal e dashboard
│   │   │   └── user/                # Gerenciamento de usuários
│   │   └── shared/                  # Componentes e serviços compartilhados
│   ├── environments/                # Configurações de ambiente
│   ├── styles/                      # Estilos globais e temas
│   └── main.ts                      # Ponto de entrada da aplicação
├── scripts/
│   └── version.js                   # Script de geração de versão
├── .github/
│   └── workflows/                   # Workflows do GitHub Actions
├── Dockerfile                       # Configuração Docker
├── docker-compose.yml              # Configuração Docker Compose
├── nginx.conf                      # Configuração Nginx
├── angular.json                    # Configuração Angular
├── package.json                    # Dependências e scripts
└── README.md                       # Este arquivo
```

### Padrão de Arquitetura

O projeto segue uma abordagem de **Arquitetura Limpa** com separação clara:

- **Domain**: Lógica de negócio, interfaces, serviços
- **Infrastructure**: Repositórios de API, integrações externas
- **Components**: Componentes UI (standalone)
- **Shared**: Utilitários e serviços reutilizáveis

---

## 💻 Desenvolvimento

### Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `yarn start` | Iniciar servidor de desenvolvimento em `http://localhost:4200` |
| `yarn build` | Build para produção (inclui geração de versão) |
| `yarn test` | Executar testes unitários com Karma |
| `yarn watch` | Build em modo watch para desenvolvimento |
| `yarn serve:ssr:RelowFlow-Web` | Servir build SSR localmente |

### Geração de Código

Gerar novos componentes, serviços, etc.:

```bash
ng generate component nome-do-componente
ng generate service nome-do-servico
ng generate guard nome-do-guard
```

### Dicas de Desenvolvimento

1. **Hot Reload**: O servidor de desenvolvimento recarrega automaticamente em mudanças de arquivo
2. **Configuração de Proxy**: Proxy de API configurado em `proxy.conf.json`
3. **Variáveis de Ambiente**: Use `environment.ts` para desenvolvimento, `environment.prod.ts` para produção
4. **Linting**: Use o Angular Language Service do seu IDE para linting em tempo real

---

## 🧪 Testes

### Executar Testes

```bash
# Executar todos os testes
yarn test

# Executar testes com cobertura
yarn test --code-coverage

# Executar testes em modo watch
yarn test --watch
```

### Cobertura de Testes

O projeto mantém um mínimo de **78% de cobertura de código**:

- **Statements**: 78.81%
- **Branches**: 65.51%
- **Functions**: 73.68%
- **Lines**: 78.26%

### Estrutura de Testes

Os testes estão localizados junto aos arquivos de origem com extensão `.spec.ts`:

```
src/app/modules/company/domain/services/
├── company.service.ts
└── company.service.spec.ts
```

---

## 🏗 Build

### Build de Desenvolvimento

```bash
yarn build
```

### Build de Produção

```bash
yarn build --configuration production
```

### Saída do Build

Os artefatos de build serão armazenados no diretório `dist/relow-flow-web/`:

- `browser/`: Aplicação client-side
- `server/`: Arquivos do servidor SSR
- `version.json`: Informações de versão do build

### Geração de Versão

O processo de build gera automaticamente informações de versão:

- **Main/Produção**: Versionamento semântico (ex: `0.0.1`)
- **Develop**: Versão de desenvolvimento com timestamp (ex: `0.0.0-dev.2025-12-31T12-15-54`)
- **Feature/Hotfix**: Versões específicas da branch

A versão é gerada por `scripts/version.js` antes de cada build.

---

## 🐳 Docker

### Início Rápido

```bash
# Construir imagem
docker build -t relowflow-web .

# Executar container
docker run -d -p 8080:80 --name relowflow-web relowflow-web
```

### Docker Compose

```bash
# Iniciar serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down
```

### Variáveis de Ambiente

```bash
docker run -d -p 8080:80 \
  -e API_URL=https://api.exemplo.com \
  --name relowflow-web \
  relowflow-web
```

Para documentação detalhada do Docker, consulte [README-DOCKER.md](./README-DOCKER.md).

---

## 🔄 CI/CD

O projeto usa GitHub Actions para pipelines automatizados de CI/CD.

### Workflows

1. **Feature to Develop**: Cria automaticamente PR para `develop` para branches `feature/*`
2. **Develop to Main**: Cria PR para `main` quando PR para `develop` é mergeado
3. **Hotfix to Main**: Cria PR para `main` para branches `hotfix/*`

### Etapas Automatizadas

Cada workflow:
- ✅ Executa testes com cobertura
- ✅ Gera número de versão
- ✅ Faz build da aplicação
- ✅ Cria/atualiza Pull Request
- ✅ Cria release versionada

Para documentação detalhada dos workflows, consulte [README-WORKFLOWS.md](./README-WORKFLOWS.md).

---

## 📚 Documentação da API

A aplicação se comunica com uma API RESTful. Para documentação completa da API, consulte [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

### URL Base

- **Desenvolvimento**: `http://localhost:5219/api`
- **Produção**: Configurar em `environment.prod.ts`

### Autenticação

Todos os endpoints (exceto `/api/auth/*`) requerem autenticação JWT:

```
Authorization: {token}
```

### Principais Endpoints

- **Auth**: `/api/auth/signin`, `/api/auth/signup`
- **Companies**: `/api/company`
- **Leads**: `/api/lead`
- **Users**: `/api/user`
- **Company Users**: `/api/companyuser`
- **Document Templates**: `/api/companypositiondocumenttemplate`

---

## ⚠ Notas Importantes

### Segurança

- Tokens JWT são armazenados em `localStorage`
- Todas as requisições de API incluem automaticamente headers de autenticação
- Guards de rota protegem rotas autenticadas

### Suporte a Navegadores

- Chrome (mais recente)
- Firefox (mais recente)
- Safari (mais recente)
- Edge (mais recente)

### Performance

- **SSR**: Server-side rendering para melhor carregamento inicial
- **Lazy Loading**: Rotas são carregadas sob demanda para tamanho de bundle otimizado
- **Code Splitting**: Divisão automática de código por rota

### Limitações Conhecidas

- Cobertura mínima de testes: 78% (meta: 95%)
- Algumas funcionalidades podem requerer disponibilidade da API backend

---

## 🤝 Contribuindo

### Estratégia de Branches

- `main`: Código pronto para produção
- `develop`: Branch de desenvolvimento
- `feature/*`: Novas funcionalidades
- `hotfix/*`: Correções urgentes

### Fluxo de Desenvolvimento

1. Criar uma branch de feature: `git checkout -b feature/sua-funcionalidade`
2. Fazer suas alterações
3. Escrever/atualizar testes
4. Garantir que os testes passem: `yarn test`
5. Garantir que o build tenha sucesso: `yarn build`
6. Commitar alterações: `git commit -m "Adiciona sua funcionalidade"`
7. Fazer push para o remoto: `git push origin feature/sua-funcionalidade`
8. Criar Pull Request

### Estilo de Código

- Seguir o Angular Style Guide
- Usar modo strict do TypeScript
- Escrever mensagens de commit significativas
- Manter cobertura de testes acima de 78%

---

## 📄 Licença

Este projeto é proprietário e confidencial.

---

<div align="center">

**Construído com ❤️ usando Angular**

[Reportar Bug](https://github.com/seu-repo/issues) · [Solicitar Funcionalidade](https://github.com/seu-repo/issues)

</div>
