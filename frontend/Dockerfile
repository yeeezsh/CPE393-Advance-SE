FROM node:14-alpine3.12 as base
COPY yarn.lock yarn.lock
COPY package.json package.json
RUN yarn install

FROM base as dev
ADD . .
VOLUME [ "/src" ]
CMD ["yarn", "start"]
EXPOSE 3000

FROM base as build
ARG REACT_APP_GRAPHQL_ENDPOINT
ENV REACT_APP_GRAPHQL_ENDPOINT=${REACT_APP_GRAPHQL_ENDPOINT}
ADD . .
RUN yarn build


FROM nginx:alpine as nginx
COPY --from=build build/ /var/www
COPY --from=build public/ /var/www/public
COPY /server/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
