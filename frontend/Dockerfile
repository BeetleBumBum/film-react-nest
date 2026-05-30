FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

# для alpine
RUN npm install @rollup/rollup-linux-x64-musl

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]