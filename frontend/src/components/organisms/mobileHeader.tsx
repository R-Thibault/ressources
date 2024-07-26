import { useQuery } from "@apollo/client";
import { useState } from "react";
import { MY_PROFILE } from "@/requests/user";
import Logo from "../atoms/logo";
import Image from "next/image";
import { UserType } from "@/types/user.types";
import { API_URL } from "@/config/config";
import Menu from "./menu";

export default function MobileHeader(props: {
  width: number;
}): React.ReactNode {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  const { data: dataUser } = useQuery<{ item: UserType | null }>(MY_PROFILE);
  const avatarImage = dataUser?.item?.avatar?.path.includes("://")
    ? dataUser?.item?.avatar?.path
    : `${API_URL}/files${dataUser?.item?.avatar?.path.replace(
        "/app/upload",
        ""
      )}`;
  const handleMenuOpen = (value: boolean) => {
    setMenuOpened(value);
  };

  return (
    <header>
      <Menu
        handleMenuMobileOpen={handleMenuOpen}
        opened={menuOpened}
        width={props.width}
      />

      <i
        onClick={() => handleMenuOpen(!menuOpened)}
        className={
          menuOpened
            ? "bi bi-x-lg mobile_menu_icon"
            : "bi bi-list mobile_menu_icon"
        }
      ></i>

      <Logo className="menu_white_logo" link="/dashboard" />
      {dataUser?.item?.avatar ? (
        <Image
          unoptimized
          className="rounded-circle"
          height={40}
          width={40}
          alt={`${dataUser.item.firstname} ${dataUser.item.lastname} `}
          priority
          src={avatarImage}
        />
      ) : (
        <i className="btn_rounded user_profile_button">
          <span className="user_profile_name">
            {dataUser?.item &&
              dataUser?.item?.firstname.substring(0, 1).toUpperCase() +
                dataUser?.item?.lastname.substring(0, 1).toUpperCase()}
          </span>
        </i>
      )}
    </header>
  );
}
