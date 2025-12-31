"use client";

import React from "react";
import { useParams } from "next/navigation";

export default function DynamicSubPage() {
  const params = useParams();
  
  // Safely extract the page name from the slug array
  const slug = params.slug;
  const currentPage = Array.isArray(slug) ? slug[0] : slug;

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1 style={{ textTransform: "capitalize", color: "#22c55e", fontSize: "32px" }}>
        {currentPage || "Page"}
      </h1>
      <p style={{ color: "#666", marginTop: "10px" }}>
        Astrion is generating the interface for the <strong>{currentPage}</strong> module.
      </p>
      
      <div style={{ 
        marginTop: "40px", 
        height: "50vh", 
        border: "1px dashed #333", 
        borderRadius: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#111"
      }}>
        <p style={{ color: "#444" }}>AI Rendering Engine Active...</p>
      </div>
    </div>
  );
}