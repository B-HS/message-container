FROM oven/bun:1 AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

FROM oven/bun:1
WORKDIR /app
COPY --from=deps /app/node_modules node_modules
COPY package.json tsconfig.json index.ts ./
COPY lib lib
COPY db db
COPY dto dto
COPY service service
COPY compose compose
COPY route route
COPY drizzle drizzle
ENV NODE_ENV=production
EXPOSE 3000
CMD ["bun", "index.ts"]
