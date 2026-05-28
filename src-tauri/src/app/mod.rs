pub fn build() -> tauri::Builder<tauri::Wry> {
    tauri::Builder::default().invoke_handler(tauri::generate_handler![
        crate::commands::list_ports,
        crate::commands::workbench_snapshot
    ])
}
