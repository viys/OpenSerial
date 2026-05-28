# OpenSerial Architecture

本文档用于定义 `OpenSerial` 的技术架构、模块边界、数据流、事件流和后续演进原则。

目标不是一次性把所有实现细节写死，而是先建立一个稳定、可扩展、适合 AI 持续协作开发的架构基线。

## 1. 架构目标

OpenSerial 的架构需要同时满足以下要求：

- 串口收发稳定
- UI 实时响应
- 日志处理可扩展
- 过滤和搜索性能可控
- 后续可平滑扩展到“轻量上位机”能力
- 模块职责清晰，方便 AI 分阶段实现

## 2. 总体分层

项目建议分成四层：

1. 桌面宿主层
2. 串口与日志核心层
3. 应用状态与业务层
4. UI 表现层

```text
+------------------------------------------------------+
| UI Layer                                             |
| React / TypeScript / View Components                 |
+------------------------------------------------------+
| App State Layer                                      |
| session / filters / search / dashboard / settings    |
+------------------------------------------------------+
| Core Layer                                           |
| serial / log / parser / event pipeline               |
+------------------------------------------------------+
| Host Layer                                            |
| Tauri commands / events / window / persistence       |
+------------------------------------------------------+
```

## 3. 技术选型

### 桌面层

- Tauri
- Rust

作用：

- 承载桌面窗口
- 提供命令调用边界
- 管理事件推送
- 提供本地文件与系统能力访问

### 前端层

- React
- TypeScript
- Vite

作用：

- 渲染主界面
- 管理交互状态
- 提供日志、过滤、搜索、发送、状态面板等 UI

### 串口库

- Rust `serialport` crate

作用：

- 串口枚举
- 串口配置
- 读写数据
- 提供跨平台基础能力

## 4. 目录建议

建议的首版目录如下：

```text
OpenSerial/
  README.md
  TODO.md
  docs/
    architecture.md
    design.md
  design/
    pencil/
  samples/
  src/
    app/
    components/
    modules/
    store/
    styles/
    types/
  src-tauri/
    src/
      app/
      commands/
      serial/
      log/
      parser/
      session/
      state/
```

## 5. Rust 后端模块

### 5.1 `commands/`

职责：

- 暴露给前端的 Tauri command
- 作为 UI 与后端核心之间的边界层

建议内容：

- `list_ports`
- `open_port`
- `close_port`
- `send_bytes`
- `clear_session`
- `export_logs`
- `detect_baud_rate`

原则：

- command 层不做复杂业务
- command 只负责参数校验、调用服务、返回结果

### 5.2 `serial/`

职责：

- 串口枚举
- 串口打开与关闭
- 读写线程管理
- 串口状态维护

建议拆分：

- `manager.rs`
- `reader.rs`
- `writer.rs`
- `probe.rs`
- `types.rs`

说明：

- `manager` 负责端口生命周期
- `reader` 负责持续读取
- `writer` 负责发送队列
- `probe` 负责自动波特率探测

### 5.3 `log/`

职责：

- 定义日志结构
- 进行时间戳封装
- 存储当前会话日志
- 提供过滤、搜索、导出所需的数据基础

建议拆分：

- `entry.rs`
- `buffer.rs`
- `filter.rs`
- `search.rs`
- `export.rs`

### 5.4 `parser/`

职责：

- 将原始日志转换为结构化事件
- 提供状态映射、错误提取、指标计算

建议拆分：

- `rules.rs`
- `pipeline.rs`
- `event.rs`
- `dashboard.rs`

说明：

- 首版不建议做复杂脚本系统
- 先从规则匹配和字段提取做起

### 5.5 `session/`

职责：

- 当前连接会话管理
- 会话配置保存
- 发送历史
- 常用命令集合

### 5.6 `state/`

职责：

- 持有应用运行时共享状态
- 管理当前串口连接、日志缓冲、过滤器、面板状态

## 6. 前端模块

### 6.1 `modules/connection`

职责：

- 串口列表展示
- 参数选择
- 打开 / 关闭连接

### 6.2 `modules/terminal`

职责：

- 主日志流展示
- 时间戳
- 收发方向标记
- 自动滚动
- 暂停滚动
- 文本 / HEX 显示切换

### 6.3 `modules/filters`

职责：

- 关键字过滤
- 包含 / 排除规则
- 标签过滤
- 方向过滤
- 时间过滤

### 6.4 `modules/search`

职责：

- 实时搜索
- 匹配结果定位
- 搜索高亮
- 结果计数

### 6.5 `modules/dashboard`

职责：

- 解析结果展示
- 状态卡片
- 事件列表
- 关键字段可视化

### 6.6 `modules/settings`

职责：

- UI 设置
- 时间戳格式
- 默认发送模式
- 日志保留策略
- 主题和密度偏好

## 7. 关键数据结构

建议将日志从一开始就结构化，不要只存字符串。

### 7.1 串口配置

```text
SerialConfig
- port_name
- baud_rate
- data_bits
- parity
- stop_bits
- flow_control
- timeout_ms
```

