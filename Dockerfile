# resum Dockerfile

#指定node镜像对项目进行依赖安装和打包
FROM node:10.15.3  
# 将容器的工作目录设置为/app(当前目录，如果/app不存在，WORKDIR会创建/app文件夹)
WORKDIR /app 
COPY package.json package-lock.json /app/
RUN npm config set registry "https://registry.npm.taobao.org/" \
    && npm install
COPY . /app/
EXPOSE 9000

CMD  ["npm run start:prod"]




