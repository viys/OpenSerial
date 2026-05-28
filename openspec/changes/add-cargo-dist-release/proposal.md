## Why

OpenSerial 已经具备可构建的 Tauri 应用，但还没有标准化的 release 流程。把 `cargo-dist` 接进来后，可以把构建、打包和发布从手工步骤变成可复用的自动化流程，减少每次发版时对本地环境和个人操作的依赖。

## What Changes

- 为 Rust/Tauri 发布流程引入 `cargo-dist` 配置。
- 新增 GitHub Actions release workflow，用于在 tag 或 release 事件触发时执行构建与分发产物生成。
- 让 Tauri 桌面二进制和安装包进入统一的发布管线。
- **BREAKING**: 发布不再依赖人工在本机执行完整打包流程。

## Capabilities

### New Capabilities
- `release-automation`: 自动生成和发布 OpenSerial 的桌面构建产物。

### Modified Capabilities
- None.

## Impact

- 新增 `dist-workspace.toml` 或等价 `cargo-dist` 配置。
- 新增 `.github/workflows/release.yml` 或等价发布工作流。
- 影响 `src-tauri/Cargo.toml`、release 参数、以及 CI 环境依赖。
