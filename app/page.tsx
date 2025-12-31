import RealEstateApp from "@/lib/generators/realEstateApp";
import Link from "next/link";
import HistoryPanel from "./components/HistoryPanel";

export default function Page() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Astrion</h1>
      <p style={{ marginTop: 8, marginBottom: 16 }}>
        <Link href="/builder">Open Builder</Link>
      </p>

      <HistoryPanel />

      <hr style={{ margin: "24px 0" }} />
      <h2>Example Generated App</h2>
      <RealEstateApp />
    </main>
  );
}
