import { useState } from "react";
import RessourcesFormStep1 from "../molecules/ressourceForm-step1";
import RessourcesFormStep2 from "../molecules/ressourceForm-step2";
import { useQuery } from "@apollo/client";
import { UserType } from "@/types/user.types";
import { MY_PROFILE } from "@/requests/user";
import { FileType } from "@/types/file.types";
import { LinkType } from "@/types/link.types";

export default function CreateRessourcesForm(props: {
  onClose(value: boolean): void;
  groupId?: number;
}) {
  const [step, setStep] = useState<number>(1);
  const [type, setType] = useState<string>("link");
  const [entity, setEntity] = useState<FileType | null | LinkType>(null);
  const { data: dataUser } = useQuery<{ item: UserType | null }>(MY_PROFILE);

  const handleSelectRessourceType = (value: string) => {
    setType(value);
  };

  const handleChangeFormStep = (step: number, entity: FileType) => {
    setStep(step);
    setEntity(entity);
  };

  const handleSubmit = (value: boolean) => {
    props.onClose(value);
  };

  return (
    <>
      <div className="title">
        <span>Ajouter une nouvelle ressource </span>
      </div>
      <div className="d-flex flex-row justify-content-center align-items-center mb-4">
        <div className="d-flex flex-column justify-content-center align-items-center stepper_icon">
          <i
            className={step === 1 ? "bi bi-1-circle-fill" : "bi bi-1-circle"}
          ></i>
          <span>Fichier/lien</span>
        </div>
        <div className="stepper_line" />
        <div className="d-flex flex-column justify-content-center align-items-center stepper_icon">
          <i
            className={step === 2 ? "bi bi-2-circle-fill" : "bi bi-2-circle"}
          ></i>
          <span>Ressource</span>
        </div>
      </div>
      {step === 1 ? (
        <RessourcesFormStep1
          handleSelectRessourceType={handleSelectRessourceType}
          handleChangeFormStep={handleChangeFormStep}
          type={type}
          userId={dataUser?.item?.id}
        />
      ) : (
        <RessourcesFormStep2
          type={type}
          entity={entity}
          handleSubmit={handleSubmit}
          groupId={props.groupId}
        />
      )}
    </>
  );
}
