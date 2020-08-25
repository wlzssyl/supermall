## nginx在windows的部署
---
#### 1.一般用Stable version稳定版

#### 2.nginx根目录下

>conf / nginx.conf

nginx.conf文件中配置入口

```
location /{
  root   html;    #根目录下的文件夹名
  index   index.html   index.htm;   #入口HTML文件
}
```
#### 3.nginx命令行
在nginx根目录下打开命令行窗口

```
nginx -s stop  //关闭nginx

nginx -s quit  //保存并退出

nginx -s reload  //重启nginx
```

