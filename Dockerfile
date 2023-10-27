FROM node:16.18.1-alpine3.16 as builder

ENV NODE_ENV build

WORKDIR /home/node/app


COPY --chown=node:node . /home/node/app

RUN npm ci \
    && npm run build

USER node

# ---

FROM node:16.18.1-alpine3.16 as production

ENV NODE_ENV production

WORKDIR /home/node/app
RUN mkdir -p /home/node/app/logs
RUN chmod -R 777 /home/node/app/logs
COPY --from=builder /home/node/app/*.json /home/node/app/
COPY --from=builder /home/node/app/*.ts /home/node/app/
# COPY --from=builder /home/node/app/ormconfig.ts /home/node/app/
COPY --from=builder /home/node/app/dist /home/node/app
COPY --from=builder /home/node/app/config.staging.yaml /home/node/app/
COPY --from=builder /home/node/app/letsencrypt /home/node/app/letsencrypt

RUN npm ci
USER node

CMD ["node", "./src/main.js"]