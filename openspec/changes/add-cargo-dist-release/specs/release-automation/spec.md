## ADDED Requirements

### Requirement: Release pipeline shall be automated
The system SHALL provide an automated release pipeline that produces OpenSerial release artifacts without requiring a developer to manually run the full packaging process on a local machine.

#### Scenario: Triggering a release build
- **WHEN** a release trigger is executed in CI
- **THEN** the pipeline SHALL produce distributable artifacts for OpenSerial

#### Scenario: Avoiding manual packaging
- **WHEN** a developer prepares a release
- **THEN** the system SHALL not require the developer to complete the full packaging flow locally

### Requirement: Release pipeline shall use cargo-dist for orchestration
The system SHALL use `cargo-dist` as the release orchestration layer for the Rust/Tauri desktop application.

#### Scenario: Building through cargo-dist
- **WHEN** the release workflow runs
- **THEN** `cargo-dist` SHALL coordinate the build and distribution steps

#### Scenario: Preserving application build ownership
- **WHEN** the application is built
- **THEN** Tauri and Rust build settings SHALL remain the source of truth for application compilation

### Requirement: Release workflow shall be runnable in GitHub Actions
The system SHALL define a GitHub Actions workflow that can execute the release pipeline in CI.

#### Scenario: CI release execution
- **WHEN** a release tag or release event is published
- **THEN** GitHub Actions SHALL execute the release workflow and generate artifacts

#### Scenario: Workflow traceability
- **WHEN** developers inspect the repository
- **THEN** they SHALL find a workflow definition for release automation in the `.github/workflows` directory
