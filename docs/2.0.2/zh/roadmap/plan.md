## 开发计划

`scaleph` 功能开发计划

## 2.0.2

* flink kubernetes 
  * 页面功能重构
    * 增加修改功能
    * 组件状态重构
  * 服务端功能重构
    * CRD 定义重构
    * 增加 additional dependencies 下载
* job
  * 增加 running/resume 功能
  * 重构任务实例 & savepoint 关系
  * 页面按钮，状态调整
  * 任务完成后，增加延迟删除 deployment 功能