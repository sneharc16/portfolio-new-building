import App from "@/components/App";
import { getItem } from "@/data/content";
import { parseProfile, returningVisitorScript } from "@/lib/profile";

export default async function Page({ searchParams }: PageProps<"/">) {
  const sp = await searchParams;
  const profile = parseProfile(sp.profile);
  const rawItem = Array.isArray(sp.item) ? sp.item[0] : sp.item;
  const item = rawItem && getItem(rawItem) ? rawItem : null;

  return (
    <>
      {/* Sends returning visitors to their last profile before first paint. */}
      {!profile && <script dangerouslySetInnerHTML={{ __html: returningVisitorScript }} />}
      <App initialProfile={profile} initialItem={item} />
    </>
  );
}
