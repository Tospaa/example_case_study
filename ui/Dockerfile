FROM node:16.17.0-bullseye as build
ARG APP_HOME=/usr/src/ui
COPY . $APP_HOME
WORKDIR $APP_HOME
RUN npm i && npx ng build --configuration=production

FROM nginx:1.23.1 as run
ARG APP_HOME=/usr/src/ui
ARG HTML_HOME=/usr/share/nginx/html
WORKDIR $HTML_HOME
COPY --from=build $APP_HOME/dist/ui/* $HTML_HOME/
