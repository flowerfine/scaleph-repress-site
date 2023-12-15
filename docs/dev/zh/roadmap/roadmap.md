# 路线图

`scaleph` 关于数据平台的底层功能路线图

## 数据集成

### SeaTunnel DAG 优化

- 快捷键绑定。SeaTunnel 任务可视化编辑页面支持快捷键，粘贴复制、撤销等操作。无说明文档，用户无法了解相关功能，需在功能栏暴露这些功能，并添加提示
- 增加每个 connector 的 icon 图标显示。增加页面显示效果
- 修复 connector 的输入输出只能有一个的问题。即 SeaTunnel 的 source -> transform -> sink 只能支持单个。比如 jdbc cdc source 想同时发送至 kafka 和 doris，则需要创建 2 个一模一样的 jdbc cdc source，分别连接至 kafka sink 和 doris sink

### 一键同步

目前的 SeaTunnel 任务可视化编辑页面只是采用拖拉拽的方式描述 connector 的关系，用户仍然需要挨个配置 connector。数据集成场景需要用户干预的场景只是少数，多数情况只是简单地异构数据源同步，尤其是整库同步场景。

`scaleph` 仍然需要结合元数据功能，提供任务的自动创建，实现**一键同步**功能。

### 实时场景

通常意义上的实时场景包含 2 个：

- 消息队列。如 Kafka，Pulsar。SeaTunnel 已支持。
- CDC 数据（一般指数据库 binlog）。SeaTunnel 自身在开发 CDC 功能，已推出 Mysql-CDC connector。

flink-cdc-connectors 提供了 CDC 数据和 Flink 的集成，项目成熟生产环境应用案例多，可考虑使用 SeaTunnel v1 connectors 对 flink-cdc-connectors 封装。

- SeaTunnel 多引擎支持
- SeaTunnel v1 connector 实现
  - flink-cdc-connectors
  - hudi
  - iceberg

### Flink CDC

Flink CDC 在 3.0 推出了实时数据集成功能，不只是 cdc source，也开始做 sink。

## 数据开发

数据开发代指 Flink 任务开发。

### SQL 任务

- connector
  - 内置或动态支持 connector。
    - `scaleph` 目前支持的 connector 需依赖 Flink 镜像自带的 connector，没有内置额外的
    - 除了 `scaleph` 内置的 connector，用户如何动态新增 connector

- catalog
  - 内置或动态支持 catalog。
    - `scaleph` 目前支持的 catalog 只是在 sql gateway 支持，在镜像中并未内置
    - 除了 `scaleph` 内置的 catalog，用户如何动态新增 catalog

- sql gateway 和 sql 任务执行统一
  - sql gateway 的任务提交与 sql 任务的提交是 2 种方式，sql gateway 是对通过 Table API 提交测试，sql 任务则是通过 template jar 模式提交

- sql gateway
  - 数据 preview 功能，用户使用 sql gateway 提交的 sql，如何避免用户提交 sink，并且把 sink 语句改成数据预览语句


## Flink Kubernetes Operator

* session 任务。
  * Flink Kubernetes Operator 提交 session job 时，会通过 Flink 的上传 jar 接口，提交任务，任务 jar 的获取方式只能通过 Http 和 FileSystem，`scaleph` 未支持
* 任务依赖。
  * 动态添加额外依赖 jar。目前只在 jar 类型增加下载任务 jar 功能，需在此功能基础上增加额外依赖下载功能
* 任务暂停/恢复。Flink Kubernetes Operator 中任务的生命周期存在 `suspended` 阶段，可以考虑支持 `suspend` <-> `running` 的手动干预
* 任务完成。
  * Flink 任务完成后会默认触发 deployment 销毁，Flink Kubernetes Operator 禁止了此项功能，导致任务完成后 Flink Kubernetes Operator 依然在管理对应的 deployment
* kubernetes-client 使用姿势提升
  * 提交时改为同步等待
  * FlinkDeployment 状态更新。FlinkDeployment 事件监听 vs 轮询

## 数据源

* web
  * 数据源创建表单。优化数据源信息像后端发请求时，参数如何处理问题
  * 数据源 icon
  * 数据源更新方式
  * 数据源额外认证文件。如 kerberos，hdfs 配置文件
* 服务端
  * 数据源连通性测试
  * 数据源元数据

## 任务调度

实时任务一直运行，无需实现周期性的重复运行，对于调度任务没有需求。

离线任务需要调度进行周期性运行，离线任务往往不是单独运行的，一般都会有上下游依赖需求，需要调度支持 DAG 功能，支持离线任务编排。

`scaleph` 对 SeaTunnel 和 Flink 任务支持 DAG 调度。
