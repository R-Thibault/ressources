import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { validateDatas } from "../utils/validate";
import { validate } from "class-validator";
import { Ressource, RessourceCreateInput, RessourceUpdateInput } from "../entities/Ressource";

@Resolver(Ressource)
export class RessourceResolver {
  @Query(() => [Ressource])
  async getAllRessource(): Promise<Ressource[]> {
    return await Ressource.find();
  }

  @Query(() => Ressource)
  async getOneRessource(
    @Arg("id", () => ID) id: number
  ): Promise<Ressource | null> {
    try {
      const ressource = await Ressource.findOne({ where: { id: id } });
      return ressource;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => Ressource)
  async createRessource(@Arg("data") {}: RessourceCreateInput): Promise<Ressource> {
    try {
      const newRessource = new Ressource();
      // newRessource.name = name;
      const error = await validate(newRessource);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        const datas = await newRessource.save();
        return datas;
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => Ressource, { nullable: true })
  async updateRessource(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => RessourceUpdateInput) data: RessourceUpdateInput
  ): Promise<Ressource | null> {
    try {
      const ressource = await Ressource.findOne({ where: { id: id } });
      if (ressource) {
        Object.assign(ressource, data);
        const errors = await validate(ressource);
        if (errors.length > 0) {
        } else {
          await ressource.save();
        }
      }
      return ressource;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => Ressource, { nullable: true })
  async deleteRessource(
    @Arg("id", () => ID) id: number
  ): Promise<Ressource | null> {
    try {
      const ressource = await Ressource.findOne({ where: { id: id } });
      if (ressource) {
        await ressource.remove();
        ressource.id = id;
      }
      return ressource;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }
}
