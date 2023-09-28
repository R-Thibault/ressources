import { useRouter } from "next/router";
import Layout, { LayoutProps } from "@/components/layout";
import { AdCardProps } from "@/components/adCard";
import styles from "@/styles/AdDetails.module.css";
import { useState, useEffect } from "react";
import * as customHooks from "@/hooks/customHooks";


export default function AdDetails(props: LayoutProps): React.ReactNode {
  const [product, setProduct] = useState<AdCardProps | null>(null);
  const router = useRouter();
  const query = router.query.id as string;

  async function getAdData(id: string) {
    try {
      const result = await customHooks.fetchAd(id);
      setProduct(result.ad);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (query) {
      getAdData(query);
    }
  }, [query]);

  if (product) {
    return (
      <Layout title={product.title}>
        <section className={styles.flexColumn}>
          <div className={styles.flexRow}>
            <h2>{product.title}</h2>
            <span>{product.price} €</span>
          </div>
          <div className={styles.flexRowStart}>
            <div className={styles.flexColumnSpaceBetween}>
              <div className={styles.flexRow}>
                <a
                  href={`/category/${product.category.id}`}
                  className={styles.category}
                >
                  {product.category.title}
                </a>
                <span>{product.createdAt.toString()}</span>
              </div>

              {product.tags.length > 0 && (
                <div className={styles.flexRow}>
                  {product.tags.map((item) => (
                    <a
                      key={item.id}
                      href={`/tag/${item.id}`}
                      className={styles.tag}
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              )}
              <p>{product.description}</p>
              <p>Vendu par : {product.owner}</p>
              <button className="button link-button">
                <span>Ajouter au panier</span>
              </button>
            </div>
            <img
              src={product.imageUrl}
              className={styles.image}
              alt={product.title}
            ></img>
          </div>
        </section>
      </Layout>
    );
  } else {
    return;
  }
}
