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
    <nav className="flex flex-col gap-1">
      <Link
        href="/builder"
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-sky-200"
      >
        <span aria-hidden>←</span> Back to Builder
      </Link>

      <div className="mb-1 text-[11px] font-semibold tracking-widest text-slate-500">
        MENU
      </div>
      
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
            className={[
              "block rounded-lg px-3 py-2 text-sm transition",
              isActive
                ? "bg-sky-400/10 text-sky-300 ring-1 ring-sky-400/15"
                : "text-slate-300 hover:bg-white/5 hover:text-slate-100",
            ].join(" ")}
          >
            {item}
          </Link>
        );
      })}
    </nav>
  );
}