### 7.2 日志条目

```text
LogEntry
- id
- timestamp
- direction
- raw_bytes
- text
- display_text
- encoding
- tags
- level
- source
- parsed_fields
```

说明：

- `raw_bytes` 保证原始数据可追溯
- `text` 保存解码后的文本
- `display_text` 允许做格式化展示
- `parsed_fields` 为后续上位机视图留接口

### 7.3 过滤条件

```text
FilterRule
- enabled
- mode
- pattern
- target
- case_sensitive
- regex
```

### 7.4 解析事件

```text
ParsedEvent
- id
- timestamp
- event_type
- title
- severity
- fields
- source_log_id
```

## 8. 数据流

### 8.1 接收数据流

```text
Serial Port
  -> Reader
  -> Raw Bytes
  -> LogEntry Build
  -> Parse Pipeline
  -> Session Buffer
  -> Tauri Event Emit
  -> Frontend Store
  -> Terminal / Dashboard / Filters
```

### 8.2 发送数据流

```text
Frontend Send Panel
  -> Tauri Command
  -> Writer Queue
  -> Serial Port
  -> Local Echo LogEntry
  -> Frontend Refresh
```

### 8.3 过滤与搜索流

```text
Session Buffer
  -> Filter Engine
  -> Search Engine
  -> Visible Rows
  -> UI Render
```

原则：

- 原始日志缓冲和可见日志集合分开
- 搜索和过滤基于结构化数据，而不是直接操作 DOM

## 9. 事件流

后端建议通过 Tauri event 向前端推送关键状态变化。

建议事件：

- `serial://ports-updated`
- `serial://connection-opened`
- `serial://connection-closed`
- `serial://rx`
- `serial://tx`
- `serial://error`
- `session://cleared`
- `parser://event`

原则：

- 高频数据事件尽量统一结构
- 连接状态和错误事件单独区分
- 事件名保持稳定，方便前后端解耦

## 10. 并发模型建议

首版建议保持简单明确：

- 一个读任务
- 一个写任务
- 一个共享会话状态
- 一个事件推送通道

建议思路：

- 读线程持续从串口读取
- 写线程从发送队列取数据写入
- 日志缓冲由专门状态层集中管理
- 前端只消费事件和查询状态，不直接参与底层同步

避免：

- UI 直接控制底层线程细节
- 多处维护日志副本
- 读写逻辑与过滤逻辑强耦合

## 11. 自动波特率探测策略

自动波特率探测建议独立成模块，不要散落在连接逻辑中。

基本流程建议：

1. 准备候选波特率集合
2. 逐个尝试打开端口
3. 在限定时间窗口内读取数据
4. 对数据质量进行评分
5. 返回候选结果或推荐结果

评分维度可包括：

- 可打印字符比例
- 换行结构合理性
- 已知前缀命中率
- 连续乱码比例
- 校验规则命中率

说明：

- 自动探测本质上是启发式，不应承诺绝对正确
- UI 应展示“推荐值”和“可信度”，而不是只给单一结果

## 12. 解析与上位机化策略

更直观的调试视图建立在解析管线上，不直接依赖 UI 写死逻辑。

建议流程：

1. 原始日志进入解析管线
2. 规则匹配提取字段
3. 生成结构化事件
4. 更新仪表状态
5. UI 消费事件和状态

这样做的好处：

- 终端视图和上位机视图共享底层数据
- 不同设备协议可以逐步扩展规则
- 后续更容易做插件化

## 13. 持久化边界

首版建议只持久化轻量配置：

- 最近使用的串口参数
- 发送历史
- 常用命令
- 窗口布局偏好
- 过滤规则预设

暂不建议首版持久化：

- 超大日志原始缓冲
- 全量解析缓存
- 复杂工程项目状态

## 14. 错误处理原则

需要明确区分三类错误：

1. 用户可恢复错误
2. 环境错误
3. 内部错误

示例：

- 用户可恢复错误：端口被占用、参数错误
- 环境错误：设备拔出、权限不足
- 内部错误：状态异常、线程通信失败

要求：

- 错误信息必须面向用户可理解
- 内部错误应保留调试信息
- UI 不能只显示“失败”

## 15. 对 AI 协作友好的要求

为了方便后续大量使用 AI 继续开发，架构需要满足：

- 模块职责单一
- 文件命名明确
- 文档与代码目录一一对应
- 数据结构优先稳定
- 事件命名统一
- 新增功能尽量通过扩展模块进入，而不是改动整条链路

## 16. 当前建议的开发顺序

1. 初始化项目骨架
2. 定义 Rust 基础类型
3. 打通串口枚举与连接
4. 建立日志结构和缓冲
5. 接入前端主布局
6. 实现搜索与过滤
7. 再进入解析与状态面板

## 17. 当前未决问题

- 前端状态管理库是否需要引入
- 日志列表是否首版就使用虚拟列表
- 自动波特率探测是否放在连接前还是连接后
- 解析规则采用 JSON 配置还是 Rust 内置规则

这些问题不影响先搭首版骨架，但在进入实现前需要逐步确认。
