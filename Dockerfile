# Step 1: Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build Vite app
RUN npm run build

# Step 2: Serve with a lightweight server
FROM nginx:stable-alpine

# Copy build output to nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config (optional: custom routes for SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
