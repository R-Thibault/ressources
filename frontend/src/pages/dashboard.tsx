import Layout from "@/components/organisms/layout";
import TagsDisplay from "@/components/organisms/tagsDisplay";

export default function Dashboard(): React.ReactNode {
  return (
    <Layout title={"Dashboard"}>
      <TagsDisplay />
    </Layout>
  );
}
