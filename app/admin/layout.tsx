import { Suspense } from "react";
// suspense helps display something while waiting for the actual content to load

export default function AdminLayout({
  // export default means the component can be imported anywhere as the main export.
  children,
}: {
  children: React.ReactNode;//whatever content in the component that react can render
}) {
  return (
    <div>
      <Suspense fallback={<div>Loading Admin...</div>}>{children}</Suspense>
      {/* ladind admin shows when waiting for the children to load */}
    </div>
  );
}