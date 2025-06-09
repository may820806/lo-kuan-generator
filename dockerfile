# 使用 Node 做建置階段
FROM node:20 AS builder

WORKDIR /app

# 複製 package.json 和 yarn.lock（加速建置）
COPY package*.json ./

# 安裝依賴並建置
RUN npm install

# 複製專案
COPY . .

RUN npm run build