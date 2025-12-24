# Estágio 1: Build (Onde a mágica do Tailwind/React acontece)
FROM node:20-alpine AS build

WORKDIR /app

# Copia apenas os arquivos de dependências primeiro (otimiza o cache do Docker)
COPY package*.json ./
RUN npm install

# Copia o restante do código e gera o build de produção
COPY . .
RUN npm run build

# Estágio 2: Produção (O container final que será executado)
FROM nginx:stable-alpine

# Remove a configuração padrão do Nginx para evitar conflitos
RUN rm /etc/nginx/conf.d/default.conf

# Cria uma configuração básica para suportar rotas do React (SPA)
RUN echo "server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files \$uri \$uri/ /index.html; \
    } \
}" > /etc/nginx/conf.d/default.conf

# Copia os arquivos compilados do estágio anterior
# NOTA: Se você usa Vite, a pasta é 'dist'. Se usa Create React App, é 'build'.
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
