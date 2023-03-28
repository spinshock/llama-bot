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
RUN turbo prune --scope=llama-bot-client --docker

# COPY --chown=node:node ./package*.json ./

# RUN npm ci



# RUN npm run build

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

COPY --chown=node:node packages/llama-bot-client/tsconfig.json .
COPY --chown=node:node packages/llama-bot-client/tsconfig.node.json .
COPY --chown=node:node packages/llama-bot-client/vite.config.ts .
COPY --chown=node:node packages/llama-bot-client/index.html .
COPY --chown=node:node ./packages/llama-bot-client/src/ ./src/
COPY --chown=node:node ./packages/llama-bot-client/public/ ./public/

RUN turbo run build --filter=llama-bot-client...

FROM nginx:1.21.3-alpine

LABEL maintainer="Yavor Filipov <yavorfilipov9@gmail.com> (@spinshock)"

COPY ./packages/llama-bot-client/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=installer /app/packages/llama-bot-client/dist /usr/share/nginx/html

# PORT to be used by nginx
ARG PORT=80
ENV PORT=${PORT}
# Url to API in reverse proxy
ARG API_URL
ENV API_URL=${API_URL}

CMD sed -i -e 's~$PORT~'"$PORT"'~g' /etc/nginx/conf.d/default.conf && sed -i -e 's~$API_URL~'"$API_URL"'~g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
