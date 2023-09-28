import { useRouter } from "next/router";
import Layout, { LayoutProps } from "@/components/layout";
import RecentAds from "@/components/recentAds";

export default function CategoryAds(props: LayoutProps): React.ReactNode {
  const router = useRouter();
  const query = router.query.id as string;

  return (
    <Layout title={"toto"}>
      <RecentAds title={"Offres par catégorie"} query={query} />
    </Layout>
  );
}
