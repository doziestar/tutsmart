# Common build stage
FROM node:18-alpine3.15 as common-build-stage

RUN mkdir -p /app

COPY package*.json ./app

RUN yarn install --production=false
# RUN yarn add cross-env

COPY . ./app

WORKDIR /app


ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_NAME=${DB_NAME}

EXPOSE 3000

# Development build stage
FROM common-build-stage as development-build-stage

RUN chmod +x /app/docker-entrypoint.sh

ENTRYPOINT [ "docker-entrypoint.sh" ]

ENV NODE_ENV development

CMD ["yarn", "dev"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["yarn", "start"]
