FROM node:20-alpine AS base

WORKDIR /app
COPY . .

FROM base AS dev

RUN npm install

FROM base AS build

COPY --chown=node:node --from=dev /app/node_modules ./node_modules

RUN npm run build
RUN npm install --production --frozen-lockfile

FROM base AS prod

COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

USER node

CMD ["npm", "run", "start:prod"]