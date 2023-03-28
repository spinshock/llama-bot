FROM node:16.17.0-alpine AS build
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /
RUN mkdir -p /app
RUN chown -R node:node /app

USER node
WORKDIR /app

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

RUN npm install -g turbo@1.8.0
COPY --chown=node:node . .
RUN turbo prune --scope=llama-bot-api --docker

FROM node:16.17.0-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /
RUN mkdir -p /app
RUN chown -R node:node /app

USER node
WORKDIR /app
COPY --from=build --chown=node:node /app/out/package-lock.json .
COPY --from=build --chown=node:node /app/out/json/ .
RUN npm ci

COPY --from=build --chown=node:node /app/out/full/ .
COPY turbo.json turbo.json

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

RUN npm install -g turbo@1.8.0

RUN turbo run build --filter=llama-bot-api...

FROM node:16.17.0-alpine

LABEL maintainer="Yavor Filipov <yavorfilipov9@gmail.com> (@spinshock)"

USER node
WORKDIR /app

COPY --from=installer --chown=node:node app/packages/llama-bot-api/dist ./dist
COPY --from=installer --chown=node:node app/node_modules ./node_modules

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

ENV DATABASE_URL=${DATABASE_URL}

EXPOSE 8080

CMD [ "node", "--unhandled-rejections=strict", "dist/index.js" ]
