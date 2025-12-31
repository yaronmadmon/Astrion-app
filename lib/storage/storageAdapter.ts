export type StorageAdapter = {
  load: () => {
    data: Record<string, any[]>
    activePage: string | null
  } | null

  save: (state: {
    data: Record<string, any[]>
    activePage: string | null
  }) => void
}
