#先登录你的账号
\$ npm adduser  
Username: your name
Password: your password
Email: yourmail

npm who am i

# 如果不成功则重新登录一下

npm login

配置成功之后提交代码

npm publish #一些常见的错误：

##FAQ:1.no_perms Private mode enable, only admin can publish this module

这是因为镜像设置成淘宝镜像了，设置回来即可

npm config set registry http://registry.npmjs.org

"version": "0.0.4"//自己手动修改版本才能提高。
