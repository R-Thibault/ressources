import { useState, useEffect } from "react";
import { AdCardProps } from "./adCard";
import AdCard from "./adCard";
import FilterBar from "./filterBar";
import { useSearchParams } from "next/navigation";
import { useQuery, useMutation, gql } from "@apollo/client";
import { GET_ALL_ADS, DELETE_AD } from "@/Request/ads";
import styles from "@/styles/AdCard.module.css";
import { useRouter } from "next/router";

export type TagsProps = {
  id: number;
};

export default function RecentAds({
  title,
  categoryId,
}: {
  title: string;
  categoryId?: number;
}): React.ReactNode {
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [minPriceSelected, setMinPriceSelected] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [itemBasket, setItemBasket] = useState<AdCardProps[]>([]);

  const router = useRouter();

  const searchTags = useSearchParams().get("tags");
  const searchTitle = useSearchParams().get("search");
  const minPrice = useSearchParams().get("minPrice");

  useEffect(() => {
    if (searchTags) {
      const tagsArray = searchTags.split(",");
      const tagArrayNumber: number[] = [];
      for (const item of tagsArray) {
        tagArrayNumber.push(+item);
      }
      setSelectedTags(tagArrayNumber);
    }
    if (minPrice) {
      setMinPriceSelected(+minPrice);
    }
  }, [searchTags, searchTitle, minPrice]);

  const { data } = useQuery<{
    items: {
      ads: AdCardProps[];
      maxPrice: number;
    };
  }>(GET_ALL_ADS, {
    variables: {
      query: {
        category: categoryId ? [categoryId] : null,
        tags: selectedTags.length > 0 ? selectedTags : null,
        priceGTE: minPriceSelected === 0 ? null : minPriceSelected,
      },
    },
  });

  const [deleteSpecificAd] = useMutation<AdCardProps | null>(DELETE_AD, {
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

  function handleSelectTag(tag: TagsProps) {
    if (selectedTags.find((item) => item === +tag.id)) {
      const newTagArray = selectedTags.filter((item) => item !== +tag.id);
      if (newTagArray.length === 0) {
        delete router.query.tags;
        router.push(router);
        setSelectedTags(newTagArray);
      } else {
        router.query.tags = newTagArray.toString();
        router.push(router);
      }
    } else {
      const newTagArray = [...selectedTags];
      newTagArray.push(tag.id);
      router.query.tags = newTagArray.toString();
      router.push(router);
    }
  }

  function handleSelectPriceRange(price: number) {
    router.query.minPrice = price.toString();
    router.push(router);
  }

  return (
    <div className={styles.recentAdsContainer}>
      <div className={styles.recentAds}>
        <h2>{title}</h2>
        <p>Prix total : {totalPrice} €</p>
        <p>Nombre total de produits dans le panier : {itemBasket.length} </p>
        <section className={styles.recentAdsGrid}>
          {data?.items?.ads.map((item) => (
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
      </div>
      <FilterBar
        onSelectTag={(tag: TagsProps) => handleSelectTag(tag)}
        onSelectPriceRange={(price: number) => handleSelectPriceRange(price)}
        selectedTags={selectedTags}
        selectedPrice={minPriceSelected}
        maxPrice={data?.items.maxPrice}
      />
    </div>
  );
}
