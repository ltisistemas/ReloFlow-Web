# Docker Setup

Este projeto inclui configuração Docker para facilitar o desenvolvimento e deploy.

## Build da Imagem

```bash
docker build -t relowflow-web .
```

## Executar Container

```bash
docker run -d -p 8080:80 --name relowflow-web relowflow-web
```

A aplicação estará disponível em `http://localhost:8080`

## Docker Compose

Para facilitar, use o docker-compose:

```bash
docker-compose up -d
```

Para ver os logs:

```bash
docker-compose logs -f
```

Para parar:

```bash
docker-compose down
```

## Variáveis de Ambiente

Se necessário, você pode passar variáveis de ambiente através do docker-compose.yml ou ao executar o container:

```bash
docker run -d -p 8080:80 \
  -e API_URL=https://api.example.com \
  --name relowflow-web \
  relowflow-web
```

## Estrutura

- **Dockerfile**: Multi-stage build otimizado para produção
- **nginx.conf**: Configuração do Nginx para servir a aplicação Angular
- **docker-compose.yml**: Orquestração simples para desenvolvimento

