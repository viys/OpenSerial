use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct MockPortInfo {
    pub port_name: String,
    pub baud_rate: u32,
    pub status: String,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct MockWorkbenchSnapshot {
    pub ports: Vec<MockPortInfo>,
    pub active_port: String,
    pub connection_status: String,
}

#[tauri::command]
pub fn list_ports() -> Vec<MockPortInfo> {
    vec![
        MockPortInfo {
            port_name: "COM3".into(),
            baud_rate: 115_200,
            status: "available".into(),
        },
        MockPortInfo {
            port_name: "COM8".into(),
            baud_rate: 9_600,
            status: "busy".into(),
        },
    ]
}

#[tauri::command]
pub fn workbench_snapshot() -> MockWorkbenchSnapshot {
    MockWorkbenchSnapshot {
        ports: list_ports(),
        active_port: "COM3".into(),
        connection_status: "Mock Ready".into(),
    }
}
