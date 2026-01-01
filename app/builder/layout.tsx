export default function BuilderLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-dvh">{children}</div>
  );
}