ARG NODE_VERSION=16.15.0

FROM node:${NODE_VERSION}-alpine as builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn next build

FROM node:${NODE_VERSION}-alpine AS prod
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/next.config.js ./next.config.js

USER nextjs

EXPOSE 3000

ENV PORT 3000


# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# RUN npx next telemetry disable

CMD ["node", "server.js"]

