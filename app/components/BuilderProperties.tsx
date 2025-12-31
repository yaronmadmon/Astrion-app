import type { ComponentBlock } from "../../lib/engine/engineTypes";

type Props = {
  component?: ComponentBlock;
  onUpdateText: (text: string) => void;
};

export default function BuilderProperties({ component, onUpdateText }: Props) {
  return (
    <aside
      style={{
        padding: 16,
        borderLeft: "1px solid #e5e7eb",
        background: "#fafafa",
        overflowY: "auto",
      }}
    >
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>
          Inspector
        </div>
        <h3 style={{ margin: 0, fontSize: 18 }}>Properties</h3>
      </div>

      {!component ? (
        <div
          style={{
            border: "1px dashed #d1d5db",
            borderRadius: 14,
            padding: 14,
            color: "#6b7280",
            background: "#fff",
          }}
        >
          Select an element to edit
        </div>
      ) : component.type === "text" ? (
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 14,
            padding: 14,
          }}
        >
          <label style={{ display: "block", fontSize: 13, marginBottom: 8 }}>
            Text
          </label>
          <input
            value={component.text}
            onChange={(e) => onUpdateText(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid #d1d5db",
              fontSize: 14,
              outline: "none",
            }}
          />
        </div>
      ) : (
        <div
          style={{
            border: "1px dashed #d1d5db",
            borderRadius: 14,
            padding: 14,
            color: "#6b7280",
            background: "#fff",
          }}
        >
          No editor for this component type yet.
        </div>
      )}
    </aside>
  );
}
