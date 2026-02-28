# WSConnect - 跨代交流论坛

连接年龄相差30岁以上的人，让他们彼此获益的论坛平台。

## 技术栈

### 前端
- React 18 + TypeScript
- Vite (构建工具)
- Tailwind CSS (样式框架)
- React Router (路由管理)

### 后端
- Node.js + Express + TypeScript
- PostgreSQL (数据库)
- Redis (缓存)
- Prisma (ORM)

## 项目结构

```
wsconnect/
├── client/                 # 前端应用
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── stores/
│   │   └── utils/
│   └── package.json
├── server/                 # 后端服务
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── utils/
│   └── package.json
└── shared/                 # 共享类型定义
    └── types/
```

## 快速开始

### 前端
```bash
cd client
npm install
npm run dev
```

### 后端
```bash
cd server
npm install
npm run dev
```

## 功能特性

- 用户注册/登录与年龄验证
- 发帖与回复功能
- 跨代匹配机制（年龄差≥30岁）
- 互动与感谢系统


WSConnect 项目变更记录
========================

变更日期: 2026-02-25

变更内容:
---------

1. 新增快速启动脚本
   - start.bat: Windows 批处理脚本，用于快速启动项目
   - start.ps1: PowerShell 脚本，用于快速启动项目

2. 脚本功能
   - 自动检查并安装依赖（如 node_modules 不存在）
   - 启动后端服务（端口 3000）
   - 启动前端服务（端口 5173）

3. README.md 更新
   - 添加快速启动脚本使用说明
   - 保留原有的手动启动方式作为备选

4. 修复问题
   - 修复了 start.bat 的编码问题，使用英文避免乱码

使用方式:
---------
- 方式一（推荐）: 双击运行 start.bat
- 方式二: 在 PowerShell 中运行 .\start.ps1
- 方式三: 按照 README.md 中的手动启动步骤