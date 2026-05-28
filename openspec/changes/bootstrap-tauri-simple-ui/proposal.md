## Why

OpenSerial 目前只有产品与架构文档，还没有可运行的桌面应用骨架。先实现一个基于 Rust + Tauri 的简单工作台 UI，可以尽早验证三栏布局、前后端边界和后续串口能力的落点，避免后续在没有界面基线的情况下分散实现。

## What Changes

- 初始化 Tauri + Rust + React + TypeScript 的桌面应用骨架，并建立与现有文档一致的目录结构。
- 实现首版主工作台 UI，包括顶部工具栏、左侧连接区、中间日志区、右侧过滤/状态区和底部发送区。
- 提供用于 UI 验证的占位数据、基础交互和响应式折叠行为，使布局在不同窗口宽度下仍保持日志区为视觉中心。
- 建立前端与 Rust 宿主层的最小边界，为后续串口枚举、连接、日志事件推送预留命令与事件接口。

## Capabilities

### New Capabilities
- `desktop-workbench-shell`: 提供可运行的 Tauri 桌面工作台壳层和首版主界面布局，用于承载后续串口与日志能力。

### Modified Capabilities
- None.

## Impact

- 新增 `src/` 前端目录与 `src-tauri/` Rust 宿主目录。
- 新增 Tauri、前端构建和 Rust 依赖配置。
- 为后续串口、日志、过滤和发送模块建立明确的 UI 与宿主接口边界。
