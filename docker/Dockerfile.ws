FROM oven/bun:1

WORKDIR /usr/src/app

COPY ./package.json ./bun.lock ./
COPY ./packages ./packages
COPY ./apps/ws ./apps/ws

RUN bun install

ENV PORT=8080
EXPOSE 8080

CMD ["bun", "run", "start:ws"]
