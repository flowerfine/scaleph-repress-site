# 导入&导出

适用于服务器网络不佳或者离线部署，提前导出镜像，保存为压缩文件。上传至服务器，导入镜像

## 查看镜像

```bash
docker image ls
```

## 导出镜像

```bash
# 查看命令手册
docker image save -h

# 导出镜像
docker image -o scaleph-api.tgz ghcr.io/flowerfine/scaleph/scaleph-api:vxx.yy.zz
```

## 导入镜像

```bash
# 查看命令手册
docker image load -h

# 导入镜像
docker docker image load -i scaleph-api.tgz
```