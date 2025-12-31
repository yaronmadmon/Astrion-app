"use client";

import React from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

export default function Sidebar({ items }: { items: string[] }) {
  const params = useParams();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "dashboard";
  const appId = params.id;

  return (
    <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Link href="/" style={{ color: "#38bdf8", textDecoration: "none", marginBottom: "20px", display: "block", fontSize: "14px", fontWeight: "bold" }}>
        ← Back to Builder
      </Link>

      <div style={{ color: "#475569", fontSize: "11px", fontWeight: "bold", marginBottom: "10px" }}>MENU</div>
      
      {items.map((item) => {
        const slug = item.toLowerCase();
        // This creates a URL like /apps/app_123?tab=analytics
        const href = `/apps/${appId}?tab=${slug}`;
        const isActive = currentTab === slug;

        return (
          <Link 
            key={item} 
            href={href}
            // The Link component handles the click automatically
            style={{ 
              color: isActive ? "#38bdf8" : "#94a3b8", 
              fontSize: "14px", 
              padding: "10px 0", 
              textDecoration: "none",
              background: isActive ? "rgba(56, 189, 248, 0.1)" : "transparent",
              borderRadius: "4px",
              paddingLeft: "8px",
              display: "block"
            }}
          >
            {item}
          </Link>
        );
      })}
    </nav>
  );
}