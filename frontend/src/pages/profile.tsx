import Layout from "@/components/organisms/layout";
import React, { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useMutation, useQuery } from "@apollo/client";
import { MY_PROFILE, UPDATE_USER } from "@/Request/user";
import { UserType, UserUpdateType } from "@/types/user.type";
import { spawn } from "child_process";

export default function profile() {
  const [error, setError] = useState<"emptyFields">();
  const [success, setSuccess] = useState<"succes">();
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const { data: dataUser } = useQuery<{ item: UserType | null }>(MY_PROFILE);

  const profileDatas = dataUser?.item;
  const [doUpdate, { error: errors, loading: loadingUpdate }] = useMutation(
    UPDATE_USER,
    {
      refetchQueries: [MY_PROFILE],
    }
  );
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);
    setSuccess(undefined);
    const data: UserUpdateType = {
      lastname,
      firstname,
    };
    if (
      data.lastname.trim().length === 0 ||
      data.firstname.trim().length === 0
    ) {
      setError("emptyFields");
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
        setSuccess("succes");
      } else {
        console.error(result.errors);
      }
    }
  }
  useEffect(() => {
    if (profileDatas) {
      setFirstname(profileDatas?.firstname);
      setLastname(profileDatas?.lastname);
    }
  }, [profileDatas]);

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
                >
                  <i className="bi bi-pencil-fill"></i>
                </button>
                <Image
                  className="rounded-circle mt-5"
                  width={150}
                  height={150}
                  alt="jaky nackos"
                  priority
                  src={"/assets/avatars/jake-nackos.jpg"}
                />
              </div>
              <span className="font-weight-bold">
                {`${firstname} ${lastname}`}
              </span>
              <span className="text-black-50">{profileDatas?.email}</span>
              <span> </span>
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
