/* eslint-disable react/no-unescaped-entities */
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import { AdCardProps } from "@/components/adCard";
import styles from "@/styles/AdDetails.module.css";
import { useQuery } from "@apollo/client";
import { GET_AD_BY_ID } from "@/Request/ads";

export default function AdDetails(): React.ReactNode {
  const router = useRouter();
  const query = router.query.id;

  const { data } = useQuery<{ item: AdCardProps | null }>(GET_AD_BY_ID, {
    variables: { id: query },
    skip: query === undefined,
  });

  if (data?.item) {
    return (
      <Layout title={data.item.title}>
        <section className={styles.flexColumn}>
          <div className={styles.flexRow}>
            <h2>{data.item.title}</h2>
            <span>{data.item.price} €</span>
          </div>
          <div className={styles.flexRowStart}>
            <div className={styles.flexColumnSpaceBetween}>
              <div className={styles.flexRow}>
                <a
                  href={`/category/${data.item.category.id}/ads`}
                  className={styles.category}
                >
                  {data.item.category.title}
                </a>
                <span>
                  {new Date(data.item.createdAt).toLocaleDateString()}
                </span>
              </div>

              {data.item.tags.length > 0 && (
                <div className={styles.tagsContainer}>
                  {data.item.tags.map((item) => (
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
              <p>{data.item.description}</p>
              <p>Vendu par : {data.item.owner}</p>
              <div className={styles.buttonsContainer}>
                <button className="button link-button">
                  <span>Ajouter au panier</span>
                </button>
                <a
                  className="button link-button"
                  href={`/ads/${data.item.id}/edit`}
                >
                  Modifier l'offre
                </a>
              </div>
            </div>
            <img
              src={data.item.imageUrl}
              className={styles.image}
              alt={data.item.title}
            ></img>
          </div>
        </section>
      </Layout>
    );
  } else {
    return;
  }
}
