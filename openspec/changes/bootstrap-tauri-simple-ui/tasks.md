## 1. Project Bootstrap

- [x] 1.1 Initialize the Tauri + Rust + React + TypeScript application scaffold in the repository.
- [x] 1.2 Create the baseline frontend and Rust host directory structure that matches the documented architecture.
- [x] 1.3 Add build, development, and workspace configuration needed to run the desktop shell locally.

## 2. Host Shell Boundaries

- [x] 2.1 Add the Rust application bootstrap and register placeholder Tauri commands for future serial features.
- [x] 2.2 Define initial shared data types or payload shapes for mock port data and workbench state handoff.
- [x] 2.3 Wire the frontend to call at least one placeholder host command and handle its mock response path.

## 3. Workbench UI

- [x] 3.1 Implement the main workbench page with top toolbar, left connection pane, center log pane, right analysis pane, and bottom send panel.
- [x] 3.2 Populate the workbench with representative mock data for serial controls, log rows, filter widgets, status cards, and send history.
- [x] 3.3 Apply the low-saturation visual system, spacing, borders, and typography needed to match the documented desktop tool style.
- [x] 3.4 Add medium-width responsive behavior that compresses or collapses side panes before reducing the usability of the log area.

## 4. Verification

- [x] 4.1 Verify the Tauri development app launches successfully and renders the workbench shell.
- [x] 4.2 Verify the five primary workbench regions are visible and the center log pane remains the dominant visual area.
- [x] 4.3 Verify placeholder host-command integration and narrowed-window behavior work as specified.
