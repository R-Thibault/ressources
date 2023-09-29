import { FormEvent, useState } from "react";
import styles from "@/styles/NewAd.module.css";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { CategoryProps } from "@/components/adCard";
import * as customHooks from "@/hooks/customHooks";
import { API_URL } from "@/config/config";

export type DataEntries = {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  location: string;
  owner: string;
  category: { id: number };
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
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [product, setProduct] = useState<DataEntries>({
    title: "",
    description: "",
    price: 0,
    imageUrl: "",
    location: "",
    owner: "",
    category: { id: 0 },
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

  useEffect(() => {
    getCategories();
    if (props.query) {
      fetchAdsData(props.query);
    }
  }, [props.query]);

  async function getCategories() {
    try {
      const response = await customHooks.fetchCategories();
      setCategories(response.categories);
    } catch (error) {
      console.log(error);
    }
  }

  async function postData(item: DataEntries) {
    try {
      const result = await axios.post(`${API_URL}/ads`, item);
      if (result.status === 200) {
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
      setErrors({ ...errors, submit: true });
    }
  }

  async function updateData(item: DataEntries) {
    try {
      const result = await axios.put(`${API_URL}/ads/${props.query}`, item);
      if (result.status === 200) {
        router.replace(`/ads/${props.query}`);
      }
    } catch (error) {
      console.log(error);
      setErrors({ ...errors, submit: true });
    }
  }

  async function fetchAdsData(id: string) {
    try {
      const result = await customHooks.fetchAd(id);
      setProduct(result.ad);
    } catch (error) {
      console.log(error);
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
    const newObject = Object.assign(product, missingData);

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
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
        <button className={styles.button} type="submit">
          {props.query ? "Modifier l'annonce" : "Poster l'annonce"}
        </button>
      </form>
    </>
  );
}
