# 说明

## 部署准备

* 准备容器和 kubernetes 环境
  * Docker
  * Kubernetes
  * [Helm](https://helm.sh/zh/docs/intro/install/)。类似 Java 有 maven、gradle，Node 有 npm，Helm 提供在 Kubernetes 部署应用功能。
* 安装 Kubernetes 所需依赖
  * Nginx Ingress Controller。推荐安装。在 Kubernetes 中运行 `Flink` 或 `Doris`，如果想访问 `Flink` 或 `Doris` 的 web，需要安装。
  * Flink Kubernetes Operator。体验 `Flink` 任务如 `Jar`、`SQL`、`SeaTunnel`（Flink 引擎）需安装
  * Doris Operator。体验 `Doris` 需安装
  * 监控
    * Prometheus Operator。`scaleph` 不依赖，推荐安装
    * Grafana Operator。`scaleph` 不依赖，推荐安装