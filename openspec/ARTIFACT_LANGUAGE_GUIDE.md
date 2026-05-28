# OpenSpec Artifact Language Guide

## 目的

本仓库中的 OpenSpec CLI 仍使用英文命令与英文界面输出；但 OpenSpec 产物内容默认采用简体中文编写，以便团队阅读、评审和维护。

## 默认规则

### 1. 新建产物默认使用简体中文

以下内容默认使用简体中文：

- `proposal.md`
- `design.md`
- `tasks.md`
- `openspec/changes/<change>/specs/*/spec.md`
- `openspec/specs/*/spec.md`

### 2. 保持工具依赖的结构关键字不变

为避免影响 OpenSpec 工具解析，以下结构关键字保持英文原样：

- `## ADDED Requirements`
- `## MODIFIED Requirements`
- `## REMOVED Requirements`
- `## RENAMED Requirements`
- `### Requirement:`
- `#### Scenario:`

说明文字、需求描述、场景描述、任务描述可以使用中文。

以下“内容层关键字”可以使用中文，只要不影响语义表达：

- 业务术语、领域词、功能名称
- 需求标题、场景标题、任务标题
- 人类可读的状态、条件、结果描述

原则是保留表达能力，不为了中文化而把内容写得更泛、更弱。

### 3. 标识符与技术实体保持原文

以下内容保持原文，不翻译：

- change 名称、capability 名称、文件名、目录名
- 代码标识符、宏、寄存器名、协议字段、错误码
- 命令行、路径、配置键、接口名、日志标签

### 4. 续写已有英文产物时优先保持一致

若现有产物主体已经是英文：

- 默认延续原语言，避免无关的整篇翻译
- 如用户明确要求中文化，再做统一转换
- 不要在同一小节里混杂中英文叙述

## 推荐写法

### proposal.md

推荐使用双语标题，兼顾模板语义与团队阅读：

- `## Why / 背景`
- `## What Changes / 变更内容`
- `## Capabilities / 能力范围`
- `## Impact / 影响范围`

正文使用中文，能力名保持英文 kebab-case。

### design.md

推荐标题：

- `## Context / 背景`
- `## Goals / 目标`
- `## Non-Goals / 非目标`
- `## Decisions / 关键决策`
- `## Risks / 风险`
- `## Verification / 验证`

正文应突出约束、边界、风险、验证方式，避免空泛描述。

### tasks.md

任务标题和任务描述默认中文，保持标准复选框格式：

```md
## 1. 接入入口与流程打通

- [ ] 1.1 接通新入口到既有处理流程
- [ ] 1.2 复用已有核心逻辑，避免重复实现
```

### spec.md

`Requirement` / `Scenario` 结构关键字保持英文，标题和正文可写中文，例如：

```md
## ADDED Requirements

### Requirement: 外部请求应进入统一处理流程

系统应支持从外部入口接收请求，并进入与现有内部入口一致的统一处理流程。

#### Scenario: 收到外部请求后进入既有主流程

- **WHEN** 系统收到来自外部入口的有效请求
- **THEN** 系统进入既有主流程并产出一致结果
```

## 实施建议

- 新建 change 时，优先从第一份产物开始就保持中文，减少后续混用
- sync main specs 时，若主 spec 不存在，可直接按本规范创建中文主 spec
- verify / review / archive 阶段的总结可使用中文，但命令与路径保持原文
- 编写示例时优先使用项目无关的业务表述，避免将某个协议、芯片、平台或产品线的细节写成通用规范
- 中文化时优先保持信息密度，不要为了“通用”而牺牲可验证性和约束力度
