FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm@8

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Create a non-root user
RUN addgroup -g 1001 -S nodejs &&\
    adduser -S nextjs -u 1001

# Change ownership of the working directory
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000

CMD ["sh", "-c", "pnpm install && pnpm run dev"]