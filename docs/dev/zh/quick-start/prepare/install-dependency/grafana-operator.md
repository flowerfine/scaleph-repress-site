# Grafana Operator



## 安装

```shell
helm upgrade --install grafana grafana \
    --repo https://grafana.github.io/helm-charts \
    --values tools/kubernetes/grafana/values-grafana.yaml
    
helm uninstall grafana
```

