# Stage 1 — install deps
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2 — runtime only
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY src/ ./src/

# ⚠️ INTENTIONAL ERROR #3 — running as root
# Trivy will flag this. Fix: add a non-root user
EXPOSE 3000
CMD ["node", "src/index.js"]
