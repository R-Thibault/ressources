import Layout from "@/components/layout";
import AdForm from "@/components/adForm";

export default function NewAd(): React.ReactNode {
  return (
    <Layout title={"Poster une offre"}>
      <AdForm />
    </Layout>
  );
}
