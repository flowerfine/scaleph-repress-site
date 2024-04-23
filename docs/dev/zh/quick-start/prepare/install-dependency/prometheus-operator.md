# Prometheus Operator

通过 prometheus operator 采集监控指标：

* `ServiceMonitor`。通过 `Service` 采集
* `PodMonitor`。采集 `Pod`

## 安装

安装 prometheus operator

```shell
helm upgrade --install prometheus-operator kube-prometheus-stack \
    --repo https://prometheus-community.github.io/helm-charts
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

卸载 prometheus operator

```shell
helm uninstall prometheus-operator
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
