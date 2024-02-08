import Layout from "@/components/organisms/layout";
import { useRouter } from "next/router";
import AdForm from "@/components/adForm";

export default function EditAd(): React.ReactNode {
  const router = useRouter();
  const query = router.query.id as string;

  return (
    <Layout title={"Modififer une offre"}>
      {query && <AdForm query={query} />}
    </Layout>
  );
}
