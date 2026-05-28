## Context

OpenSerial 当前已经完成首版 Tauri 工作台实现，`npm run tauri build` 可以在带 MSVC 工具链的 Windows 环境中产出安装包。但这个流程仍然依赖本机环境与手动命令执行，不适合作为稳定的 release 机制。

`cargo-dist` 适合承担 Rust 应用的发布编排：它可以把构建步骤、产物命名、跨平台分发和 GitHub release 流程统一起来。这个 change 的目标不是替换 Tauri，而是把 Tauri 的桌面构建纳入标准化发布流水线。

## Goals / Non-Goals

**Goals:**
- 让仓库具备可重复执行的 release 流程。
- 让 GitHub Actions 能自动生成发布产物。
- 保持当前 Tauri 前端/后端结构不变，只增加发布层配置。
- 使 release 流程适配 Rust/Tauri Windows 构建，并为后续跨平台扩展预留位置。

**Non-Goals:**
- 不重构应用代码结构。
- 不改变现有 UI 或串口功能范围。
- 不在本 change 中重写全部 CI，只补发布所需最小工作流。

## Decisions

### 1. 将 `cargo-dist` 作为 release 编排层，而不是替代 Tauri 构建

Tauri 仍然负责应用构建和安装包生成，`cargo-dist` 负责协调发布流程、构建矩阵和 release 产物输出。这样可以保留现有 `tauri build` 的语义，同时获得标准化分发能力。

备选方案：
- 只保留手工 `tauri build`：无法解决 release 自动化问题。
- 改用其他发布工具：会增加额外学习和配置成本，没有必要。

### 2. 发布配置放在仓库根级别，并指向 `src-tauri` 包

根级别配置更适合和 GitHub Actions、版本号和 release 说明协同管理；`src-tauri` 继续保留应用包定义。这样也符合当前仓库已经采用的前后端分层。

备选方案：
- 只在 `src-tauri` 下配置：会让发布入口分散，不利于仓库级 release 管理。

### 3. GitHub Actions 负责触发，release 产物由 `cargo-dist` 输出

发布流程应在 CI 环境完成，而不是要求开发者本地手工执行完整打包。这样可以规避本机工具链差异，并让发布行为更可追溯。

备选方案：
- 使用本地脚本手工发布：容易出错，不利于协作。

## Risks / Trade-offs

- [风险] `cargo-dist` 与 Tauri 打包流程存在重复概念 → 缓解：明确边界，Tauri 负责应用构建，cargo-dist 负责 release 编排。
- [风险] Windows 构建链和 CI 镜像差异导致产物不一致 → 缓解：在 GitHub Actions 中固定工具链版本，并以 CI 为准。
- [风险] 初次接入会增加仓库配置复杂度 → 缓解：只引入最小必要配置，不提前做多平台矩阵扩张。

## Migration Plan

1. 在仓库根部加入 `cargo-dist` 配置。
2. 增加 GitHub Actions release workflow。
3. 验证 CI 能产出 Tauri 安装包或 release artifacts。
4. 将 release 说明和版本发布流程切换到 CI。

Rollback:
- 删除 `cargo-dist` 配置和 release workflow，继续使用手工 `tauri build`。

## Open Questions

- 是否需要立即支持多平台 release，还是先只确保 Windows 发布链路。
- GitHub release 是否由 tag 触发，还是由手动 workflow dispatch 触发。
