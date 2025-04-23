ARG APP_PATH=/src/app
ARG NODE_VERSION=22.4.1

# USE A BASE IMAGE
FROM node:${NODE_VERSION}-alpine as base

RUN apk add --no-cache libc6-compat

FROM base as builder

ARG APP_PATH

# CREATE APP DIRECTORY
WORKDIR $APP_PATH

COPY package.json .
COPY yarn.lock .

# INSTALL APP DEPENDENCIES
RUN yarn install 

#  BUNDLE APP SOURCE
COPY . .

# CREATES A DIST FOLDER WITH THE PRODUCTION BUILD
RUN yarn build

FROM base as runner

ARG APP_PATH

WORKDIR $APP_PATH

ENV NODE_ENV production

COPY --from=builder /src/app/dist /src/app/dist
COPY --from=builder /src/app/package.json /src/app/package.json
COPY --from=builder /src/app/yarn.lock /src/app/yarn.lock

# INSTALL APP DEPENDENCIES EXCLUDING DEV DEPENDENCIES
RUN yarn install

# START THE SERVER
CMD [ "yarn", "start" ]
