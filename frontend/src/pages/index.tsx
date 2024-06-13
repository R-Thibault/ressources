import Logo from "@/components/atoms/logo";
import Link from "next/link";
import Image from "next/image";

export default function Home(): React.ReactNode {
  return (
    <div className="container_signin">
      <Logo className={"menu_white_logo"} link="/" />
      <div className="signin_wrapper">
        <Image
          src="/assets/rainbow_gnome.png"
          alt="rainbow"
          width={200}
          height={200}
        ></Image>
        <h1 className="mb-4">Rejoins une aventure merveilleuse !</h1>
        <Link className="btn_primary mb-2" href={"/sign-in"}>
          Se Connecter
        </Link>
        <Link className="btn_primary" href={"/sign-up"}>
          S'inscrire
        </Link>
      </div>
    </div>
  );
}
