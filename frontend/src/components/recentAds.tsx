import { useEffect, useState } from "react";
import { AdCardProps } from "./adCard";
import AdCard from "./adCard";
import styles from "@/styles/AdCard.module.css";
import * as customHooks from "@/hooks/customHooks";
import axios from "axios";
import { API_URL } from "@/config/config";

export default function RecentAds({
  title,
  categoryId,
}: {
  title: string;
  categoryId?: number;
}): React.ReactNode {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [itemBasket, setItemBasket] = useState<AdCardProps[]>([]);
  const [ads, setAds] = useState<AdCardProps[]>([]);

  useEffect(() => {
    getData(categoryId);
  }, [categoryId]);

  async function getData(categoryId?: number) {
    const url = categoryId
      ? `${API_URL}/ads?category=${categoryId}`
      : `${API_URL}/ads`;
    const response = await customHooks.fetchAds(url);
    setAds(response.ads);
  }

  async function deleteProduct(item: AdCardProps) {
    try {
      const result = await axios.delete(`${API_URL}/ads/${item.id}`);
      if (result.status === 200) {
        getData(categoryId);
      }
    } catch (error) {
      console.log(error);
    }
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
        {ads.length > 0 &&
          ads.map((item) => (
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
