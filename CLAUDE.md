# CLAUDE.md

This file provides guidance for AI assistants working in this repository.

## 1. 目标

OpenSerial 是一个基于 `Rust + Tauri + React + TypeScript` 的开源串口调试工具。后续 AI 的目标不是“随手补功能”，而是按统一的方法把项目稳步做成一个可维护、可扩展的桌面工具。

## 2. 开发工作流

在开始任何开发任务前，先做这几件事：

1. 先读 `README.md`、`TODO.md`、`docs/architecture.md`、`docs/design.md`
2. 如果任务属于功能新增、结构调整、行为变更，优先走 `openspec/` 的变更流程
3. 先确认当前任务对应的 change / spec / task 是否已经存在
4. 实现时保持改动最小，避免顺手重构无关模块
5. 完成后更新 `TODO.md`，记录实际修改文件、结果和遗留问题

## 3. OpenSpec 使用原则

- 新功能优先用 OpenSpec 描述清楚再实现
- 继续未完成工作时，优先使用 `openspec-continue-change`
- 需要验证实现是否符合变更时，使用 `openspec-verify-change`
- 功能完成后再考虑归档变更
- 文档、需求、设计、任务描述默认使用简体中文

## 4. 项目边界

### 前端

- 目录：`src/`
- 负责界面、交互、状态展示、用户输入
- 尽量通过 `src/commands/*.ts` 调用后端能力，不直接绕过 Tauri 边界

### 后端

- 目录：`src-tauri/src/`
- 负责串口枚举、连接管理、读写、日志结构、事件推送、持久化
- Tauri command 只做边界层，不把复杂业务堆在 command 里

### 文档

- `docs/architecture.md`：技术架构、模块边界、数据流
- `docs/design.md`：UI 设计原则、布局和视觉约束
- `TODO.md`：任务、状态、AI 执行记录
- `openspec/`：需求变更、设计与任务拆分

## 5. 代码与实现原则

- 串口数据要尽早结构化，不要只当纯文本处理
- 日志、过滤、搜索、解析要围绕统一数据模型设计
- UI 风格保持克制、低饱和、偏工具型，不做营销风
- 优先复用现有模块和组件，避免重复实现
- 不要随意改动无关文件，也不要回滚用户未要求的改动

## 6. 推荐开发顺序

1. 串口基础能力
2. 日志数据结构
3. 收发与会话管理
4. 搜索与过滤
5. 导出与配置持久化
6. 解析与上位机化视图
7. 再做增强能力和体验优化

## 7. 验证命令

```bash
pnpm build
pnpm tauri:dev
pnpm tauri:build
cd src-tauri && cargo fmt
cd src-tauri && cargo clippy -- -D warnings
cd src-tauri && cargo test
```

## 8. 文档约定

- 说明文档默认中文
- 架构图、流程图、时序图优先用 Mermaid
- 新增能力最好同步补文档，不要只改代码

