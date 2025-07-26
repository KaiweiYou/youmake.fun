# YouMake.Fun

这是我的个人网站项目，采用 Next.js 构建的静态博客和作品集展示平台。

## 技术栈

- **框架**: [Next.js 15](https://nextjs.org/) (静态导出)
- **语言**: TypeScript
- **样式**: CSS Modules + Tailwind CSS
- **字体**: [Geist](https://vercel.com/font)
- **内容**: MDX (支持React组件的Markdown)
- **部署**: GitHub Actions + 自动化部署

## 项目结构

```
src/
  app/                    # Next.js App Router
    blog/
      posts/             # MDX博客文章
      page.tsx           # 博客列表页
    components/
      ui/               # 通用UI组件
      layout/          # 布局组件
      features/        # 功能组件
    page.tsx            # 首页
```

## 本地开发

1. **克隆项目**
   ```bash
   git clone https://github.com/KaiweiYou/youmake.fun.git
   cd youmake.fun
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **构建静态文件**
   ```bash
   npm run build
   ```

## 部署流程

项目使用 GitHub Actions 实现自动化部署：

1. **CI (持续集成)**
   - 代码提交到 main 分支触发
   - 安装依赖
   - 构建静态文件
   - 保存构建产物

2. **CD (持续部署)**
   - 下载构建产物
   - 通过 SCP 上传到服务器
   - 自动部署到生产环境

## 写作博客

1. 在 `src/app/blog/posts/` 创建新的 `.mdx` 文件
2. 添加文章元数据：
   ```mdx
   export const metadata = {
     title: '文章标题',
     date: '2024-01-01',
     slug: 'article-slug'
   }

   # 文章内容
   ```

## 环境要求

- Node.js 22.17.0+
- npm 10+

## 许可证

MIT

## 联系方式

- 网站：[youmake.fun](https://youmake.fun)
- GitHub：[@KaiweiYou](https://github.com/KaiweiYou)
