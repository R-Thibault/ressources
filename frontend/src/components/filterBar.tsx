import { useQuery } from "@apollo/client";
import { GET_ALL_TAGS } from "@/requests/tags";
import styles from "@/styles/filterBar.module.css";

export type TagsProps = {
  id: number;
  title: string;
};

export type FilterBarProps = {
  selectedTags: number[];
  selectedPrice: number;
  maxPrice: number | undefined;
  onSelectTag: (item: TagsProps) => void;
  onSelectPriceRange: (item: number) => void;
};

export default function FilterBar(props: FilterBarProps): React.ReactNode {
  const { data: productTags } = useQuery<{ items: TagsProps[] }>(GET_ALL_TAGS);

  function addSelectedTag(tag: TagsProps) {
    props.onSelectTag(tag);
  }

  function addPriceRange(price: number) {
    props.onSelectPriceRange(price);
  }

  return (
    <div className={styles.filterBarContainer}>
      <h3>Filtrer</h3>
      <h4>Tags</h4>
      {productTags?.items.map((item) => (
        <div key={item.id}>
          <input
            type="checkbox"
            id={item.title}
            name={item.title}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onChange={(e) => addSelectedTag(item)}
            checked={
              props.selectedTags.find((tag) => tag === +item.id) ? true : false
            }
          />
          <label htmlFor={item.title}>{item.title}</label>
        </div>
      ))}
      <h4>Prix</h4>
      <input
        type="range"
        id="price"
        name="price"
        value={props.selectedPrice}
        min="0"
        step={50}
        max={props.maxPrice}
        onChange={(e) => addPriceRange(+e.target.value)}
      />
    </div>
  );
}
