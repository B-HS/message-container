FROM oven/bun:1
WORKDIR /app
COPY package.json bun.lock ./
COPY apps/server/package.json apps/server/package.json
RUN bun install --production --filter '@message-container/server'
COPY apps/server apps/server
WORKDIR /app/apps/server
ENV NODE_ENV=production
RUN mkdir -p /data && chown bun:bun /data
USER bun
EXPOSE 33000
CMD ["bun", "index.ts"]
