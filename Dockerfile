# 使用 Nginx 作为静态文件的 Web 服务器
FROM nginx:latest
# FROM nginx:alpine

# 本地已经下载了 Nginx 和 Brotli 的源码包
# COPY nginx-1.21.4.tar.gz /tmp/
# COPY brotli-1.0.9.tar.gz /tmp/

# # 安装构建工具和依赖项
# RUN apk add --no-cache \
#     gcc \
#     libc-dev \
#     make \
#     curl \
#     git \
#     zlib-dev \
#     pcre-dev \
#     openssl-dev \
#     build-base \
#     && cd /tmp && \
#     tar -xvzf nginx-1.21.4.tar.gz && \
#     tar -xvzf brotli-1.0.9.tar.gz && \
#     cd nginx-1.21.4 && \
#     ./configure --with-compat --add-dynamic-module=/brotli-1.0.9 && \
#     make && \
#     make install && \
#     apk del build-base

COPY nginx.conf /etc/nginx/nginx.conf

# 将 React 构建后的静态文件复制到 Nginx 的默认静态文件目录
COPY /dist /usr/share/nginx/html

# 暴露端口
EXPOSE 3001

# 启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]

# docker run -d --name graduation-frontend -v /root/graduation-design-frontend/nginx.conf:/etc/nginx/nginx.conf -v /root/graduation-design-frontend/dist://usr/share/nginx/html -p 3001:3001 graduation-frontend