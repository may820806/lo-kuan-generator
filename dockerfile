# 使用 Node 做建置階段
FROM node:20 AS builder

RUN corepack enable

WORKDIR /app

# 複製專案
COPY . .

# 安裝依賴並建置
RUN yarn install
RUN yarn build && ls dist

# 用 nginx 做為靜態檔案伺服器
FROM nginx:alpine AS production

# 清除 Nginx 預設的 HTML 檔案
RUN rm -rf /usr/share/nginx/html/*

# 把建置好的 dist 檔案放到 nginx 的根目錄
COPY --from=builder /app/dist /usr/share/nginx/html

# 加入自訂的 Nginx 設定
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
