FROM node:14-alpine3.12 as base
COPY yarn.lock yarn.lock
COPY package.json package.json
RUN yarn install

FROM base as dev
ADD . .
VOLUME [ "/src" ]
CMD ["yarn", "start"]
EXPOSE 3000