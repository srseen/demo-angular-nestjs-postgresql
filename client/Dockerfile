# build stage
FROM node:22-alpine AS build

WORKDIR /app

# คัดลอกไฟล์ dependency ก่อน (cache ได้)
COPY package*.json ./

# ติดตั้ง dependency
RUN npm install

# ติดตั้ง Angular CLI
RUN npm install -g @angular/cli

# คัดลอก source code ทั้งหมด
COPY . .

# สร้าง production build
RUN npm run build -- --configuration production

# production stage
FROM nginx:stable-alpine

# ลบไฟล์ index.html ที่มีอยู่ใน nginx
RUN rm /usr/share/nginx/html/*

# ลบ config เดิมของ nginx
RUN rm /etc/nginx/conf.d/default.conf

# คัดลอก nginx.conf ของเราเข้าไป
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 🔍 ตรวจสอบว่า build ออกมาที่ dist/client หรือ dist/browser
# ใช้ path นี้ตามที่ angular.json ระบุไว้
COPY --from=build /app/dist/client/browser /usr/share/nginx/html
