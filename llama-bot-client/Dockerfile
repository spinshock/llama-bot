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
COPY --chown=node:node ./public/ ./public/

RUN npm run build

FROM nginx:1.21.3-alpine

LABEL maintainer="Yavor Filipov <yavorfilipov9@gmail.com> (@spinshock)"

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

# PORT to be used by nginx
ARG PORT
# Url to API in reverse proxy
ARG API_URL

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && sed -i -e 's/$API_URL/'"$API_URL"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
