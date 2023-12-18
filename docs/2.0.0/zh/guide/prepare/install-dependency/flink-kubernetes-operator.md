# Flink Kubernetes Operator

[Flink Kubernetes Operator](https://nightlies.apache.org/flink/flink-kubernetes-operator-docs-stable/) 使用 Kubernetes API，提供云原生管理 Flink 集群的能力：

- 部署、监控 Flink Session 和 Application 应用
- 升级、暂停和删除应用
- 日志和 metrics 集成
- 支持弹性部署，与 Kuberentes 生态原生集成

## 安装

1. 环境要求

   1. [kubernetes](https://kubernetes.io/)
   2. [helm](https://helm.sh/docs/intro/quickstart/)

2. 安装 flink-kubernetes-operator，参考 [Try the Flink Kubernetes Operator](https://nightlies.apache.org/flink/flink-kubernetes-operator-docs-release-1.7/docs/try-flink-kubernetes-operator/quick-start/)

   ```shell
   # 安装 cert-manager
   kubectl create -f https://github.com/jetstack/cert-manager/releases/download/v1.8.2/cert-manager.yaml
   
   # 安装 flink-kubernetes-operator
   helm repo add flink-kubernetes-operator-1.7.0 https://archive.apache.org/dist/flink/flink-kubernetes-operator-1.7.0/
   # 修改 flink 镜像仓库为 apache/flink-kubernetes-operator
   # 默认是从 github packages 下载，从 github 下载比较慢，换成 dockerhub 
   helm install flink-kubernetes-operator flink-kubernetes-operator-1.7.0/flink-kubernetes-operator --set webhook.create=false --set image.repository=apache/flink-kubernetes-operator
   
   # 查看安装状态
   kubectl get deployment
   # 查看安装详情
   kubectl describe deployment flink-kubernetes-operator
   ```

3. 提交任务

   ```shell
   # 任务创建时需要拉取 flink 镜像，为了安装体验可以预先拉取镜像
   # docker pull flink:1.17
   
   # 提交任务
   kubectl create -f https://raw.githubusercontent.com/apache/flink-kubernetes-operator/release-1.7/examples/basic.yaml
   ```

4. 查看任务

   ```shell
   # 查看任务信息
   kubectl get deployment
   kubectl get pods
   
   # 查看任务日志
   kubectl logs -f deploy/basic-example
   
   # 访问 flink web-ui
   # 访问 http://localhost:8081
   kubectl port-forward svc/basic-example-rest 8081
   ```

5. 关闭任务

   ```shell
   kubectl delete flinkdeployment/basic-example
   ```

## Ingress

在 Kubernetes 中，外部访问集群内的服务有两种方式：[service](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types) 和 [ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)。其中 Flink 的 web ui 对 service 的 3 种类型都进行了支持，[参考链接](https://nightlies.apache.org/flink/flink-docs-release-1.17/docs/deployment/resource-providers/native_kubernetes/#accessing-flinks-web-ui)：

- ClusterIP
- NodePort
- LoadBalancer

Flink Kubernetes Operator 并不干涉 Flink web ui 的功能，用户在通过 Flink Kubernetes Operator 部署 Flink 任务的时候，仍然可以使用上述 3 种方式来访问 Flink web ui。但除此之外，Flink Kubernetes Operator 提供 ingress 配置，可以让用户在未配置外部访问的情况下，访问到 Flink web ui。

1. 安装 [nginx-ingress-controller](./nginx-ingress-controller)。

2. yaml 增加 ingress 配置。参考 [Ingress](https://nightlies.apache.org/flink/flink-kubernetes-operator-docs-release-1.7/docs/operations/ingress/)。

   ```yaml
   apiVersion: flink.apache.org/v1beta1
   kind: FlinkDeployment
   metadata:
     name: advanced-ingress
   spec:
     image: flink:1.17
     flinkVersion: v1_17
     ingress:
       template: "/{{namespace}}/{{name}}(/|$)(.*)"
       className: "nginx"
       annotations:
         nginx.ingress.kubernetes.io/rewrite-target: "/$2"
     flinkConfiguration:
       taskmanager.numberOfTaskSlots: "2"
     serviceAccount: flink
     jobManager:
       resource:
         memory: "1024m"
         cpu: 0.1
     taskManager:
       resource:
         memory: "1024m"
         cpu: 0.25
     job:
       jarURI: local:///opt/flink/examples/streaming/StateMachineExample.jar
       parallelism: 2
   ```

3. 部署任务

   ```yaml
   # 部署任务
   kubectl apply -f advanced-ingress.yaml
   
   # 查看任务
   kubectl get FlinkDeployment
   
   kubectl get deployment
   
   kubectl get pods
   
   kubectl get ingress -A
   kubectl describe ingress $ingress
   
   kubectl get services
   ```

4. 访问任务。https://localhost/default/advanced-ingress/

5. 删除任务。

   ```shell
   kubectl delete -f advanced-ingress.yaml
   ```
