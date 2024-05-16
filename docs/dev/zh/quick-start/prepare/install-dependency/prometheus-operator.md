# Prometheus Operator

通过 prometheus operator 采集监控指标：

* `ServiceMonitor`。通过 `Service` 采集
* `PodMonitor`。采集 `Pod`
* 参考：[kube-prometheus-stack](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack)

## 安装

安装 prometheus operator

```shell
## scaleph 在 tools/kubernetes/grafana/values-prometheus-operator.yaml 中定制了开发、测试环境使用的 prometheus-operator 配置
## 生产环境中可以考虑使用 kubernetes 统一的 prometheus-operator 或者独立于 kubernetes 部署的 prometheus 实例，只需配置采集 kubernetes 中的 flink pods 的 metrics 即可

helm upgrade --install prometheus-operator kube-prometheus-stack \
    --repo https://prometheus-community.github.io/helm-charts \
    --values tools/kubernetes/prometheus/values-prometheus-operator.yaml
```

参数说明：

* values。可通过 `--values additional-values` 批量覆盖参数，也可通过 `--set xxx=yyyy` 覆盖参数

  * 命名空间

  * ```shell
    helm upgrade --install prometheus-operator kube-prometheus-stack \
        --namespace "$NAMESPACE"
        --repo https://prometheus-community.github.io/helm-charts \
        --set prometheusOperator.namespaces.additional="{$ADDITIONAL_MONITOR_NAMESPACE}"
    ```

  * 禁用 AlertManager。`--set alertmanager.enabled=false`

  * 禁用 Grafana。`--set grafana.enabled=false`

访问 prometheus 和 alert-manager

```shell
## tools/kubernetes/grafana/values-prometheus-operator.yaml 默认通过 NodePort 方式暴露了 prometheus 和 alert-manager 实例 端口
## 通过 http://${IP}:${PORT} 访问 prometheus 或 alert-manager
## IP 为 Kubernetes 节点的 IP 地址，本地则为 localhost 或 127.0.0.1
## 查看 prometheus 实例端口号
kubectl get services prometheus-operator-kube-p-prometheus
## 返回如下结果，端口号即为：30090
## NAME                                    TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)                         AGE
## prometheus-operator-kube-p-prometheus   NodePort   10.98.170.125   <none>        9090:30090/TCP,8080:30710/TCP   18h

## 查看 alert-manager 实例端口号
kubectl get services prometheus-operator-kube-p-alertmanager
## 返回如下结果，端口号即为：30090
## NAME                                      TYPE       CLUSTER-IP    EXTERNAL-IP   PORT(S)                         AGE
## prometheus-operator-kube-p-alertmanager   NodePort   10.111.2.15   <none>        9093:30903/TCP,8080:30546/TCP   18h
```

卸载 prometheus operator

```shell
helm uninstall prometheus-operator

## helm 并不会删除 crd, 需要手动删除
kubectl delete crd alertmanagerconfigs.monitoring.coreos.com
kubectl delete crd alertmanagers.monitoring.coreos.com
kubectl delete crd podmonitors.monitoring.coreos.com
kubectl delete crd probes.monitoring.coreos.com
kubectl delete crd prometheusagents.monitoring.coreos.com
kubectl delete crd prometheuses.monitoring.coreos.com
kubectl delete crd prometheusrules.monitoring.coreos.com
kubectl delete crd scrapeconfigs.monitoring.coreos.com
kubectl delete crd servicemonitors.monitoring.coreos.com
kubectl delete crd thanosrulers.monitoring.coreos.com
```

## 监控

### Flink

1. 暴露 Flink metrics 端口，供 prometheus 采集监控信息

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: flink-metrics
     labels:
     	# Define all flink jobs's metrics service labels for promethues operator's ServiceMonitor
       foo: bar
       ...
   spec:
   	# Match all flink jobs's pod by labels
     selector:
       aaa: bbb
       ccc: ddd
       ...
     ports:
       - name: metrics
         port: 9249
         targetPort: 9249
         protocol: TCP
   ```

2. prometheus operator 通过 `ServiceMonitor` 采集 Flink metrics

   ```yaml
   apiVersion: monitoring.coreos.com/v1
   kind: ServiceMonitor
   metadata:
     name: flink-jobs
     labels:
     	# Define service monitor labels for promethues operator's Promethues
     	group: flink-jobs
       ...
   spec:
     selector:
       # Match the above flink jobs's metrics service labels
       matchLabels:
         foo: bar
         ...
     endpoints:
       - port: metrics # Above service ports name
         interval: 2s
     # Collect each flink jobs's pod metrics data
     podTargetLabels:
       - lable1
       - lable2
       - lable3
       ...
   ```

3. 通过 prometheus 监控 `ServiceMonitor`。prometheus 默认只监控当前 namespace 下的 `ServiceMonitor`，如果要监控其他命名空间，可以通过 `spec.serviceMonitorNamespaceSelector` 实现。

   ```yaml
   apiVersion: monitoring.coreos.com/v1
   kind: Prometheus
   metadata:
     name: prometheus
   spec:
     serviceAccountName: prometheus
     serviceMonitorSelector:
       matchLabels:
       	# Match the above ServiceMonitor labels
         group: flink-jobs
     resources:
       requests:
         memory: 400Mi
     enableAdminAPI: false
   ```

使用 `PodMonitor` 监控 flink jobs pod 可以参考：[Using PodMonitors](https://github.com/prometheus-operator/prometheus-operator/blob/main/Documentation/user-guides/getting-started.md#using-podmonitors)
