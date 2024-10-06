# 前置准备

`scaleph` 使用容器构建本地开发，通过容器快速构建开发、体验环境，**生产环境需要替换**。`scaleph-api` 运行所需：

* mysql。`scaleph` 用到的数据库，sql 语句位于 `tools/docker/mysql/init.d`。
  * scaleph。主库。包含日志类表，quartz 表，scaleph 核心表。`scaleph-api` 配置了多数据源，生产环境用户为 3 类表配置不同的数据库。
  * sakura。`scaleph` 实现的 Flink catalog 使用的数据库。
* redis。用户权限模块使用。
* minio。`scaleph` 文件上传，Flink 任务运行期间产生的 checkpoints、savepoints 和 ha 数据。`scaleph` 未于 minio 深度绑定，用户可以按需切换 HDFS、OSS 等。
  * `scaleph` 在提供的 minio 默认容器中创建了 `scaleph` 和 `scaleph-public` 2 个 bucket，其中 `scaleph-public` 可通过 http 匿名访问。访问方式为：`http://$MINIO_IP:$MINIO_PORT/scaleph-public/$FILE_NAME`，如 `http://localhost:9000/scaleph-public/scaleph.svg`。

* [gravitino](https://github.com/datastrato/gravitino)。元数据。
  * mysql catalog 需要添加 jdbc 驱动，通过 volume 挂载到 `${gravitino_home}/catalogs/jdbc-mysql/libs`，gravitino 0.5.0 版本 mysql 8.x 驱动需选择较高版本，低版本有兼容性问题。其他类型数据源 如postgresql 与此同理


拉取镜像

* `scaleph` 系统镜像
  * `docker pull ghcr.io/flowerfine/scaleph/scaleph-api:v2.0.5`
  * `docker pull ghcr.io/flowerfine/scaleph/scaleph-ui-react:v2.0.5`
  * `docker pull ghcr.io/flowerfine/scaleph/mysql:v2.0.5`
* `scaleph` 依赖镜像
  * `docker pull bitnami/mysql:8.0`。与 `ghcr.io/flowerfine/scaleph/mysql:v2.0.5` 功能重叠，`ghcr.io/flowerfine/scaleph/mysql:v2.0.5` 内置了 scaleph 初始 sql。
  * `docker pull bitnami/redis:7.0.10`
  * `docker pull bitnami/minio:2023.3.24`
  * `docker pull datastrato/gravitino:0.5.0`
* Flink 和 SeaTunnel 运行镜像
  * Jar
    * `docker pull flink:1.18`
    * `docker pull ghcr.io/flowerfine/scaleph/scaleph-file-fetcher:latest`
  * SQL
    * `docker pull ghcr.io/flowerfine/scaleph-sql-template:1.18`
    * `docker pull ghcr.io/flowerfine/scaleph-sql-template:1.17`
  * SeaTunnel
    * `docker pull ghcr.io/flowerfine/scaleph-seatunnel:2.3.5-flink-1.16`
