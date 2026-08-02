# ==========================================
# 1. Builder Stage: Build TS & Prisma Client
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Generate Prisma Client
RUN npx prisma generate

# Copy source code
COPY tsconfig.json ./
COPY src ./src

# Build TypeScript code
RUN npm run build

# Prune devDependencies to keep production image tiny
RUN npm prune --production

# ==========================================
# 2. Production Runner Stage: Lightweight & Secure
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production
ENV PORT=5042

# Use non-root node user for enhanced security
USER node

# Copy built code and production node_modules from builder
COPY --chown=node:node --from=builder /app/package*.json ./
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/prisma ./prisma
COPY --chown=node:node --from=builder /app/dist ./dist

# Expose application port
EXPOSE 5042

# Start production server
CMD ["node", "dist/server.js"]
