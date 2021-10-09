FROM node:14.17.6-alpine AS build

WORKDIR /
RUN mkdir -p /app
RUN chown -R node:node /app

USER node
WORKDIR /app

COPY --chown=node:node ./package*.json .

RUN npm ci

COPY --chown=node:node tsconfig.json .
COPY --chown=node:node ./src/ ./src/

RUN npm run build

FROM node:14.17.6-alpine

LABEL maintainer="Yavor Filipov <yavorfilipov9@gmail.com> (@spinshock)"

USER node
WORKDIR /app

COPY --from=build --chown=node:node app/dist .

EXPOSE 5000
ENV NODE_ENV=${BOT_NODE_ENV}

CMD [ "node", "--unhandled-rejections=strict", "index.js" ]
