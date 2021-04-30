FROM node:14.15.3-alpine3.10 as base
COPY yarn.lock yarn.lock
COPY package.json package.json
RUN yarn install

FROM base as dev
ADD . .
VOLUME [ "/src" ]
CMD ["yarn", "start:dev"]
EXPOSE 3000