# GitHub Actions Workflows

Este projeto possui 3 workflows automatizados para gerenciar PRs e releases.

## Workflows

### 1. Feature to Develop (`feature-to-develop.yml`)

**Trigger:** Push em qualquer branch que comece com `feature/*`

**Ações:**
- ✅ Executa testes com cobertura
- ✅ Gera versão de desenvolvimento (ex: `0.0.0-dev.2025-12-31T12-15-54`)
- ✅ Realiza build da aplicação
- ✅ Cria ou atualiza PR para `develop`
- ✅ Cria release versionada (prerelease)

**Versão gerada:** `major.minor.0-dev.timestamp`

### 2. Develop to Main (`develop-to-main.yml`)

**Trigger:** Quando um PR é merged em `develop`

**Ações:**
- ✅ Executa testes com cobertura
- ✅ Gera versão de produção (ex: `0.0.1`)
- ✅ Realiza build da aplicação
- ✅ Cria ou atualiza PR para `main`
- ✅ Cria release versionada (production)

**Versão gerada:** Incrementa o patch da versão atual (ex: `0.0.0` → `0.0.1`)

### 3. Hotfix to Main (`hotfix-to-main.yml`)

**Trigger:** Push em qualquer branch que comece com `hotfix/*`

**Ações:**
- ✅ Executa testes com cobertura
- ✅ Gera versão de produção (ex: `0.0.1`)
- ✅ Realiza build da aplicação
- ✅ Cria ou atualiza PR para `main`
- ✅ Cria release versionada (production)

**Versão gerada:** Incrementa o patch da versão atual

## Script de Versionamento

O script `scripts/version.js` é executado automaticamente antes de cada build através do hook `prebuild` no `package.json`.

### Tipos de Versão

- **Main/Production:** `major.minor.patch` (semântica, incrementa patch)
- **Develop:** `major.minor.0-dev.timestamp` (desenvolvimento)
- **Feature/Hotfix:** `major.minor.0-branch-name.timestamp` (feature específica)

### Uso Manual

```bash
# Versão para develop
BUILD_TYPE=develop node scripts/version.js

# Versão para main
BUILD_TYPE=main node scripts/version.js

# Versão automática (baseada na branch atual)
node scripts/version.js
```

## Estrutura de Branches

- `main` - Produção
- `develop` - Desenvolvimento
- `feature/*` - Features
- `hotfix/*` - Correções urgentes

## Artifacts

Cada workflow gera artifacts com o build completo, nomeados como `dist-{version}` e disponíveis por 30 dias.

## Releases

Todas as releases são criadas automaticamente no GitHub com:
- Tag versionada (`v{version}`)
- Descrição completa
- Link para artifacts
- Status de testes e build

