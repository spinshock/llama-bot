FROM node:16.13.0-alpine AS build

WORKDIR /
RUN mkdir -p /app
RUN chown -R node:node /app

USER node
WORKDIR /app

COPY --chown=node:node ./package*.json ./

RUN npm ci

COPY --chown=node:node tsconfig.json .
COPY --chown=node:node ./src/ ./src/

RUN npm run build

FROM node:16.13.0-alpine

LABEL maintainer="Yavor Filipov <yavorfilipov9@gmail.com> (@spinshock)"

WORKDIR /
RUN mkdir -p /app
RUN chown -R node:node /app

USER node
WORKDIR /app

COPY --from=build --chown=node:node /app/dist/ ./dist/
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node ./config/ ./config/
COPY --chown=node:node ./assets/ ./assets/

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

ENV DATABASE_URL=${DATABASE_URL}

ENV DISCORD_TOKEN=${DISCORD_TOKEN}

ENV TTV_CLIENT_ID=${TTV_CLIENT_ID}

ENV TTV_CLIENT_SECRET=${TTV_CLIENT_SECRET}

CMD [ "node", "--unhandled-rejections=strict", "--trace-deprecation=true", "dist/bot.js" ]
