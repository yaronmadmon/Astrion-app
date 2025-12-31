"use client";

import React from "react";

interface SidebarProps {
  items: string[];
}

export default function Sidebar({ items }: SidebarProps) {
  return (
    <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ color: "#475569", fontSize: "11px", fontWeight: "bold", marginBottom: "10px" }}>MENU</div>
      {items?.map((item) => (
        <div key={item} style={{ color: "#94a3b8", fontSize: "14px", padding: "8px 0" }}>
          {item}
        </div>
      ))}
    </nav>
  );
}