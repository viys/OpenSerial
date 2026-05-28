import type {
  FilterPreset,
  LogEntry,
  SendHistoryItem,
  StatusCard,
} from "../../types/workbench";

export const mockLogs: LogEntry[] = [
  {
    id: "log-1",
    timestamp: "23:18:40.224",
    direction: "SYS",
    message: "Session initialized with mock transport boundary.",
    emphasis: "muted",
  },
  {
    id: "log-2",
    timestamp: "23:18:41.103",
    direction: "RX",
    message: "BOOT: board=stm32f407 mode=diagnostic",
  },
  {
    id: "log-3",
    timestamp: "23:18:41.409",
    direction: "TX",
    message: "set mode trace",
  },
  {
    id: "log-4",
    timestamp: "23:18:42.010",
    direction: "RX",
    message: "TRACE: sensor.temp=26.4 sensor.vbat=4.96",
  },
  {
    id: "log-5",
    timestamp: "23:18:43.882",
    direction: "RX",
    message: "WARN: adc drift detected on channel 3",
    emphasis: "warning",
  },
  {
    id: "log-6",
    timestamp: "23:18:44.091",
    direction: "SYS",
    message: "Search highlight prepared for keyword: WARN",
    emphasis: "muted",
  },
];

export const mockFilters: FilterPreset[] = [
  { id: "rx", label: "RX only", active: true },
  { id: "warn", label: "Warnings", active: false },
  { id: "boot", label: "Boot markers", active: true },
  { id: "parser", label: "Parsed fields", active: false },
];

export const mockStatusCards: StatusCard[] = [
  { id: "port", label: "Active Port", value: "COM3", tone: "info" },
  { id: "mode", label: "Device Mode", value: "Diagnostic", tone: "neutral" },
  { id: "errors", label: "Error Count", value: "01", tone: "warning" },
  { id: "link", label: "Signal State", value: "Stable", tone: "success" },
];

export const mockSendHistory: SendHistoryItem[] = [
  { id: "send-1", label: "Reset board", payload: "reset\\r\\n" },
  { id: "send-2", label: "Read sensors", payload: "get sensors\\r\\n" },
  { id: "send-3", label: "Enable trace", payload: "trace on\\r\\n" },
];
