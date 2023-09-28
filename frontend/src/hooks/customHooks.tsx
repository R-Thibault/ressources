import axios from "axios";
import { AdCardProps } from "@/components/adCard";
import { CategoryProps } from "@/components/adCard";
import { API_URL } from "@/config/config";

export const fetchAds = async (
  catId?: string
): Promise<{ ads: AdCardProps[]; error: boolean }> => {
  let ads: AdCardProps[] = [];
  let error: boolean = false;

  let url = catId ? `${API_URL}/category/${catId}/ads` : `${API_URL}/ads`;
  try {
    const result = await axios.get<AdCardProps[]>(url);
    ads = result.data;
  } catch (error) {
    error = true;
    console.log(error);
  }
  return { ads, error };
};

export const fetchCategories = async (): Promise<{
  categories: CategoryProps[];
  error: boolean;
}> => {
  let categories: CategoryProps[] = [];
  let error: boolean = false;

  try {
    const result = await axios.get<CategoryProps[]>(`${API_URL}/category`);
    categories = result.data;
  } catch (error) {
    error = true;
    console.log(error);
  }
  return { categories, error };
};

export const fetchAd = async (
  id: string
): Promise<{
  ad: AdCardProps;
  error: boolean;
}> => {
  let ad!: AdCardProps;
  let error: boolean = false;

  try {
    const result = await axios.get<AdCardProps>(`${API_URL}/ads/${id}`);
    ad = result.data;
  } catch (error) {
    error = true;
    console.log(error);
  }
  return { ad, error };
};
