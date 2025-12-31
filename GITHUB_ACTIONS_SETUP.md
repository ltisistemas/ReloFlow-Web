# Configuração do GitHub Actions para Criar Pull Requests

## Problema

O erro "GitHub Actions is not permitted to create or approve pull requests" ocorre quando as permissões do repositório não permitem que o GitHub Actions crie PRs automaticamente.

## Solução 1: Configurar Permissões do Repositório (Recomendado)

### Passo a Passo:

1. Acesse o repositório no GitHub: https://github.com/ltisistemas/ReloFlow-Web

2. Vá em **Settings** (Configurações)

3. No menu lateral, clique em **Actions** → **General**

4. Role até a seção **"Workflow permissions"**

5. Selecione uma das opções:
   - ✅ **"Read and write permissions"** (Recomendado)
   - ✅ Marque a opção **"Allow GitHub Actions to create and approve pull requests"**

6. Clique em **Save** (Salvar)

### Visualização:

```
Settings → Actions → General
└── Workflow permissions
    ├── Read and write permissions ✅
    └── Allow GitHub Actions to create and approve pull requests ✅
```

## Solução 2: Usar Personal Access Token (PAT) - Alternativa

Se você não tiver acesso às configurações do repositório ou preferir usar um token personalizado:

### 1. Criar um Personal Access Token (PAT)

1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token"** → **"Generate new token (classic)"**
3. Configure:
   - **Note**: `ReloFlow-Web Actions`
   - **Expiration**: Escolha uma data (ou "No expiration" para tokens de longa duração)
   - **Scopes**: Marque:
     - ✅ `repo` (Full control of private repositories)
     - ✅ `workflow` (Update GitHub Action workflows)
4. Clique em **"Generate token"**
5. **Copie o token imediatamente** (você não poderá vê-lo novamente)

### 2. Adicionar o Token como Secret

1. No repositório, vá em **Settings** → **Secrets and variables** → **Actions**
2. Clique em **"New repository secret"**
3. Configure:
   - **Name**: `PAT_TOKEN`
   - **Secret**: Cole o token que você copiou
4. Clique em **"Add secret"**

### 3. Atualizar os Workflows

Atualize os workflows para usar o PAT em vez do `GITHUB_TOKEN` padrão:

```yaml
- name: Checkout code
  uses: actions/checkout@v4
  with:
    fetch-depth: 0
    token: ${{ secrets.PAT_TOKEN }}  # Usar PAT em vez de GITHUB_TOKEN
```

**Nota**: Você precisará atualizar todos os três workflows:
- `.github/workflows/feature-to-develop.yml`
- `.github/workflows/develop-to-main.yml`
- `.github/workflows/hotfix-to-main.yml`

## Verificação

Após configurar, teste fazendo um push em uma branch `feature/*`:

```bash
git checkout -b feature/test-pr
git commit --allow-empty -m "Test PR creation"
git push origin feature/test-pr
```

O workflow deve criar o PR automaticamente sem erros.

## Referências

- [GitHub Docs: Workflow permissions](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#setting-the-permissions-of-the-github_token-for-your-repository)
- [GitHub Docs: Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

