import { AppPage } from "@/lib/contracts/appConfig"

export default function PageHost({ page }: { page: AppPage }) {
  return (
    <div style={{ padding: 24 }}>
      <h2>{page.title}</h2>
      <p>Page type: {page.type}</p>
    </div>
  )
}
