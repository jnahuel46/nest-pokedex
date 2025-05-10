# Install dependencies only when needed
FROM node:18-alpine3.15 AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
# Install pnpm
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
 
# Build the app with cache dependencies
FROM node:18-alpine3.15 AS builder
# Install pnpm
RUN npm install -g pnpm
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build
 
# Production image, copy all the files and run next
FROM node:18-alpine3.15 AS runner
 
# Install pnpm
RUN npm install -g pnpm
 
# Set working directory
WORKDIR /usr/src/app
 
COPY package.json pnpm-lock.yaml ./
 
RUN pnpm install --prod --frozen-lockfile
 
COPY --from=builder /app/dist ./dist
 
# Expose the port the app runs on
EXPOSE 3000
 
CMD [ "node", "dist/main" ]