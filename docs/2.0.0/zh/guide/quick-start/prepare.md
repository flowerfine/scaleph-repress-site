# 前置准备

`scaleph-api` 运行所需：

* mysql
* redis
* minio

Flink 运行所需

* [Native Kubernetes](https://nightlies.apache.org/flink/flink-docs-release-1.18/docs/deployment/resource-providers/native_kubernetes/)

Flink Kubernetes Operator 运行所需

* [Quick Start](https://nightlies.apache.org/flink/flink-kubernetes-operator-docs-release-1.7/docs/try-flink-kubernetes-operator/quick-start/)

SeaTunnel 运行所需

* [Install connectors plugin](https://seatunnel.apache.org/docs/2.3.3/start-v2/locally/deployment#step-3-install-connectors-plugin)
* [Set Up with Kubernetes](https://seatunnel.apache.org/docs/2.3.3/start-v2/kubernetes/)

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
