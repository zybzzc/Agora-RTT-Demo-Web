# 🚀 Vercel 部署指南

## 概述
本指南将帮助你将 Vite + React 项目部署到 Vercel 平台。

## 部署方式

### 方法一：GitHub 集成部署（推荐）

#### 1. 准备代码仓库
```bash
# 确保代码已推送到 GitHub
git add .
git commit -m "准备部署到 Vercel"
git push origin main
```

#### 2. 在 Vercel 导入项目
1. 访问 [vercel.com](https://vercel.com) 并登录
2. 点击 "New Project"
3. 从 GitHub 导入你的仓库
4. 选择 `Agora-RTT-Demo/web` 作为根目录

#### 3. 配置构建设置
Vercel 会自动检测到这是一个 Vite 项目，但你可以手动确认：
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 方法二：Vercel CLI 部署

#### 1. 安装 Vercel CLI
```bash
npm i -g vercel
```

#### 2. 登录并部署
```bash
cd Agora-RTT-Demo/web
vercel login
vercel
```

## 配置文件

### vercel.json
项目已包含 `vercel.json` 配置文件，包含以下设置：
- SPA 路由重写
- 静态资源缓存优化
- 环境变量配置

### 环境变量设置

#### 在 Vercel 控制台设置
1. 进入项目设置页面
2. 点击 "Environment Variables"
3. 添加以下变量：

```
VITE_AGORA_APP_ID=your_agora_app_id
VITE_AGORA_APP_CERTIFICATE=your_agora_app_certificate
VITE_API_BASE_URL=https://your-api-domain.com
VITE_APP_ENV=production
```

#### 通过 CLI 设置
```bash
vercel env add VITE_AGORA_APP_ID
vercel env add VITE_AGORA_APP_CERTIFICATE
```

## 构建优化

### 1. 检查构建输出
```bash
npm run build
```

### 2. 本地预览
```bash
npm run preview
```

### 3. 分析包大小
在 `package.json` 中添加分析脚本：
```json
{
  "scripts": {
    "analyze": "vite build --mode analyze"
  }
}
```

## 域名配置

### 自定义域名
1. 在 Vercel 项目设置中点击 "Domains"
2. 添加你的自定义域名
3. 配置 DNS 记录指向 Vercel

### SSL 证书
Vercel 自动为所有域名提供免费的 SSL 证书。

## 性能优化

### 1. 启用压缩
Vercel 默认启用 Gzip 和 Brotli 压缩。

### 2. CDN 缓存
静态资源自动通过 Vercel 的全球 CDN 分发。

### 3. 预渲染优化
对于 SPA 应用，考虑使用 Vercel 的 ISR（增量静态再生）功能。

## 监控和调试

### 1. 查看部署日志
```bash
vercel logs
```

### 2. 实时日志
```bash
vercel logs --follow
```

### 3. 性能监控
在 Vercel 控制台查看：
- 构建时间
- 函数执行时间
- 带宽使用情况

## 常见问题

### 1. 路由问题
确保 `vercel.json` 中包含 SPA 重写规则：
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 2. 环境变量不生效
- 确保变量名以 `VITE_` 开头
- 在 Vercel 控制台检查变量是否正确设置
- 重新部署项目

### 3. 构建失败
- 检查 Node.js 版本兼容性
- 确保所有依赖都在 `package.json` 中
- 查看构建日志获取详细错误信息

## 部署流程

### 自动部署
每次推送到主分支时，Vercel 会自动触发部署。

### 预览部署
推送到其他分支时，Vercel 会创建预览部署，方便测试。

### 回滚
在 Vercel 控制台可以轻松回滚到之前的部署版本。

## 成本考虑

### 免费额度
- 100GB 带宽/月
- 100 次构建/月
- 无限静态部署

### 付费计划
超出免费额度后，可升级到 Pro 或 Team 计划。

## 安全配置

### 1. 环境变量安全
- 敏感信息使用环境变量
- 不要在客户端代码中暴露密钥

### 2. CORS 配置
如果需要，在 `vercel.json` 中配置 CORS：
```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

## 总结

Vercel 为 Vite 项目提供了优秀的部署体验：
- ✅ 零配置部署
- ✅ 自动 HTTPS
- ✅ 全球 CDN
- ✅ 实时预览
- ✅ 自动优化

按照本指南操作，你的项目应该能够成功部署到 Vercel 平台。 