FROM node:16.17.0-alpine AS build

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

FROM node:16.17.0-alpine

LABEL maintainer="Yavor Filipov <yavorfilipov9@gmail.com> (@spinshock)"

USER node
WORKDIR /app

COPY --from=build --chown=node:node app/dist ./dist
COPY --from=build --chown=node:node app/node_modules ./node_modules

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

ENV DATABASE_URL=${DATABASE_URL}

EXPOSE 8080

CMD [ "node", "--unhandled-rejections=strict", "dist/index.js" ]
