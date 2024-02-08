import RecentAds from "@/components/recentAds";
import Layout from "@/components/organisms/layout";

export default function Home(): React.ReactNode {
  return (
    <Layout title={"Accueil"}>
      <RecentAds title={"Offres récentes"} />
    </Layout>
  );
}
