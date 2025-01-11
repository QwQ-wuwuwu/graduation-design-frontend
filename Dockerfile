# 使用 Nginx 作为静态文件的 Web 服务器
FROM nginx:alpine

# 将 React 构建后的静态文件复制到 Nginx 的默认静态文件目录
COPY /dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]
