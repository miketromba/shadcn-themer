# The theme screenshot renderer: @miketromba/screenshot-service on Debian's
# Chromium, run as its own private service (the web app's SCREENSHOT_SERVICE_URL).
FROM oven/bun:1-slim

RUN apt-get update \
	&& apt-get install -y --no-install-recommends \
		chromium \
		ca-certificates \
		fontconfig \
		fonts-liberation \
		fonts-noto-core \
		fonts-noto-color-emoji \
	&& rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_DOWNLOAD=true \
	PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium \
	NODE_ENV=production

WORKDIR /app
RUN bun add @miketromba/screenshot-service@0.4.1 puppeteer@24 puppeteer-cluster@0.24

CMD ["bun", "node_modules/@miketromba/screenshot-service/src/server.ts"]
