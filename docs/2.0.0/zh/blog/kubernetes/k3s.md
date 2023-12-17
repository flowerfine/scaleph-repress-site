# K3s

文档链接

* [快速入门指南](https://docs.k3s.io/zh/quick-start)。k3s 文档
* [K3s 中文文档](https://docs.rancher.cn/k3s/)。rancher k3s 文档
* [腾讯云k3s试用](https://mp.weixin.qq.com/s/d6aoYdrpU2HLnsFwm1Nk_g)

## 部署 server 节点

一个 k3s 集群由 1 台 server 节点和 0 ~ N 个 agent 节点组成。一个 server 节点即是一个功能齐全的 Kubernetes 集群，它包括了托管工作负载 pod 所需的所有数据存储、control plane、kubelet 和容器运行时组件。

官方启动脚本：

```shell
curl -sfL https://get.k3s.io | sh -

# 中国用户可使用国内镜像，加速下载
curl -sfL https://rancher-mirror.rancher.cn/k3s/k3s-install.sh | INSTALL_K3S_MIRROR=cn sh -
```

推荐安装脚本如下：

```shell
curl -sfL https://rancher-mirror.rancher.cn/k3s/k3s-install.sh | \
	INSTALL_K3S_MIRROR=cn \
	INSTALL_K3S_VERSION=v1.26.8+k3s1 \
	K3S_KUBECONFIG_OUTPUT=/root/.kube/config \
	INSTALL_K3S_EXEC="--docker --node-external-ip=myip" \
	sh -
```

### 新增 agent 节点

获取 server 的 `K3S_TOKEN`

```shell
# 获取 server K3S_TOKEN
cat /var/lib/rancher/k3s/server/node-token
```

官方添加 agent 节点脚本：

```shell
curl -sfL https://get.k3s.io | K3S_URL=https://myserver:6443 K3S_TOKEN=mynodetoken sh -

# 中国用户可使用国内镜像，加速下载
curl -sfL https://rancher-mirror.rancher.cn/k3s/k3s-install.sh | INSTALL_K3S_MIRROR=cn K3S_URL=https://myserver:6443 K3S_TOKEN=mynodetoken sh -
```

推荐安装脚本如下：

```shell
curl -sfL https://rancher-mirror.rancher.cn/k3s/k3s-install.sh | \
	INSTALL_K3S_MIRROR=cn \
	INSTALL_K3S_VERSION=v1.26.8+k3s1 \
	K3S_URL=https://myserver:6443 \
	K3S_TOKEN=mynodetoken \
	INSTALL_K3S_EXEC="--docker --node-external-ip=myip" \
	sh -
```

## 卸载

参考 [卸载 K3s](https://docs.k3s.io/zh/installation/uninstall)

## 问题排查

用户在安装运行异常，无法启动 k3s 时，可以通过如下命令查询状态：

```shell
systemctl status k3s.service
systemctl status k3s-agent.service
```

使用 systemd 运行时，日志将发送到 Journald，用户可以查看对应的日志：

```shell
journalctl -u k3s
journalctl -u k3s-agent
```

k3s 日志查看：[K3s 日志在哪里？](https://docs.k3s.io/zh/faq?_highlight=journalctl#k3s-%E6%97%A5%E5%BF%97%E5%9C%A8%E5%93%AA%E9%87%8C)

## 安装脚本说明

### 指定版本

k3s 在国内提供了下载镜像，加速 k3s 下载。但不是每个版本在国内都有对应的镜像，在老版本中 k3s 是没有的。

官方的启动脚本默认会安装最新版本，用户可以选择一个固定版本

### 指定 kubeconfig

k3s server 将 kubeconfig 文件写入到 `/etc/rancher/k3s/k3s.yaml`，由 k3s 安装的 kubectl 将自动使用该文件。

往往用户安装完 k3s 后，找不到 kubeconfig 文件，用户可以在安装时指定 kubeconfig 安装目录为 $HOME/.kube/config。

k3s 提供的相关文档：[集群访问](https://docs.k3s.io/zh/cluster-access)。

### 节点 ip

在云提供商购买的云服务器，一般都有 2 个 ip：内网 ip 和公网 ip，服务器上获取的 ip 地址都是内网 ip。这样会导致内网不互通的多台服务器无法组成 k3s 集群。

解决方式就是在运行时指定节点 ip 和公网 ip：

* `--node-ip`。设置节点 InternalIP
* `--node-external-ip`。设置节点 ExternalIP

一些云提供商（例如 Linode）将创建以 “localhost” 作为主机名的主机，而其他云提供商可能根本没有设置主机名。这可能会导致域名解析出现问题。你可以使用 `--node-name` 标志或 `K3S_NODE_NAME` 环境变量运行 K3s，这会通过传递节点名称来解决此问题。

多台服务器组成 k3s 集群时，还要注意开放服务器端口，让集群节点互通，参考：[](https://docs.k3s.io/zh/installation/requirements?_highlight=10250#%E7%BD%91%E7%BB%9C)

```shell
# tcp
10250,10254,2376,2379,2380,6443,6783,9099,9100,9443,9796

# udp
4789,8443,8472,6783-6784
```

### docker

k3s 默认使用  [containerd](https://containerd.io/)，如果用户可以通过 `--docker` 选项启用 docker。

参考：[使用 Docker 作为容器运行时](https://docs.k3s.io/zh/advanced#%E4%BD%BF%E7%94%A8-docker-%E4%BD%9C%E4%B8%BA%E5%AE%B9%E5%99%A8%E8%BF%90%E8%A1%8C%E6%97%B6)