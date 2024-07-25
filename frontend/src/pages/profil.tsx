import Layout from "@/components/organisms/layout";
import React, { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useMutation, useQuery } from "@apollo/client";
import { MY_PROFILE, UPDATE_USER } from "@/requests/user";
import { UserType, UserUpdateType } from "@/types/user.types";
import { useRouter } from "next/router";
import ModalComponent from "@/components/organisms/modal";
import CreateAvatarForm from "@/components/organisms/createAvatarForm";
import { DELETE_AVATAR } from "@/requests/image";
import { API_URL } from "@/config/config";

export default function profile() {
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [profileDatas, setProfileDatas] = useState<UserType | null>(null);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const { data: dataUser } = useQuery<{ item: UserType | null }>(MY_PROFILE);
  const [doUpdate] = useMutation(UPDATE_USER, {
    refetchQueries: [MY_PROFILE],
  });
  const [doDeleteAvatar] = useMutation(DELETE_AVATAR, {
    variables: { id: profileDatas?.avatar?.id },
    refetchQueries: [MY_PROFILE],
  });
  function handleModalVisible(value: boolean) {
    setModalVisible(value);
  }

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
      if (dataUser && dataUser.item) {
        const result = await doUpdate({
          variables: {
            data: data,
            updateUserId: dataUser.item.id,
          },
        });
        if (!result.errors?.length) {
          setSuccess(true);
        } else {
          console.error(result.errors);
        }
      }
    }
  }
  const deleteAvatar = async () => {
    try {
      const result = await doDeleteAvatar();
      if (!result.errors?.length) {
        router.reload();
      } else {
        console.error(result.errors);
      }
    } catch (error) {
      console.error("error");
    }
  };
  useEffect(() => {
    if (dataUser && dataUser.item) {
      setProfileDatas(dataUser.item);
      setLastname(dataUser.item.lastname);
      setFirstname(dataUser.item.firstname);
      if (dataUser.item.avatar) {
        if (dataUser.item.avatar.path.includes("://")) {
          setAvatarSrc(dataUser.item.avatar.path);
        } else {
          setAvatarSrc(
            `${API_URL}/files/${dataUser.item.avatar.path.replace(
              "/app/upload/",
              ""
            )}`
          );
        }
      }
    }
  }, [dataUser]);
  return (
    <Layout title={"Mon profile"}>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-4 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5 ">
              <div className=" text-center img_profile">
                <button
                  className="btn btn-primary rounded-circle profile_btn"
                  type="button"
                  onClick={() => handleModalVisible(true)}
                >
                  <i className="bi bi-pencil-fill"></i>
                </button>
                <ModalComponent
                  opened={modalVisible}
                  openModal={handleModalVisible}
                >
                  <CreateAvatarForm />
                </ModalComponent>
                {avatarSrc ? (
                  <>
                    <Image
                      className="rounded-circle mt-3"
                      height={150}
                      width={150}
                      alt={`${dataUser?.item?.lastname}${dataUser?.item?.firstname}`}
                      priority
                      src={avatarSrc}
                      onErrorCapture={() => {
                        setAvatarSrc("/assets/avatars/no-image.png");
                        setImageError(
                          "Une erreur est survenue pendant le chargement de votre image, veuillez contactez un administrateur"
                        );
                      }}
                    />
                  </>
                ) : (
                  <>
                    <div className="rounded-circle mt-3 avatar_default">
                      <span className="avatar_default_text_size">
                        {dataUser?.item &&
                          dataUser.item.firstname
                            .substring(0, 1)
                            .toUpperCase() +
                            dataUser.item.lastname
                              .substring(0, 1)
                              .toUpperCase()}
                      </span>
                    </div>
                    {imageError && (
                      <span className="image_error">{imageError}</span>
                    )}
                  </>
                )}
              </div>

              {profileDatas?.avatar !== null && (
                <button
                  type="button"
                  onClick={deleteAvatar}
                  className="mx-auto my-3 btn_avatar_delete"
                >
                  Supprimer ma photo de profil
                </button>
              )}
              <div className="d-flex flex-column mt-4">
                <span className="font-weight-bold">
                  {profileDatas
                    ? `${profileDatas?.firstname} ${profileDatas?.lastname}`
                    : `Error occured`}
                </span>
                <span className="text-black-50">{profileDatas?.email}</span>
              </div>
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
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <label className="labels mb-2">Nom de famille</label>
                  <input
                    type="text"
                    className="form-control"
                    value={lastname}
                    placeholder="Nom de famille"
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
                <div className="mt-5 text-center">
                  <button
                    className="btn_primary"
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
