# 前置需求

`scaleph` 使用常用的 Java 开发框架的开发的数据平台 Admin 管理系统，使用、开发、部署、运维和问题定位都需要一定的技能要求。

`scaleph` 对接 [Flink Kubernetes Operator](https://nightlies.apache.org/flink/flink-kubernetes-operator-docs-stable/)，实现 [Flink](https://flink.apache.org/) 任务以一种云原生方式运行在 [Kubernetes](https://kubernetes.io/) 上。`scaleph` 同时支持 Jar、SQL 和 SeaTunnel（Flink 引擎）3 种类型的任务，满足数据集成和 ETL 2 种业务场景。

`scaleph` 的用户分为 2 类：

* 维护者。需处理安装部署、问题排查、开发升级等
* 使用者。进行数据集成、开发工作

`scaleph` 系统维护者需了解一下 `scaleph` 底层设计、安装部署、特性缺陷等知识，而这些使用者无需了解。

## 容器和 Kubernetes

`scaleph` 本身和 `Flink` 都运行在容器和 Kubernetes 中，用户需对容器和 Kubernetes 有所了解，掌握一定技能：

* docker 和 kubernetes 安装
* 日志查看功能
  * 登陆容器，查看日志信息
  * 使用 `kubectl` 查看 kubernetes 中 pod 日志
* 状态查询
  * 查询容器状态
  * 查询 kubernetes 中 pod 状态。当 Flink 首次运行时，本地缺少镜像，kubernetes 会自动下载镜像。网络环境不好时，任务会长时间卡在镜像拉取阶段

## Flink

Flink 支持多种资源方式，用户需了解 Flink 社区提供的 Docker 和 Kubernetes 部署解决方案：

* Standalone。`Standalone` 方式仅仅使用容器和 Kubernetes 作为服务器资源提供者，Flink 无法感知到自己运行在容器或 Kubernetes 中。Flink 运行所需要的资源都需要用户手动管理和维护
  * [Docker](https://nightlies.apache.org/flink/flink-docs-release-1.19/docs/deployment/resource-providers/standalone/docker/)
  * [Kubernetes](https://nightlies.apache.org/flink/flink-docs-release-1.19/docs/deployment/resource-providers/standalone/kubernetes/)
* YARN
* [Native Kubernetes](https://nightlies.apache.org/flink/flink-docs-release-1.19/docs/deployment/resource-providers/native_kubernetes/)。Flink 直接访问 Kubernetes，申请和管理资源。

用户在使用 `scaleph` 运行 Flink 任务前，需对 Flink 运行在容器和 Kubernetes 原理有个基础了解，实践 Flink 文档 example，确定自己提供的容器和 Kubernetes 环境能够运行 Flink 任务。

## Flink Kubernetes Operator

Flink Kubernetes Operator 运行所需，用户需实践 Flink Kuberenetes Operator 安装、任务提交流程，在使用 `scaleph` 前对 Flink Kubernetes Operator 有个了解：

* [Quick Start](https://nightlies.apache.org/flink/flink-kubernetes-operator-docs-release-1.8/docs/try-flink-kubernetes-operator/quick-start/)

## SeaTunnel

SeaTunnel 自身支持 3 种运行引擎：Flink、Spark 和 Zeta，同时也包含大量 connectors。用户需实践 SeaTunnel on Flink 的运行方式：

* [Install connectors plugin](https://seatunnel.apache.org/docs/2.3.5/start-v2/locally/deployment#step-3-install-connectors-plugin)
* [Set Up with Kubernetes](https://seatunnel.apache.org/docs/2.3.5/start-v2/kubernetes/)

## Doris

* [基于 Doris-Operator 部署](https://doris.apache.org/zh-CN/docs/install/cluster-deployment/k8s-deploy/install-operator)



