import axios from "axios";
import { AdCardProps } from "@/components/adCard";
import { CategoryProps } from "@/components/adCard";
import { TagsProps } from "@/components/adForm";
import { API_URL } from "@/config/config";

export const fetchAds = async (
  url: string
): Promise<{
  ads: AdCardProps[];
  error: boolean;
}> => {
  let ads: AdCardProps[] = [];
  let error: boolean = false;

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

export const fetchTags = async (): Promise<{
  tags: TagsProps[];
  error: boolean;
}> => {
  let tags: TagsProps[] = [];
  let error: boolean = false;

  try {
    const result = await axios.get<TagsProps[]>(`${API_URL}/tag`);
    tags = result.data;
  } catch (error) {
    error = true;
    console.log(error);
  }
  return { tags, error };
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
