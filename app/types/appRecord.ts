import { AppConfig } from "@/lib/contracts/appConfig"

export type AppRecord = {
  id: string
  prompt: string
  config: AppConfig
  createdAt: number
}
