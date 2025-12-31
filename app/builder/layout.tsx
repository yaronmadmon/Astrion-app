import VoiceInput from "../components/shell/VoiceInput";

export default function BuilderLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0b0b0b", color: "white" }}>
      
      {/* 1. THE SIDEBAR */}
      <aside style={{
        width: 260,
        borderRight: "1px solid #333",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}>
        <div style={{ fontWeight: "bold", marginBottom: "20px", color: "#888" }}>APP PAGES</div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <button style={sidebarButtonStyle}>Dashboard</button>
          <button style={sidebarButtonStyle}>Users</button>
          <button style={sidebarButtonStyle}>Settings</button>
        </nav>
      </aside>

      {/* 2. THE MAIN PREVIEW AREA */}
      <main style={{ flex: 1, position: "relative", overflowY: "auto" }}>
        <div style={{ paddingBottom: 100 }}>
          {children}
        </div>

        {/* 3. PERSISTENT MIC */}
        <VoiceInput onText={(text) => console.log("Voice Command:", text)} />
      </main>
    </div>
  )
}

// Simple style object for the sidebar buttons
const sidebarButtonStyle = {
  textAlign: "left" as const,
  padding: "10px",
  background: "transparent",
  border: "1px solid #222",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
  fontSize: "14px"
};