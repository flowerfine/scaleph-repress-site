# Docker

`scaleph` 产出为镜像，部署方式以 docker 为主。镜像发布在 github packages 中，网络不畅情况下，可通过：

* [设置代理](../prepare/docker/proxy)。需要科学上网工具
* [导入镜像](../prepare/docker/export&import)。在网络好的地方下载镜像，导出镜像为压缩文件，传输到服务器，从压缩文件中导入镜像
* 本地编译镜像

## docker

`scaleph` 运行依赖如下，其中 minio 作为文件存储中间件，Flink 任务 checkpoints 数据存储：

- redis
- mysql
- minio
- [gravitino](https://github.com/datastrato/gravitino)。元数据

`scaleph` 应用本身由 2 个组件组成：

- [scaleph-api](https://github.com/flowerfine/scaleph/pkgs/container/scaleph%2Fscaleph-api)。服务端。
  - 如果使用 docker 在本地启动的 MySQL、Redis、Minio 和 Gravitino，地址都是 `localhost` 或 `127.0.0.1`。如果 Kubernetes 集群不是本地如远程服务器上的开发集群，任务运行在 Kubernetes 中尝试通过  `localhost` 或 `127.0.0.1` 访问 MySQL、Redis、Minio 和 Gravitino 服务就会出现连接失败问题。在启动服务端时，如果是 `localhost` 或 `127.0.0.1` 地址，需替换成本地的 IP 地址。
  - 可通过 `MYSQL_HOST`、`MYSQL_PORT`、`MYSQL_USERNAME`、`MYSQL_PASSWORD`、`REDIS_HOST`、`REDIS_PORT`、`REDIS_PASSWORD`、`MINIO_ENDPOINT`、`MINIO_ACCESS_KEY`、`MINIO_SECRET_KEY`、`GRAVITINO_URL` 更改配置
- [scaleph-ui-react](https://github.com/flowerfine/scaleph/pkgs/container/scaleph%2Fscaleph-ui-react)。前端。

下载镜像，一键启动

```shell
# clone scaleph 源码
git clone https://github.com/flowerfine/scaleph.git --depth 1
# 切换到 2.0.5 分支
git fetch origin 2.0.5
git checkout 2.0.5

# 将镜像 tag 从 latest 切换到 v2.0.5。latest 为开发中的最新版本
# 注意替换 MINIO_ENDPOINT 中的 IP
cd scaleph/tools/docker/deploy/scaleph

# 下载依赖 && scaleph 组件
docker compose pull

# 一键启动依赖 && scaleph 组件
docker compose up -d

# 关闭 scaleph
docker compose down
```

:::warning 注意

使用前需替换 `docker-compose.yaml` 中的 `MINIO_ENDPOINT` 中的 `MINIO_IP` 变量为真实的 Minio 地址，不要使用 `localhost` 或 `127.0.0.1`

:::

在所有容器正常启动后，用户即可访问 [http://localhost:8096](http://localhost:8096/)，用户名密码为 `sys_admin/123456`。