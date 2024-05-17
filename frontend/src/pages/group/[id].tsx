import Layout from "@/components/organisms/layout";
import React from "react";
import { useRouter } from "next/router";
import CardsDisplay from "@/components/organisms/cardsDisplay";
import { GET_RESSOURCES_BY_GROUP_ID } from "@/requests/ressources";
import { useQuery } from "@apollo/client";
import { GroupType } from "@/types/group.types";
import { GET_ONE_GROUP } from "@/requests/group";
import { RessourceType } from "@/types/ressources.types";

export type GroupProps = {
  group: GroupType;
};

export type RessourceProps = {
  ressources: RessourceType[];
};

export default function GroupDashboard(): React.ReactNode {
  const router = useRouter();
  const groupId = Number(router.query.id);

  const { data } = useQuery<{ item: GroupType }>(GET_ONE_GROUP, {
    variables: {
      id: groupId,
    },
  });

  const { data: dataRessources, error } = useQuery(GET_RESSOURCES_BY_GROUP_ID, {
    variables: {
      groupId,
    },
  });
  console.log(error);
  if (data?.item) {
    return (
      <Layout title={"Dashboard Groupe"}>
        <div className="container rounded bg-white mt-5 mb-5">
          <div className="row"></div>
          <div className="col-md-12">
            <div className="row">
              <div>
                <h2>{data.item.name}</h2>
                <p>{data.item.description}</p>
                {dataRessources && (
                  <CardsDisplay ressources={dataRessources.item} />
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  } else {
    return;
  }
}
