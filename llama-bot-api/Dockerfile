FROM node:14.17.6-alpine AS build

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

FROM node:14.17.6-alpine

LABEL maintainer="Yavor Filipov <yavorfilipov9@gmail.com> (@spinshock)"

USER node
WORKDIR /app

COPY --from=build --chown=node:node app/dist ./dist
COPY --from=build --chown=node:node app/node_modules ./node_modules

EXPOSE 5000

ARG DATABASE_URL
ENV DATABASE_URL ${DATABASE_URL}

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

CMD [ "node", "--unhandled-rejections=strict", "dist/index.js" ]
