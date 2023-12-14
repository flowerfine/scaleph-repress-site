# Docker Desktop

## 前置准备

创建 Flink 任务专用 service account，参考 [Native Kubernetes#RBAC](https://nightlies.apache.org/flink/flink-docs-release-1.18/docs/deployment/resource-providers/native_kubernetes/#rbac)

```shell
kubectl create serviceaccount flink-service-account
kubectl create clusterrolebinding flink-role-binding-flink --clusterrole=edit --serviceaccount=default:flink-service-account
```

安装 cert-manager，参考 [Try the Flink Kubernetes Operator](https://nightlies.apache.org/flink/flink-kubernetes-operator-docs-release-1.7/docs/try-flink-kubernetes-operator/quick-start/)

```shell
kubectl create -f https://github.com/jetstack/cert-manager/releases/download/v1.8.2/cert-manager.yaml
```

## Flink Kubernetes Operator

安装 flink-kubernetes-operator

```shell
helm repo add flink-kubernetes-operator-1.7.0 https://archive.apache.org/dist/flink/flink-kubernetes-operator-1.7.0/
# 修改 flink 镜像仓库为 apache/flink-kubernetes-operator
# 默认是从 github packages 下载，从 github 下载比较慢，换成 dockerhub 
helm install flink-kubernetes-operator flink-kubernetes-operator-1.7.0/flink-kubernetes-operator --set webhook.create=false --set image.repository=apache/flink-kubernetes-operator

# 查看安装状态
kubectl get deployment
# 查看安装详情
kubectl describe deployment flink-kubernetes-operator
```

## Ingress

安装 nginx ingress

```shell
# 安装 ingress-nginx
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.0/deploy/static/provider/cloud/deploy.yaml

# 检验安装结果
kubectl get pods -n ingress-nginx
kubectl get services -n ingress-nginx
```