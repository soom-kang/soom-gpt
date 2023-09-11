ARG nodeVersion
ARG devPort
ARG author

FROM node:${nodeVersion}

LABEL author=${author}

RUN corepack enable

RUN corepack prepare pnpm@latest --activate

WORKDIR /app_dev

COPY . .

ENV TZ=Asia/Seoul

RUN pnpm install

EXPOSE ${devPort}

CMD ["pnpm", "dev"]