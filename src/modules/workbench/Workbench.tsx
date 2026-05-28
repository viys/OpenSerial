import { useEffect, useState } from "react";
import { fetchPorts, fetchWorkbenchSnapshot } from "./host";
import {
  mockFilters,
  mockLogs,
  mockSendHistory,
  mockStatusCards,
} from "./mockData";
import type { MockPortInfo, WorkbenchSnapshot } from "../../types/workbench";

const baudRateOptions = ["9600", "57600", "115200", "230400"];

function toneClass(tone?: string) {
  return tone ? ` tone-${tone}` : "";
}

export function Workbench() {
  const [snapshot, setSnapshot] = useState<WorkbenchSnapshot>({
    ports: [],
    activePort: "Loading",
    connectionStatus: "Connecting",
  });
  const [ports, setPorts] = useState<MockPortInfo[]>([]);
  const [rightPaneOpen, setRightPaneOpen] = useState(true);
  const [leftPaneOpen, setLeftPaneOpen] = useState(true);

  useEffect(() => {
    void fetchWorkbenchSnapshot().then(setSnapshot);
    void fetchPorts().then(setPorts);
  }, []);

  return (
    <div className="shell">
      <header className="toolbar panel">
        <div className="toolbar__brand">
          <span className="eyebrow">OpenSerial</span>
          <strong>Workbench Shell</strong>
        </div>
        <div className="toolbar__controls">
          <span className="chip">{snapshot.connectionStatus}</span>
          <button type="button" className="button button--ghost">
            Export
          </button>
          <button type="button" className="button button--primary">
            Open Port
          </button>
        </div>
      </header>

      <main className="workspace">
        <aside className={`panel pane pane--left ${leftPaneOpen ? "" : "is-collapsed"}`}>
          <div className="pane__header">
            <h2>Connection</h2>
            <button
              type="button"
              className="pane__toggle"
              onClick={() => setLeftPaneOpen((open) => !open)}
            >
              {leftPaneOpen ? "Collapse" : "Expand"}
            </button>
          </div>

          <div className="field-group">
            <label className="field">
              <span>Port</span>
              <select defaultValue={snapshot.activePort}>
                {ports.map((port) => (
                  <option key={port.portName} value={port.portName}>
                    {port.portName} · {port.status}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Baud Rate</span>
              <select defaultValue="115200">
                {baudRateOptions.map((rate) => (
                  <option key={rate} value={rate}>
                    {rate}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Framing</span>
              <input value="8N1 / None" readOnly />
            </label>
          </div>

          <div className="port-list">
            {ports.map((port) => (
              <div key={port.portName} className="port-row">
                <div>
                  <strong>{port.portName}</strong>
                  <span>{port.baudRate} baud</span>
                </div>
                <span className={`status-tag status-tag--${port.status}`}>
                  {port.status}
                </span>
              </div>
            ))}
          </div>
        </aside>

        <section className="panel pane pane--center">
          <div className="pane__header">
            <h2>Live Log</h2>
            <div className="pane__meta">
              <span>Search: WARN</span>
              <span>{mockLogs.length} rows</span>
            </div>
          </div>

          <div className="log-list">
            {mockLogs.map((entry) => (
              <article
                key={entry.id}
                className={`log-row${entry.emphasis ? ` log-row--${entry.emphasis}` : ""}`}
              >
                <span className="log-row__time">{entry.timestamp}</span>
                <span className={`log-row__direction log-row__direction--${entry.direction.toLowerCase()}`}>
                  {entry.direction}
                </span>
                <span className="log-row__message">{entry.message}</span>
              </article>
            ))}
          </div>
        </section>

        <aside className={`panel pane pane--right ${rightPaneOpen ? "" : "is-collapsed"}`}>
          <div className="pane__header">
            <h2>Inspect</h2>
            <button
              type="button"
              className="pane__toggle"
              onClick={() => setRightPaneOpen((open) => !open)}
            >
              {rightPaneOpen ? "Collapse" : "Expand"}
            </button>
          </div>

          <div className="search-box">
            <label className="field">
              <span>Search</span>
              <input value="WARN" readOnly />
            </label>
          </div>

          <div className="filter-list">
            {mockFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={`filter-chip${filter.active ? " is-active" : ""}`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="status-grid">
            {mockStatusCards.map((card) => (
              <article key={card.id} className={`status-card${toneClass(card.tone)}`}>
                <span>{card.label}</span>
                <strong>{card.value}</strong>
              </article>
            ))}
          </div>
        </aside>
      </main>

      <footer className="panel send-panel">
        <div className="send-panel__header">
          <h2>Send Panel</h2>
          <span>Mock command queue</span>
        </div>
        <div className="send-panel__body">
          <label className="field field--composer">
            <span>Payload</span>
            <textarea defaultValue={"trace once\\r\\n"} rows={3} />
          </label>
          <div className="send-panel__actions">
            <button type="button" className="button button--ghost">
              HEX
            </button>
            <button type="button" className="button button--ghost">
              Append CRLF
            </button>
            <button type="button" className="button button--primary">
              Send
            </button>
          </div>
          <div className="history-list">
            {mockSendHistory.map((item) => (
              <article key={item.id} className="history-item">
                <div>
                  <strong>{item.label}</strong>
                  <span>{item.payload}</span>
                </div>
                <button type="button" className="button button--ghost button--small">
                  Reuse
                </button>
              </article>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
