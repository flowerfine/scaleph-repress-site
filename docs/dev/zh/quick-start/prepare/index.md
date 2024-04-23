# 说明

## 试用地址

* [scaleph](http://129.204.156.150:8096)。使用 `sys_admin`/`123456` 登陆。服务器资源有限，若无法访问，请联系 `kalencaya`
* [doc.html](http://129.204.156.150:8080/scaleph/doc.html)。`scaleph-api` 服务端 OpenAPI 地址

## 部署准备

* 准备容器和 kubernetes 环境
  * Docker
  * Kubernetes
  * [Helm](https://helm.sh/)。类似 Java 有 maven、gradle，Node 有 npm，Helm 提供在 Kubernetes 部署应用功能。
* 安装 Kubernetes 所需依赖
  * Prometheus Operator
  * Grafana Operator
  * Nginx Ingress Controller
  * Flink Kubernetes Operator
  * Doris Operator

