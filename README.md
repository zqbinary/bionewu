#迅雷爱玩物 vue 版本 

## 目的
入手黑群晖半年多了，用了 aria2,transmission,ionewu，最后还是吸血雷好，什么链接往里面丢就好。

现在最大的问题:
1. 占用带宽，偷跑，伤硬盘，费电
2. 是版权限制。

但是总得来说，还是爱玩物最稳定。

## 怎么来的
一开始我是在console里单步调试，就好像盲人一样的走路，list api有跑起来，到 info的时候，由于不知道proto的存在，不知道是 bufferArray，所以总是乱码。

随着项目的的深入了解，我发现已经有源代码在 webpack里，在 chrome web store 找了个插件，Save All Resources。

从源网页抄些配置，env里的那些，然后就可以跑起来了。

这个仓库，作为源代码。目前，我正在用 express 改装 这个项目。

## 如何食用
```
yarn install
```
* 运行环境配置

yarn 具体看 
See [Configuration Reference](https://cli.vuejs.org/config/).
* env 配置

复制 .env => .env.local 

从已经连接上群晖的 http://yc.ionewu.com/，把 localStorage抄到 .env.local 里

## 源代码大致
* vuex.store 被作为数据库使用，刷新的时候，从 localStorage 取最核心的数据。
* setInterval 各种跑，尤其是 list 接口，来保证 vuex.store 是正确切实时的。


## 然后呢
我正在改造成 express api。
配合自己嵌在豆瓣油猴子嗅探资源，发送到自己的服务器，做成下载队列。

