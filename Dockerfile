# Multi-stage build para Angular
FROM node:20-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package.json yarn.lock ./

# Instalar dependências
RUN yarn install --frozen-lockfile

# Copiar código fonte
COPY . .

# Build da aplicação
RUN yarn build

# Stage de produção
FROM nginx:alpine

# Copiar arquivos buildados
COPY --from=builder /app/dist/relow-flow-web/browser /usr/share/nginx/html

# Copiar configuração do nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]

