import Layout, { LayoutProps } from "@/components/organisms/layout";

export default function About(props: LayoutProps): React.ReactNode {
  return (
    <Layout title={"A propos"}>
      <h2>A propos</h2>
    </Layout>
  );
}
