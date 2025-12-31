export type AppPage = {
  id: string
  title: string
  type: "dashboard" | "table" | "form"
}

export type AppConfig = {
  name: string
  pages: AppPage[]
}
