"use client";

import { useState } from "react";

type Msg = { id: number; text: string; state: "outbox" | "sent" | "lost-attempt" };

export function OutboxLab() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [relayAlive, setRelayAlive] = useState(true);
  const [seq, setSeq] = useState(1);

  const enqueue = () => {
    const id = seq;
    setSeq((s) => s + 1);
    setMsgs((m) => [...m, { id, text: `msg-${id}`, state: "outbox" }]);
  };

  const tickRelay = () => {
    if (!relayAlive) {
      setMsgs((m) =>
        m.map((x) => (x.state === "outbox" ? { ...x, state: "lost-attempt" as const } : x)),
      );
      return;
    }
    setMsgs((m) =>
      m.map((x) =>
        x.state === "outbox" || x.state === "lost-attempt"
          ? { ...x, state: "sent" as const }
          : x,
      ),
    );
  };

  return (
    <div className="pixel-border p-5">
      <p className="text-sm text-ink-soft">
        Messages land in the outbox first. Kill the relay, then revive it — pending rows still
        deliver. Inspired by the Atrium outbox story (resume-safe; no proprietary details).
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="btn" onClick={enqueue}>
          Persist message
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setRelayAlive((v) => !v)}
        >
          Relay: {relayAlive ? "UP" : "DOWN"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={tickRelay}>
          Run relay tick
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {msgs.map((m) => (
          <li key={m.id} className="rounded-lg bg-surface-2 px-3 py-2 text-sm">
            {m.text} → <strong>{m.state}</strong>
          </li>
        ))}
        {msgs.length === 0 && <li className="text-sm text-ink-soft">Outbox empty.</li>}
      </ul>
    </div>
  );
}
