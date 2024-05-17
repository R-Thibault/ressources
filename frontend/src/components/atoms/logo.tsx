import { LogoType } from "@/types/extra.types";

export default function Logo(props: LogoType): React.ReactNode {
  return (
    <div className={props.className}>
      <a href={props.link}>
        <img alt="Ressources" />
      </a>
    </div>
  );
}
