## 1. cargo-dist Setup

- [x] 1.1 Add `cargo-dist` configuration for the OpenSerial Tauri package.
- [x] 1.2 Update Rust package metadata needed by automated release tooling.
- [x] 1.3 Verify the repository has a clear release entrypoint for `cargo-dist`.

## 2. Release Workflow

- [x] 2.1 Add a GitHub Actions workflow for automated release builds.
- [x] 2.2 Configure the workflow to install required Rust, Node, and Tauri build dependencies.
- [x] 2.3 Wire the workflow to invoke `cargo-dist` for release orchestration.

## 3. Verification

- [x] 3.1 Validate the `cargo-dist` configuration locally with a planning or build command.
- [x] 3.2 Verify the workflow file is present and references the release process correctly.
- [x] 3.3 Document the new release flow in the repository.
