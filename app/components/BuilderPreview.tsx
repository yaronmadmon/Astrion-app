import type { Page } from "../../lib/engine/engineTypes";

type Props = {
  page?: Page;
  selectedComponentId?: string | null;
  onSelectComponent: (id: string | null) => void;
  onUpdateText: (id: string, text: string) => void;
};

export default function BuilderPreview({
  page,
  selectedComponentId,
  onSelectComponent,
}: Props) {
  return (
    <main
      style={{
        padding: 28,
        background: "#ffffff",
        overflowY: "auto",
      }}
    >
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>
          Canvas
        </div>
        <h2 style={{ margin: 0, fontSize: 28, lineHeight: 1.1 }}>
          {page?.name ?? "No page selected"}
        </h2>
      </div>

      {!page || page.components.length === 0 ? (
        <div
          style={{
            border: "1px dashed #d1d5db",
            borderRadius: 14,
            padding: 18,
            color: "#6b7280",
            background: "#fafafa",
          }}
        >
          Empty page canvas
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {page.components.map((c) => {
            const selected = c.id === selectedComponentId;

            return (
              <div
                key={c.id}
                onClick={() => onSelectComponent(c.id)}
                style={{
                  padding: 12,
                  borderRadius: 12,
                  border: selected
                    ? "2px solid #2563eb"
                    : "1px solid #e5e7eb",
                  background: selected ? "#eff6ff" : "#fafafa",
                  cursor: "pointer",
                }}
              >
                {c.type === "text" && (
                  <div style={{ fontSize: 16, color: "#111827" }}>{c.text}</div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div style={{ marginTop: 18 }}>
        <button
          onClick={() => onSelectComponent(null)}
          style={{
            padding: "8px 10px",
            borderRadius: 10,
            border: "1px solid #e5e7eb",
            background: "#fff",
            cursor: "pointer",
            fontSize: 13,
            color: "#374151",
          }}
        >
          Deselect
        </button>
      </div>
    </main>
  );
}
