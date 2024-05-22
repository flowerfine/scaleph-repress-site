## 开发计划

`scaleph` 功能开发计划

## 2.0.5

* flink kubernetes 
  * 页面功能重构
    * 增加修改功能
    * 组件状态重构
  * 服务端功能重构
    * CRD 定义重构
    * 增加 additional dependencies 下载
* flink kubernetes job
  * 增加 running/resume 功能
  * 重构任务实例 & savepoint 关系
  * 页面按钮，状态调整
  * 任务完成后，增加延迟删除 deployment 功能
* seatunnel
  * 升级至 2.3.5 版本
  * 调试部分 connector，提供内置 demo
    * jdbc，kafka，es，doris
* flink cdc
  * 增加 flink cdc dag
* dag
  * 持续优化 workflow dag
  * 添加 workflow dag 页面
* 监控、可视化、告警
  * 依据 prometheus，grafana 和 alert-manager 搭建云原生告警方式
  * 依据 scaleph 服务端定时轮训/监听资源变动状态，告警方式