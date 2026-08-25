FROM oven/bun:1 AS builder
WORKDIR /app
COPY package.json bun.lock ./
COPY apps/web/package.json apps/web/package.json
RUN bun install --filter '@message-container/web'
COPY apps/web apps/web
ENV NEXT_TELEMETRY_DISABLED=1
RUN cd apps/web && bun run build

FROM oven/bun:1
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001
ENV HOSTNAME=0.0.0.0
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
EXPOSE 3001
CMD ["bun", "apps/web/server.js"]
