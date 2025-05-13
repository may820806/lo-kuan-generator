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

# 用來包image而已 不是用在host domain
FROM nginx:alpine AS production

# 把建置好的 dist 檔案放到 nginx 的根目錄
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
