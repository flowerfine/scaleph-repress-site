# 说明

`scaleph` 目标是建立以 Kubernetes 为底座的数据平台，开发者和体验用户需准备好一个简易的开发、测试 Kubernetes 环境。`scaleph` 的开发同学总结了自己本地搭建 Kubernetes 的经验输出了相关的文档，分享了自己的踩坑经验。

* macOS 用户。推荐使用 [Docker Desktop](./docker-desktop)。
* windows 用户。推荐 windows 虚拟机，在 linux 中运行 [minikube](./minikube)。
* 1 ～ 多台 linux 服务器。推荐 [k3s](./k3s)。

像 `docker-desktop`、`minikube` 和 `k3s` 都是支持多种操作系统，如 macOS 上运行 minikube 和 k3s。本地 Kubernetes 开发、测试环境解决方案很多，不是一定要遵守上述推荐。用户可以选择自己喜欢的工具搭建 Kubernetes 环境：

* [Docker Desktop](https://docs.docker.com/desktop/)
* [minikube](https://minikube.sigs.k8s.io/docs/start/)
* [k3s](https://docs.k3s.io/zh/)
  * [k3d](https://k3d.io/v5.6.0/#related-projects)。Docker 中运行 k3s 工具
  * [AutoK3s](https://github.com/cnrancher/autok3s)。AutoK3s 是用于简化 K3s 集群管理的轻量级工具，帮助用户快速部署 K3s 集群。AutoK3s 同样支持了 k3d。
  * [vscode-k3d](https://github.com/inercia/vscode-k3d/): VSCode 插件，管理 k3d
  * [AbsaOSS/k3d-action](https://github.com/AbsaOSS/k3d-action)。Github Action，支持在 github action 中运行 k3d
  * [nolar/setup-k3d-k3s](https://github.com/nolar/setup-k3d-k3s)。Github Action，支持在 github action 中运行 k3d
