FROM node:alpine

RUN apk add --no-cache chromium nss freetype freetype-dev harfbuzz ca-certificates ttf-freefont

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN apk add libjpeg libstdc++
RUN wget https://github.com/gmitirol/qpdf-alpine/releases/latest/download/qpdf-bin-amd64.tgz
RUN tar xzf qpdf-bin-amd64.tgz -C /

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "start"]