# 使用 Node 做建置階段
FROM node:20  AS builder

RUN corepack enable

WORKDIR /app

# 複製專案
COPY . .

# 安裝依賴並建置
RUN yarn install
RUN yarn build

# 用 nginx 做為靜態檔案伺服器
FROM nginx:alpine AS production

# 把建置好的 dist 檔案放到 nginx 的根目錄
COPY --from=builder /app/dist /usr/share/nginx/html

# 覆蓋 nginx 預設設定，讓它支援 SPA fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
