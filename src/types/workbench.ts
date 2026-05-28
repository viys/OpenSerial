export type PortStatus = "available" | "busy";

export interface MockPortInfo {
  portName: string;
  baudRate: number;
  status: PortStatus;
}

export interface WorkbenchSnapshot {
  ports: MockPortInfo[];
  activePort: string;
  connectionStatus: string;
}

export type LogDirection = "RX" | "TX" | "SYS";

export interface LogEntry {
  id: string;
  timestamp: string;
  direction: LogDirection;
  message: string;
  emphasis?: "normal" | "muted" | "warning";
}

export interface FilterPreset {
  id: string;
  label: string;
  active: boolean;
}

export interface StatusCard {
  id: string;
  label: string;
  value: string;
  tone?: "neutral" | "info" | "success" | "warning";
}

export interface SendHistoryItem {
  id: string;
  label: string;
  payload: string;
}
