import { AppRecord } from "@/types/appRecord"

const KEY = "astrion_apps_v1"

function loadAll(): AppRecord[] {
  if (typeof window === "undefined") return []
  const raw = localStorage.getItem(KEY)
  return raw ? JSON.parse(raw) : []
}

function saveAll(apps: AppRecord[]) {
  localStorage.setItem(KEY, JSON.stringify(apps))
}

export function saveApp(app: AppRecord) {
  const apps = loadAll()
  apps.push(app)
  saveAll(apps)
}

export function getApp(id: string): AppRecord | undefined {
  return loadAll().find(a => a.id === id)
}
