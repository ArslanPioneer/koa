# resum Dockerfile

#指定node镜像对项目进行依赖安装和打包
FROM node:10.16.0 AS builder
# 将容器的工作目录设置为/app(当前目录，如果/app不存在，WORKDIR会创建/app文件夹)
WORKDIR /app 
COPY package.json package-lock.json /app/ 
RUN npm config set registry "https://registry.npm.taobao.org/" \
    && npm install

CMD [ "npm" ,"run start:prod" ]

#暴露容器80端口
EXPOSE 8080

