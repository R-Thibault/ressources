import { useState } from "react";
import RessourcesFormStep1 from "../molecules/ressourceForm-step1";
import RessourcesFormStep2 from "../molecules/ressourceForm-step2";
import { useQuery } from "@apollo/client";
import { UserType } from "@/types/user.type";
import { MY_PROFILE } from "@/requests/user";
import { FileType } from "@/types/file.types";
import { LinkType } from "@/types/link.types";

export default function CreateRessourcesForm(props: {
  handleSubmit(value: boolean): void;
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
    props.handleSubmit(value);
  };

  return (
    <>
      <div className="title">
        <span>Ajouter une nouvelle ressource {step} / 2 </span>
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
        />
      )}
    </>
  );
}
