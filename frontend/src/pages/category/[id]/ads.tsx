import { useRouter } from "next/router";
import Layout from "@/components/organisms/layout";
import RecentAds from "@/components/recentAds";

export default function CategoryAds(): React.ReactNode {
  const router = useRouter();
  const query = Number(router.query.id);

  if (router.query) {
    return (
      <Layout title={"Catégorie"}>
        <RecentAds title={"Offres par catégorie"} categoryId={query} />
      </Layout>
    );
  } else {
    return;
  }
}
