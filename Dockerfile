# 使用 Nginx 作为静态文件的 Web 服务器
FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

# 将 React 构建后的静态文件复制到 Nginx 的默认静态文件目录
COPY /dist /usr/share/nginx/html

# 暴露端口
EXPOSE 3001

# 启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]

# docker run -d --name graduation-frontend -v /root/graduation-design-frontend/nginx.conf:/etc/nginx/nginx.conf -v /root/graduation-design-frontend/dist://usr/share/nginx/html -p 3001:3001 graduation-frontend