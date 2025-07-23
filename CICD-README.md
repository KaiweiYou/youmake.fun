# CI/CD 部署指南

本项目使用 GitHub Actions 进行持续集成和部署。

## 设置步骤

### 1. 在 GitHub 仓库中添加 Secrets

在 GitHub 仓库的 Settings > Secrets and variables > Actions 中添加以下 secrets:

- `SSH_HOST`: 服务器 IP 地址或域名
- `SSH_USERNAME`: SSH 用户名
- `SSH_PRIVATE_KEY`: SSH 私钥内容
- `SSH_PORT`: SSH 端口（通常是 22）

### 2. 服务器准备工作

1. 安装必要软件:

```bash
# 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 PM2
npm install -g pm2

# 安装 Nginx
sudo apt-get install -y nginx
```

2. 配置 Nginx:

```bash
sudo cp nginx.conf /etc/nginx/sites-available/youmake.fun
sudo ln -s /etc/nginx/sites-available/youmake.fun /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

3. 设置防火墙:

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw enable
```

### 3. 初始部署

首次部署需要手动在服务器上克隆仓库:

```bash
# 确保目录存在
mkdir -p /www/wwwroot/youmake.fun

# 克隆仓库
git clone https://github.com/你的用户名/youmake.fun.git /www/wwwroot/youmake.fun
cd /www/wwwroot/youmake.fun
npm ci
npm run build
pm2 start ecosystem.config.js
```

### 4. 自动部署

设置完成后，每次推送到 main 分支时，GitHub Actions 将自动构建并部署项目到服务器。

你也可以在 GitHub 仓库的 Actions 页面手动触发部署。

## 常见问题

### 如何查看部署日志?

在服务器上使用以下命令:

```bash
pm2 logs youmake-fun
```

### 如何手动重启应用?

```bash
pm2 restart youmake-fun
```

### 如何更新 Nginx 配置?

修改 nginx.conf 文件后:

```bash
sudo cp nginx.conf /etc/nginx/sites-available/youmake.fun
sudo nginx -t
sudo systemctl restart nginx
``` 