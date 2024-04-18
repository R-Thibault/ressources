import { Arg, Ctx, ID, Mutation, Query, Resolver } from "type-graphql";
import { validate } from "class-validator";
import { DummyRessources } from "../dummyDatas";
import {
  Ressource,
  RessourceCreateInput,
  RessourceUpdateInput,
} from "../entities/Ressource";
import { ContextType, getUser } from "../middlewares/auth";

@Resolver(Ressource)
export class RessourceResolver {
  @Query(() => [Ressource])
  async getAllRessources(): Promise<Ressource[]> {
    return await Ressource.find();
  }

  @Query(() => Ressource)
  async getOneRessource(
    @Arg("id", () => ID) id: number
  ): Promise<Ressource | null> {
    try {
      const ressource = await Ressource.findOne({
        where: { id: id },
        relations: {
          image_id: true,
        },
      });
      return ressource;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Query(() => [Ressource])
  async getAllRessourceFromOneUser(
    @Ctx() context: ContextType
  ): Promise<Ressource[]> {
    try {
      const user = await getUser(context.req, context.res);
      if (!user) {
        throw new Error(`error`);
      } else {
        const ressource = await Ressource.find({
          where: { created_by_user: { id: user.id } },
          relations: {
            image_id: true,
            created_by_user: { image_id: true },
            tags: true,
            file_id: true,
            link_id: true,
          },
        });
        return ressource;
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Query(() => [Ressource])
  async getAllRessourceFromOneUser(
    @Ctx() context: ContextType
  ): Promise<Ressource[]> {
    try {
      const user = await getUser(context.req, context.res);
      if (!user) {
        throw new Error(`error`);
      } else {
        const ressource = await Ressource.find({
          where: { created_by_user: { id: user.id } },
          relations: {
            image_id: true,
            created_by_user: { image_id: true },
            file_id: true,
            link_id: true,
          },
        });
        return ressource;
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Query(() => [Ressource])
  async getAllRessourceFromOneUser(
    @Ctx() context: ContextType
  ): Promise<Ressource[]> {
    try {
      const user = await getUser(context.req, context.res);
      if (!user) {
        throw new Error(`error`);
      } else {
        const ressource = await Ressource.find({
          where: { created_by_user: { id: user.id } },
          relations: {
            image_id: true,
            created_by_user: { image_id: true },
            tags: true,
            file_id: true,
            link_id: true,
          },
        });
        return ressource;
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => Ressource)
  async createRessource(
    @Arg("data", () => RessourceCreateInput) data: RessourceCreateInput,
    @Ctx() context: ContextType
  ): Promise<Ressource> {
    try {
      const newRessource = new Ressource();
      Object.assign(newRessource, data, {
        created_by_user: context.user,
      });
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
    const ressource = await Ressource.findOne({ where: { id: id } });
    if (ressource) {
      Object.assign(ressource, data);
      const errors = await validate(ressource);
      if (errors.length > 0) {
        throw new Error(`error occured ${JSON.stringify(errors)}`);
      } else {
        await ressource.save();
      }
    }
    return ressource;
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

  @Mutation(() => [Ressource])
  async populateRessourceTable(): Promise<Ressource[] | null> {
    for (let i = 0; i < DummyRessources.length; i++) {
      try {
        const newRessource = new Ressource();
        newRessource.title = DummyRessources[i].title;
        newRessource.description = DummyRessources[i].description;
        newRessource.is_favorite = DummyRessources[i].is_favorite;
        newRessource.image_id = DummyRessources[i].image_id;
        newRessource.file_id = DummyRessources[i].file_id;
        newRessource.link_id = DummyRessources[i].link_id;
        newRessource.created_by_user = DummyRessources[i].created_by_user;
        newRessource.created_at = DummyRessources[i].created_at;

        const error = await validate(newRessource);

        if (error.length > 0) {
          throw new Error(`error occured ${JSON.stringify(error)}`);
        } else {
          await newRessource.save();
        }
      } catch (error) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      }
    }
    return await this.getAllRessources();
  }
}
