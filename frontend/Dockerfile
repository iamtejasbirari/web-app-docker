# Stage 1 — Build
FROM node:18-alpine AS builder

WORKDIR /app/frontend

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2 — Runtime
FROM nginx:1.28-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/frontend/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
