"use client";

import { useState } from "react";
import { Window } from "@/components/ui/Window";

type Msg = {
  id: number;
  text: string;
  state: "outbox" | "sent" | "lost";
};

type Mode = "outbox" | "naive";

export function OutboxLab() {
  const [mode, setMode] = useState<Mode>("outbox");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [relayAlive, setRelayAlive] = useState(true);
  const [brokerAlive, setBrokerAlive] = useState(true);
  const [seq, setSeq] = useState(1);
  const [lost, setLost] = useState(0);

  const enqueue = () => {
    const id = seq;
    setSeq((s) => s + 1);
    if (mode === "naive") {
      if (!brokerAlive || !relayAlive) {
        setLost((n) => n + 1);
        setMsgs((m) => [...m, { id, text: `msg-${id}`, state: "lost" }]);
        return;
      }
      setMsgs((m) => [...m, { id, text: `msg-${id}`, state: "sent" }]);
      return;
    }
    setMsgs((m) => [...m, { id, text: `msg-${id}`, state: "outbox" }]);
  };

  const tickRelay = () => {
    if (mode === "naive") return;
    if (!relayAlive || !brokerAlive) return;
    setMsgs((m) =>
      m.map((x) => (x.state === "outbox" ? { ...x, state: "sent" as const } : x)),
    );
  };

  const reset = () => {
    setMsgs([]);
    setLost(0);
    setSeq(1);
    setRelayAlive(true);
    setBrokerAlive(true);
  };

  const pending = msgs.filter((m) => m.state === "outbox").length;
  const sent = msgs.filter((m) => m.state === "sent").length;

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-soft">
        Goal: prove messages are persisted before delivery. Kill the relay, then revive it.
      </p>
      <div className="flex flex-wrap gap-2">
        {(["outbox", "naive"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            className={`tag ${mode === m ? "bg-blush" : ""}`}
            onClick={() => {
              setMode(m);
              reset();
            }}
          >
            {m === "outbox" ? "Outbox mode" : "Naive mode (no outbox)"}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 font-medium text-xs">
        <span className="tag">Client</span>
        <span>→</span>
        <span className="tag tag-backend">API</span>
        <span>→</span>
        <span className={`tag ${mode === "outbox" ? "tag-ai" : "bg-tomato/30"}`}>
          {mode === "outbox" ? "Postgres outbox" : "memory only"}
        </span>
        <span>→</span>
        <span className={`tag ${relayAlive ? "tag-ai" : "bg-tomato/40"}`}>
          Relay {relayAlive ? "UP" : "DOWN"}
        </span>
        <span>→</span>
        <span className={`tag ${brokerAlive ? "tag-frontend" : "bg-tomato/40"}`}>
          Broker {brokerAlive ? "UP" : "DOWN"}
        </span>
        <span>→</span>
        <span className="tag">Subscribers</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Window title="controls.exe" status={`pending=${pending} sent=${sent} lost=${lost}`}>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn" onClick={enqueue}>
              Send message
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setRelayAlive((v) => !v)}
            >
              {relayAlive ? "Kill relay" : "Restart relay"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setBrokerAlive((v) => !v)}
            >
              {brokerAlive ? "Kill broker" : "Restart broker"}
            </button>
            {mode === "outbox" ? (
              <button type="button" className="btn" onClick={tickRelay}>
                Run relay tick
              </button>
            ) : null}
            <button type="button" className="btn btn-ghost" onClick={reset}>
              Reset
            </button>
          </div>
        </Window>

        <Window title="outbox.table" status="persisted-before-delivered">
          <ul className="space-y-2" aria-live="polite">
            {msgs.length === 0 ? (
              <li className="text-sm text-ink-soft">Outbox empty.</li>
            ) : (
              msgs.map((m) => (
                <li
                  key={m.id}
                  className="flex items-center justify-between rounded-lg border-2 border-border bg-cream px-3 py-2 text-sm"
                >
                  <span>{m.text}</span>
                  <span className="tag">{m.state}</span>
                </li>
              ))
            )}
          </ul>
        </Window>
      </div>

      <Window title="what-you-learned.txt">
        <p className="text-sm text-ink-soft">
          With an outbox, killing the relay only delays delivery — rows stay durable. In naive mode,
          the same kill loses the message. Scenario categories covered: relay crash, broker down,
          restart replay, persist-before-deliver.
        </p>
      </Window>
    </div>
  );
}
