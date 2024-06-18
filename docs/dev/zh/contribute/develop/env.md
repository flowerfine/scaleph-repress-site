# 准备环境

开发者需安装如下环境：

- [JDK](https://adoptium.net/zh-CN/temurin/archive/)。下载并安装 open JDK 17。
  - [Maven](https://maven.apache.org/download.cgi)。下载并安装 maven，推荐 `3.9.7` 版本
- [Node](https://nodejs.org/en/download/releases/)。下载并安装 Node 16。
- [Docker](https://docs.docker.com/get-docker/)。下载并安装 Docker，已有 Docker 环境时，使用 `docker version` 和 `docker compose version` 检查对应的版本，更新为最新版本。

## JDK

### Mac & Linux

1. 下载 [JDK](https://adoptium.net/zh-CN/temurin/archive/)。`scaleph` 需 JDK 17。下载分为 **二进制** 和 **安装器**，Mac 和 Windows 用户可选择 **安装器** 下载。不同项目使用不同版本的 JDK，推荐同时安装 JDK 11、17、21 等长期支持版本，配置多版本管理。

2. 安装。

3. 配置多版本管理。在 `.bash_profile` 中添加如下配置，设置 `JAVA_HOME` 和快速切换 JDK 版本命令

   ```shell
   ## 配置环境变量
   export JAVA_11_HOME=$(/usr/libexec/java_home -v11)
   export JAVA_17_HOME=$(/usr/libexec/java_home -v17)
   
   ## JAVA_HOME
   export JAVA_HOME=$JAVA_17_HOME
   
   ## 切换 JDK 版本命令
   alias java11="export JAVA_HOME=$JAVA_11_HOME"
   alias java17="export JAVA_HOME=$JAVA_17_HOME"
   
   ## 验证。使用 java -version 查看当前生效的 JDK 信息
   java -version
   
   ## 切换版本至 JDK 11
   java11
   ## 切换版本至 JDK 17
   java17
   ```

### Windows

参考：[轻松管理多版本JDK：从1.8到11和17的无缝切换指南](https://mp.weixin.qq.com/s?__biz=Mzk0NzQwMzgxNQ==&mid=2247486717&idx=1&sn=9f3f314dc13f643a3e029bb5df942bdf&chksm=c37621b5f401a8a3fd9e36d9ca63b1bc4597d2f392cef3200ec3a1cdd1a933275355cc092e7c&mpshare=1&scene=1&srcid=0611NoypwokdXVO2KgUGudcx&sharer_shareinfo=c1703af4802db14696e2ab3e4c655342&sharer_shareinfo_first=20abd686207264467ebbb23f1caa40dc&version=4.1.10.99312&platform=mac&nwr_flag=1#wechat_redirect)

## Maven

### Mac & Linux

1. 下载 [maven](https://maven.apache.org/download.cgi)。推荐 `3.9.7` 版本

2. 安装。将下载的安装包解压，放在某个目录即可。需记住存放路径：`/path/to/your_maven`

3. 配置环境变量。在 `.bash_profile` 中添加如下配置：

   ```shell
   ## 配置环境变量
   export M2_HOME=/path/to/your_maven
   export PATH=$PATH:$M2_HOME/bin
   
   ## 验证
   mvn -v
   ```

4. 配置 maven。编辑 `$user_home/.m2/settings.xml` 文件

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
     <!-- 在本地指定文件目录，存储本地 jar 包。可不指定，默认存储在 $user_home/.m2/repository  -->
     <localRepository>/path/to/local_repository</localRepository>
   
     <!-- 配置阿里云 maven 仓库镜像  -->
     <mirrors>
       <mirror>
         <id>nexus-aliyun</id>
         <mirrorOf>central</mirrorOf>
         <name>Nexus aliyun</name>
         <url>https://maven.aliyun.com/repository/central</url>
       </mirror>
     </mirrors>
   </settings>
   ```

## Node

待补充

## Docker

待补充
