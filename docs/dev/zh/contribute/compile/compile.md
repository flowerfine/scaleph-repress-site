# 编译
当开发者需要手动编译项目时，可以参考此文档。

## 说明

不同的编译方式和环境可能会获得不同的编译结果，甚至会编译失败！`scaleph` 拥有多个编译场景：

- 本地 IDE 开发。
- 基于 github actions 的 [CI](https://github.com/flowerfine/scaleph/blob/dev/.github/workflows/ci.yml) 流程。
- 基于 github actions 的 [CD](https://github.com/flowerfine/scaleph/actions/workflows/release-master-docker-scaleph.yml) 流程。

为确保 3 个场景的编译环境、命令和结果的一致性，开发者应首先参考 github actions 的 CI 流程，确定编译环境和编译命令：

* [maven](https://github.com/flowerfine/scaleph/actions/workflows/ci-maven.yml)
* [npm](https://github.com/flowerfine/scaleph/actions/workflows/ci-npm.yml)
* [docker](https://github.com/flowerfine/scaleph/actions/workflows/ci-docker-build.yml)

## 本地编译

### 服务端

```shell
# 编译服务端。编译完成后，可以在 scaleph-dist/target/ 获取后缀为 .tar.gz 的安装包
./mvnw -B -U -T 4C clean package -Pdist -Dfast

# 启动命令
# 参考 https://github.com/flowerfine/scaleph/blob/dev/tools/docker/build/scaleph-api/Dockerfile
$SCALEPH_HOME/bin/scaleph.sh start-foreground
```

### 前端

```shell
# 安装依赖。如果网络不好，可以配置国内 npm 包镜像源
npm install --force
# 执行编译。编译完成后，可以在 scaleph-ui-react/dist 目录获取编译结果
npm run build --prod
# 启动前端
# 参考 https://github.com/flowerfine/scaleph/blob/dev/tools/docker/build/scaleph-ui-react/Dockerfile
# nginx 配置参数 https://github.com/flowerfine/scaleph/blob/dev/tools/docker/build/scaleph-ui-react/nginx.conf.template
```

## 容器内编译

通过容器内编译，可以统一编译环境，无需用户准备对应版本的 JDK 和 Node，避免 `scaleph` 在本地开发、CI 环节和二次开发编译打包因为环境问题导致行为不一致。

类似的参考：

* doris。[使用 Docker 开发镜像编译（推荐）](https://doris.apache.org/zh-CN/docs/install/source-install/compilation-with-docker)
* ranger。[build_ranger_using_docker.sh](https://github.com/apache/ranger/blob/master/build_ranger_using_docker.sh)

开发者需安装如下环境：

- [Docker](https://docs.docker.com/get-docker/)。下载并安装 Docker，已有 Docker 环境时，使用 `docker version` 和 `docker compose version` 检查对应的版本，更新为最新版本。

```shell
# 编译服务端
docker run -it --rm \
--name scaleph-api-build \
-v "$(pwd)":/usr/src/mymaven \
-w /usr/src/mymaven \
maven:3.8-eclipse-temurin-11 \
mvn -B -U -T 4 clean package -DskipTests -Dfast -am --projects scaleph-api

# 启动服务端
# 参考 https://github.com/flowerfine/scaleph/blob/dev/tools/docker/build/scaleph-api/Dockerfile

# 编译前端
# 安装依赖
docker run -it --rm \
--name scaleph-ui-react-build \
-v "$(pwd)/scaleph-ui-react":/usr/src/mymaven \
-w /usr/src/mymaven/ \
node:16 \
npm install --force
# 编译
docker run -it --rm \
--name scaleph-ui-react-build \
-v "$(pwd)/scaleph-ui-react":/usr/src/mymaven \
-w /usr/src/mymaven/ \
node:16 \
npm run build --prod
# 启动前端
# 参考 https://github.com/flowerfine/scaleph/blob/dev/tools/docker/build/scaleph-ui-react/Dockerfile
# nginx 配置参数 https://github.com/flowerfine/scaleph/blob/dev/tools/docker/build/scaleph-ui-react/nginx.conf.template
```

## 镜像制作

`scaleph` 基于 Docker 提供快速的开发和测试运行环境，本文将介绍如何在本地构建镜像。

在 `$SCALEPH_HOME/tools/docker/build` 目录下有 `docker-compose-build-api.yml` 和 `docker-compose-build-ui.yml`文件，分别用于构建 `scaleph-api` 和 `scaleph-ui-react` 模块。docker compose 中添加了程序运行依赖的 `mysql`、`redis` 、`minio` 等环境。

```shell
# clone 源码
git clone https://github.com/flowerfine/scaleph.git
cd scaleph/tools/docker/build/scaleph

# 编译 scaleph-api 镜像
docker compose -f docker-compose-build-api.yml build
# 测试 scaleph-api 镜像编译结果
docker compose -f docker-compose-build-api.yml up -d

# 编译 scaleph-ui-react 镜像
docker compose -f docker-compose-build-ui.yml build
# 测试 scaleph-ui-react 镜像编译结果
docker compose -f docker-compose-build-ui.yml up -d
```
