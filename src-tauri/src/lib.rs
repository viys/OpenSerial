mod app;
mod commands;
mod state;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    app::build()
        .run(tauri::generate_context!())
        .expect("error while running OpenSerial");
}
