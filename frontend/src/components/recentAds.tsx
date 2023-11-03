import { useState } from "react";
import { AdCardProps } from "./adCard";
import AdCard from "./adCard";
import { useQuery, useMutation, gql } from "@apollo/client";
import { GET_ALL_ADS, DELETE_AD } from "@/Request/ads";
import styles from "@/styles/AdCard.module.css";

export default function RecentAds({
  title,
  categoryId,
}: {
  title: string;
  categoryId?: number;
}): React.ReactNode {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [itemBasket, setItemBasket] = useState<AdCardProps[]>([]);

  const { data } = useQuery<{ items: AdCardProps[] }>(GET_ALL_ADS, {
    variables: {
      query: {
        category: categoryId ? [categoryId] : null,
      },
    },
  });
  
  const [deleteSpecificAd] =
    useMutation<AdCardProps | null>(DELETE_AD, {
      refetchQueries: [GET_ALL_ADS],
    });

  async function deleteProduct(item: AdCardProps) {
    await deleteSpecificAd({
      variables: {
        id: item.id,
      },
    });
  }

  function AddToBasket(item: AdCardProps): void {
    setTotalPrice(totalPrice + item.price);
    setItemBasket([...itemBasket, item]);
  }

  return (
    <>
      <h2>{title}</h2>
      <p>Prix total : {totalPrice} €</p>
      <p>Nombre total de produits dans le panier : {itemBasket.length} </p>
      <section className={styles.recentAds}>
        {data?.items.map((item) => (
          <div key={item.id}>
            <AdCard
              id={item.id}
              title={item.title}
              description={item.description}
              owner={item.owner}
              location={item.location}
              price={item.price}
              createdAt={item.createdAt}
              imageUrl={item.imageUrl}
              category={item.category}
              tags={item.tags}
              onAddToBasket={() => AddToBasket(item)}
              onDelete={() => deleteProduct(item)}
            />
          </div>
        ))}
      </section>
    </>
  );
}
