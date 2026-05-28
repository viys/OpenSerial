import { invoke } from "@tauri-apps/api/core";
import type { MockPortInfo, WorkbenchSnapshot } from "../../types/workbench";

const fallbackPorts: MockPortInfo[] = [
  { portName: "COM3", baudRate: 115200, status: "available" },
  { portName: "COM8", baudRate: 9600, status: "busy" },
];

export async function fetchPorts(): Promise<MockPortInfo[]> {
  try {
    return await invoke<MockPortInfo[]>("list_ports");
  } catch {
    return fallbackPorts;
  }
}

export async function fetchWorkbenchSnapshot(): Promise<WorkbenchSnapshot> {
  try {
    return await invoke<WorkbenchSnapshot>("workbench_snapshot");
  } catch {
    return {
      ports: fallbackPorts,
      activePort: "COM3",
      connectionStatus: "Browser Preview",
    };
  }
}
