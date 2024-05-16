import Layout from "@/components/organisms/layout";
import React, { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useMutation, useQuery } from "@apollo/client";
import { MY_PROFILE, UPDATE_USER } from "@/requests/user";
import { UserType, UserUpdateType } from "@/types/user.type";
import axios from "axios";
import { API_URL } from "@/config/config";

export default function profile() {
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [profileDatas, setProfileDatas] = useState<UserType | null>(null);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const { data: dataUser } = useQuery<{ item: UserType | null }>(MY_PROFILE);
  const [doUpdate] = useMutation(UPDATE_USER, {
    refetchQueries: [MY_PROFILE],
  });

  const handleButtonClick = () => {
    const imageUpload = document.getElementById("imageUpload");
    if (imageUpload) {
      imageUpload.click();
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("file", file);
      if (profileDatas) {
        formData.append("userId", String(profileDatas?.id));
      } else {
        // Handle the error or provide a default value for profileDatas
      }
      const result = await axios.post(`${API_URL}/upload/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (result.status >= 200 && result.status < 300) {
        console.error("succes");
      } else {
        console.error("error");
      }
    } else {
      console.error("error");
    }
  };
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(false);
    setSuccess(false);
    const data: UserUpdateType = {
      lastname,
      firstname,
    };
    if (
      data.lastname.trim().length === 0 ||
      data.firstname.trim().length === 0
    ) {
      setError(true);
    } else {
      if (!profileDatas || !profileDatas.id) {
        // setError("User ID is not available");
        return;
      }
      const result = await doUpdate({
        variables: {
          data: data,
          updateUserId: profileDatas.id,
        },
      });
      if (!result.errors?.length) {
        setSuccess(true);
      } else {
        console.error(result.errors);
      }
    }
  }
  useEffect(() => {
    if (dataUser && dataUser.item && dataUser.item.avatar) {
      setProfileDatas(dataUser.item);
      setAvatarSrc(`${API_URL}/files/avatar/${dataUser.item.avatar.name}`);
    }
  }, [dataUser]);
  return (
    <Layout title={"Mon profile"}>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-4 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5 ">
              <div className="mt-5 text-center img_profile">
                <button
                  className="btn btn-primary rounded-circle profile_btn"
                  type="button"
                  onClick={handleButtonClick}
                >
                  <i className="bi bi-pencil-fill"></i>
                </button>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleImageUpload(e)}
                />
                <Image
                  className="rounded-circle mt-5"
                  height={150}
                  width={150}
                  alt="jaky nackos"
                  priority
                  src={
                    avatarSrc ? avatarSrc : "/assets/avatars/jake-nackos.jpg"
                  }
                />
              </div>
              <span className="font-weight-bold">
                {`${profileDatas?.firstname} ${profileDatas?.lastname}`}
              </span>
              <span className="text-black-50">{profileDatas?.email}</span>
            </div>
          </div>
          <div className="col-md-6 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Informations</h4>
              </div>
              {success ? (
                <span className="text-success">
                  {" "}
                  Informations modifié avec succés !
                </span>
              ) : (
                ""
              )}
              {error ? (
                <span className="text-danger"> L'un des champs est vide.</span>
              ) : (
                ""
              )}
              <form className="row mt-2 gap-3" onSubmit={onSubmit}>
                <div className="mt-2">
                  <label className="labels mb-2">Prénom</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Prénom"
                    value={profileDatas?.firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <label className="labels mb-2">Nom de famille</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profileDatas?.lastname}
                    placeholder="Nom de famille"
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
                <div className="mt-5 text-center">
                  <button
                    className="btn btn-primary profile-button"
                    type="submit"
                  >
                    Sauvegarde
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
