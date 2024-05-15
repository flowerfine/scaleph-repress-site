# 项目初衷

`scaleph` 始于 2022 年初，彼时 SeaTunnel 刚在 2021 年 11 月份进入 apache 孵化器进行孵化，作为项目早期的关注者和参与者，非常喜欢 SeaTunnel 的设计理念和成果，于是决定为 SeaTunnel 开发一个 web 管理系统，实现 SeaTunnel 任务的创建、提交、停止等功能，类似 DataX 和 DataX-Web 之类的组合。

- 那么如何去创建 SeaTunnel 任务呢？做个拖拉拽的吧！
- 怎么提交 SeaTunnel 任务呢？用 shell 最方便了，可以同时支持 Flink 和 Spark，但是用 Java 调用 shell 好蠢，Flink 也是基于 Java 和 Scala 实现的，`scaleph` 也是用 Java 实现的，为什么二者的集成要通过 shell 实现中间要转一道呢？我们用 Java 搞吧！

`scaleph` 历经几个月的开发，得到一个基础版本，在 SeaTunnel 的线上 meetup 上分享了我们的阶段成果。之后 `scaleph` 对前端框架进行了从 angular 到 react 的迁移，服务端也从 v1 connector 迁移到了 v2 connector，在 2023 年元旦发布了至关重要的 `1.0.0` 版本，结束了因为开发、重构导致的无稳定版本的状况。

`scaleph` 一开始是开发 SeaTunnel on Flink 的 web 系统，在此过程中不断探索、实践：

* Flink 任务管理。
  * `scaleph` 以 Flink Kubernetes Operator 为核心实现 Flink 任务管理，在此基础上支持 SeaTunnel 任务运行在 Flink 引擎上。
  * 除支持 SeaTunnel，`scaleph` 复用 Flink 任务管理，逐步支持 Flink Jar 和 Flink SQL 的任务。其中对 Flink SQL 支持的过程中，也对接了 Flink SQL Gateway，提供了 Flink Online SQL Editor 能力。
* SeaTunnel 任务拖拉拽开发
  * `scaleph` 一开始就定位要实现拖拉拽形式的数据集成开发，在成功支持 SeaTunnel 后，已经将对 Flink CDC 的拖拉拽集成提上日程。
* Kubernetes 任务管理
  * 在对接 Flink Kubernetes Operator 过程中积累的经验，`scaleph` 也进行总结拓展，并成功应用到 Doris Operator，实现了对 Doris On Kubernetes 的运维管理工作。作为 Doris 的另一分支，StarRocks 也是一个很好的拓展方向（尚未实现）
  * OAM 理论。在 Kubernetes 逐渐成为现代软件运行基础设施的情况下，如何更好地收敛 Kubernetes 复杂性，简化应用运维，提升应用维护效率就是一个新的技术难点。OAM 理论模型是一个在 Kubernetes 上描述应用交付表现了强大的生命力，`scaleph` 对 Flink 和 Doris 的支持是通过对应的 Flink Kubernetes Operator 和 Doris Operator 实现的，遵从 Kubernetes 对象的创建、更新和删除方式，而这恰恰是 OAM 理论的核心：应用交付。`scaleph` 在 Kubernetes 上的探索就是尝试落地基于 OAM 的应用交付，夯实其底层运维能力

