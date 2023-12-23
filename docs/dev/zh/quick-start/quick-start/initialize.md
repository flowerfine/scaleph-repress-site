# 系统初始化

`scaleph` 部署成功后，通过 `sys_admin/123456` 登录 [http://localhost:8096](http://localhost:8096) 后，系统维护者或者管理员需要先行对系统进行初始化，填充用户进行数据开发的必需配置和文件。

## 资源上传

使用 `scaleph` 系统前需上传系统运行必需的资源。

### Cluster Credential

`scaleph` 支持多集群部署，用户可以将 Flink 或 SeaTunnel 任务部署至多个 Kubernetes 集群。

用户需上传 Kubernetes 集群 kubeconfig 文件，kubeconfig 文件一般位于 `$HOME/.kube/config`。通过 kubeconfig， `scaleph` 可以连接对应 Kubernetes 集群，提交任务。

从 `资源` -> `Cluster Credential` -> `新增`进入上传页面：

![cluster_credential_upload](./images/initialize/cluster_credential_upload.png)

上传成功：

![cluster_credential_list](./images/initialize/cluster_credential_list.png)

## 启动调度

`scaleph` 应用本身运行需要定时任务：

* 同步提交的 Flink 任务状态和 checkpoint 数据。
* 同步 Doris 集群状态。

应用部署好后，需启动 `scaleph` 系统调度任务。从 `系统管理` -> `系统任务` 进入启动页面：

![schedule_system_job](./images/initialize/schedule_system_job.png)
