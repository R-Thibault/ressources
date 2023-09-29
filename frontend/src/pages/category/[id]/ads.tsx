import { useRouter } from "next/router";
import Layout, { LayoutProps } from "@/components/layout";
import RecentAds from "@/components/recentAds";

export default function CategoryAds(props: LayoutProps): React.ReactNode {
  const router = useRouter();
  const query = Number(router.query.id);

  if (query) {
    return (
      <Layout title={"Catégorie"}>
        <RecentAds title={"Offres par catégorie"} categoryId={query} />
      </Layout>
    );
  } else {
    return;
  }
}
