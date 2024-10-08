# Docker

Docker 提供了一套轻量、标准化的解决方案，提升开发、部署和运维效率。`scaleph` 在项目之初就开始使用 Docker，提供一致的运行环境。

## 开发环境

当在本地启动运行项目时，开发者总要解决开发环境问题：

- 企业应用。企业会提供专门的开发环境，供员工开发、调试程序
- 开源软件。开源文档会详细阐述软件需要什么样的依赖，并指导开发者如何构建依赖

过于复杂的开发环境会导致大量出于兴趣的开发者望而却步，也会让真正有需求的开发者耗费过多的精力在构建依赖上面。

`scaleph` 使用 Docker 提供开发环境：

- mysql。`tools/docker/mysql/init.d` 存储 `scaleph` 所有的 sql 文件。
- redis。
- minio。minio 作为文件存储中间件，可使用 HDFS、OSS、S3 代替
  - `scaleph` 在提供的 minio 默认容器中创建了 `scaleph` 和 `scaleph-public` 2 个 bucket，其中 `scaleph-public` 可通过 http 匿名访问。访问方式为：`http://$MINIO_IP:$MINIO_PORT/scaleph-public/$FILE_NAME`，如 `http://localhost:9000/scaleph-public/scaleph.svg`。
- [gravitino](https://github.com/datastrato/gravitino)。元数据，类似的有 [metacat](https://github.com/Netflix/metacat)。
  - mysql catalog 需要添加 jdbc 驱动，通过 volume 挂载到 `${gravitino_home}/catalogs/jdbc-mysql/libs`。postgresql、doris 与此同理


```shell
cd tools/docker/local
docker compose up -d
```

## 编译环境

开源软件中编译环境绝对是导致应用运行异常的常见问题。

`scaleph` 编译环境需要 JVM 和 Node，需要用户安装 JDK 17 和 Node 16 版本。如果环境不符合要求，那么就无法正常编译 `scaleph`。

Docker 一次编译，到处分发运行的特性，同样可以应用在编译场景：编译 `scaleph` 时，创建一个一次性运行的容器，在容器内执行编译过程，编译结束容器销毁，获取编译结果。

许多开源项目同样提供类似方式，避免开发者编译环境不一致：

* doris。[使用 Docker 开发镜像编译（推荐）](https://doris.apache.org/zh-CN/docs/install/source-install/compilation-with-docker)
* ranger。[build_ranger_using_docker.sh](https://github.com/apache/ranger/blob/master/build_ranger_using_docker.sh)

`scaleph` 同样提供了容器编译方案，提供统一一致的编译环境，详见 [容器内编译](https://flowerfine.github.io/scaleph-website/zh/docs/guide/compile#%E5%AE%B9%E5%99%A8%E5%86%85%E7%BC%96%E8%AF%91)。

:::tip

实际测试在容器内编译，发现能够编译，但是速度很慢。后续会推出如何利用 github actions 环境进行编译的方式

:::

## 运行环境

`scaleph` 并不提供安装包，而是以镜像的形式发布 `scaleph-api` 和 `scaleph-ui-react`，简化开发者部署 `scaleph` 流程，详见 [部署](https://flowerfine.github.io/scaleph-website/zh/docs/guide/deploy)。
