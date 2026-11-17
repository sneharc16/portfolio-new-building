import { Suspense } from "react";
import App from "@/components/App";
import { getItem } from "@/data/content";
import { parseProfile, returningVisitorScript } from "@/lib/profile";

async function Resolved({ searchParams }: { searchParams: PageProps<"/">["searchParams"] }) {
  const sp = await searchParams;
  const profile = parseProfile(sp.profile);
  const rawItem = Array.isArray(sp.item) ? sp.item[0] : sp.item;
  const item = rawItem && getItem(rawItem) ? rawItem : null;
  return <App initialProfile={profile} initialItem={item} />;
}

export default function Page({ searchParams }: PageProps<"/">) {
  return (
    <>
      {/* Static shell: sends returning visitors to their last profile before first paint. */}
      <script dangerouslySetInnerHTML={{ __html: returningVisitorScript }} />
      <Suspense fallback={<div className="min-h-[100svh] bg-bg" aria-hidden />}>
        <Resolved searchParams={searchParams} />
      </Suspense>
    </>
  );
}
