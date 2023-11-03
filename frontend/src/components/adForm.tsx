import { FormEvent, useState, useEffect } from "react";
import styles from "@/styles/NewAd.module.css";
import { useRouter } from "next/router";
import { AdCardProps, CategoryProps } from "@/components/adCard";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_CATEGORIES } from "@/Request/category";
import { GET_ALL_TAGS } from "@/Request/tags";
import { CREATE_NEW_AD, GET_AD_BY_ID, UPDATE_AD } from "@/Request/ads";

export type DataEntries = {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  location: string;
  owner: string;
  category: { id: number };
  tags?: Tag[];
};

export type Tag = {
  id: number;
};

export type TagsProps = {
  id: number;
  title: string;
};

export type Errors = {
  title: boolean;
  description: boolean;
  price: boolean;
  imageUrl: boolean;
  location: boolean;
  category: boolean;
  submit: boolean;
};

export type AdFormProps = {
  query?: string;
};

export default function AdForm(props: AdFormProps): React.ReactNode {
  const router = useRouter();
  const [product, setProduct] = useState<DataEntries>({
    title: "",
    description: "",
    price: 0,
    imageUrl: "",
    location: "",
    owner: "",
    category: { id: 0 },
    tags: [],
  });
  const [errors, setErrors] = useState<Errors>({
    title: false,
    description: false,
    price: false,
    imageUrl: false,
    location: false,
    category: false,
    submit: false,
  });

  const { data: categories } = useQuery<{ items: CategoryProps[] }>(
    GET_ALL_CATEGORIES
  );

  const { data: productTags } = useQuery<{ items: TagsProps[] }>(GET_ALL_TAGS);

  const { data: ad } = useQuery<{ item: AdCardProps | null }>(GET_AD_BY_ID, {
    variables: { id: props.query },
    skip: props.query === undefined,
  });

  const [createAd, { error: createAdError }] =
    useMutation<AdCardProps>(CREATE_NEW_AD);

  const [updateAd, { error: updateAdError }] =
    useMutation<AdCardProps>(UPDATE_AD);

  useEffect(() => {
    if (props.query) {
      if (ad?.item) {
        let tagsArray = [];

        for (const tag of ad.item.tags) {
          tagsArray.push({ id: +tag.id });
        }
        setProduct({
          title: ad?.item.title,
          description: ad?.item.description,
          price: ad?.item.price,
          imageUrl: ad?.item.imageUrl,
          location: ad?.item.location,
          owner: ad?.item.owner,
          category: { id: ad?.item.category.id },
          tags: tagsArray,
        });
      }
    }
  }, [ad?.item, props.query]);

  async function postData(item: DataEntries) {
    try {
      await createAd({
        variables: {
          data: item,
        },
      });
      if (!createAdError) {
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
      setErrors({ ...errors, submit: true });
    }
  }

  async function updateData(item: DataEntries) {
    try {
      await updateAd({
        variables: {
          id: props.query,
          data: item,
        },
      });
      if (!updateAdError) {
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
      setErrors({ ...errors, submit: true });
    }
  }

  function handleSelectBox(value: Tag) {
    if (product.tags?.find((item) => item.id === +value.id)) {
      const newSelectBoxArray = product.tags.filter(
        (item) => item.id !== +value.id
      );
      setProduct({ ...product, tags: newSelectBoxArray });
    } else {
      setProduct({
        ...product,
        tags: product.tags
          ? [...product.tags, { id: +value.id }]
          : product.tags,
      });
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newErrors = {
      title: false,
      description: false,
      price: false,
      imageUrl: false,
      location: false,
      category: false,
      submit: false,
    };

    const missingData = {
      owner: "email@email.fr",
    };

    const newObject = props.query
      ? product
      : Object.assign(product, missingData);

    if (newObject.title.length < 1) {
      newErrors.title = true;
    }
    if (newObject.description.length < 1) {
      newErrors.description = true;
    }
    if (newObject.price === 0 || !newObject.price) {
      newErrors.price = true;
    }
    if (newObject.imageUrl.length < 1) {
      newErrors.imageUrl = true;
    }
    if (newObject.location.length < 1) {
      newErrors.location = true;
    }
    if (!newObject.category.id) {
      newErrors.category = true;
    }
    setErrors(newErrors);

    if (
      !newErrors.title &&
      !newErrors.description &&
      !newErrors.imageUrl &&
      !newErrors.location &&
      !newErrors.category &&
      !newErrors.price
    ) {
      if (props.query) {
        updateData(newObject);
      } else {
        postData(newObject);
      }
    }
  }

  return (
    <>
      <h2>{props.query ? "Modifier l'annonce" : "Poster l'annonce"}</h2>
      {errors.submit && (
        <p>Une erreur est survenue lors de la soumission de votre annonce</p>
      )}
      <form onSubmit={(e) => submit(e)} className={styles.form}>
        <label htmlFor="title">Titre de l&apos;annonce</label>
        <input
          className={errors.title ? styles.inputError : styles.input}
          type="text"
          name="title"
          placeholder="titre de l'annonce"
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
          value={product.title}
        />
        <label htmlFor="description">Description</label>
        <input
          className={errors.description ? styles.inputError : styles.input}
          type="text"
          name="description"
          placeholder="une petite description pour cette annonce"
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          value={product.description}
        />
        <label htmlFor="price">Prix</label>
        <input
          className={errors.price ? styles.inputError : styles.input}
          type="number"
          name="price"
          placeholder="10 €"
          onChange={(e) => setProduct({ ...product, price: +e.target.value })}
          value={product.price}
        />
        <label htmlFor="location">Localisation</label>
        <input
          className={errors.location ? styles.inputError : styles.input}
          type="string"
          name="location"
          placeholder="Paris"
          onChange={(e) => setProduct({ ...product, location: e.target.value })}
          value={product.location}
        />
        <label htmlFor="imageUrl">Image</label>
        <input
          className={errors.imageUrl ? styles.inputError : styles.input}
          type="text"
          name="imageUrl"
          placeholder="https://www.google.com"
          onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
          value={product.imageUrl}
        />
        <label htmlFor="category">Catégorie</label>
        <select
          className={errors.category ? styles.inputError : styles.input}
          name="category"
          id="category"
          onChange={(e) =>
            setProduct({ ...product, category: { id: +e.target.value } })
          }
          value={product.category.id}
        >
          {categories?.items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
        <label>Tags</label>
        {productTags?.items.map((item) => (
          <div key={item.id}>
            <input
              type="checkbox"
              id={item.title}
              checked={
                product.tags?.find((tag) => tag.id === +item.id) ? true : false
              }
              name={item.title}
              onChange={(e) => handleSelectBox(item)}
            />
            <label htmlFor={item.title}>{item.title}</label>
          </div>
        ))}
        <button className={styles.button} type="submit">
          {props.query ? "Modifier l'annonce" : "Poster l'annonce"}
        </button>
      </form>
    </>
  );
}
