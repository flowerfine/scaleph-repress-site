# 前置准备

`scaleph-api` 运行所需：

* mysql
* redis
* minio

拉取镜像

* `scaleph` 系统镜像
  * `docker pull ghcr.io/flowerfine/scaleph/scaleph-api:2.0.0`
  * `docker pull ghcr.io/flowerfine/scaleph/scaleph-ui-react:2.0.0`
  * `docker pull ghcr.io/flowerfine/scaleph/mysql:2.0.0`
* `scaleph` 依赖镜像
  * `docker pull bitnami/mysql:8.0`
  * `docker pull bitnami/redis:7.0.10`
  * `docker pull bitnami/minio:2023.3.24`
* Flink 和 SeaTunnel 运行镜像
  * Jar
    * `docker pull flink:1.18`
    * `docker pull ghcr.io/flowerfine/scaleph/scaleph-file-fetcher:2.0.0`
  * SQL
    * `docker pull ghcr.io/flowerfine/scaleph-sql-template:1.18`
    * `docker pull ghcr.io/flowerfine/scaleph-sql-template:1.17`
  * SeaTunnel
    * `docker pull ghcr.io/flowerfine/scaleph-seatunnel:2.3.3-flink-1.15`
