import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { validate } from "class-validator";
import {
  Ressource,
  RessourceCreateInput,
  RessourcesOrderByInput,
  RessourcesWhereGroupInput,
  RessourcesWhereInput,
  RessourceUpdateInput,
} from "../entities/Ressource";
import { ContextType } from "../middlewares/auth";
import { File } from "../entities/File";
import { Link } from "../entities/Link";
import { Like } from "typeorm";
import { Group } from "../entities/Group";
import { Image } from "../entities/Image";
@Resolver(Ressource)
export class RessourceResolver {
  @Authorized()
  @Query(() => [Ressource])
  async getAllRessources(): Promise<Ressource[]> {
    return await Ressource.find();
  }

  @Authorized()
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

  @Authorized()
  @Query(() => [Ressource])
  async getRessourcesByUser(
    @Ctx() context: ContextType,
    @Arg("orderBy", () => RessourcesOrderByInput, { nullable: true })
    orderBy?: RessourcesOrderByInput,
    @Arg("where", () => RessourcesWhereInput, { nullable: true })
    where?: RessourcesWhereInput,
    @Arg("skip", () => Int, { nullable: true }) skip?: number,
    @Arg("take", () => Int, { nullable: true }) take?: number
  ): Promise<Ressource[]> {
    try {
      if (!context.user) {
        throw new Error(`error`);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const queryOrderBy: any = {};
        if (
          orderBy?.created_at &&
          ["ASC", "DESC"].includes(orderBy?.created_at)
        ) {
          queryOrderBy.created_at = orderBy?.created_at;
        }
        if (orderBy?.title && ["ASC", "DESC"].includes(orderBy?.title)) {
          queryOrderBy.title = orderBy?.title;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const queryWhere: any = [];
        queryWhere.created_by_user = context.user;
        if (where?.title && where?.title.length > 0) {
          queryWhere.title = Like(`%${where.title}%`);
        }
        const ressources = await Ressource.find({
          where: queryWhere,
          relations: {
            image_id: true,
            created_by_user: { avatar: true },
            file_id: true,
            link_id: true,
          },
          order: queryOrderBy,
          skip: skip,
          take: take,
        });
        return ressources;
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Authorized()
  @Query(() => [Ressource])
  async getRessourcesByGroupId(
    @Arg("whereGroup", () => RessourcesWhereGroupInput, { nullable: true })
    whereGroup?: RessourcesWhereGroupInput,
    @Arg("orderBy", () => RessourcesOrderByInput, { nullable: true })
    orderBy?: RessourcesOrderByInput,
    @Arg("skip", () => Int, { nullable: true }) skip?: number,
    @Arg("take", () => Int, { nullable: true }) take?: number
  ): Promise<Ressource[]> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const queryOrderBy: any = {};
      if (
        orderBy?.created_at &&
        ["ASC", "DESC"].includes(orderBy?.created_at)
      ) {
        queryOrderBy.created_at = orderBy?.created_at;
      }
      if (orderBy?.title && ["ASC", "DESC"].includes(orderBy?.title)) {
        queryOrderBy.title = orderBy?.title;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const queryWhereGroup: any = [];
      if (whereGroup?.group_id) {
        queryWhereGroup.group_id = { id: whereGroup.group_id };
      }
      if (whereGroup?.title && whereGroup?.title.length > 0) {
        queryWhereGroup.title = Like(`%${whereGroup.title}%`);
      }

      const ressources = await Ressource.find({
        where: queryWhereGroup,
        relations: {
          image_id: true,
          created_by_user: { avatar: true },
          file_id: true,
          link_id: true,
          group_id: true,
        },
        order: queryOrderBy,
        skip: skip,
        take: take,
      });
      if (!ressources) {
        throw new Error("ressource not found");
      }
      return ressources;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Authorized()
  @Mutation(() => Ressource)
  async createRessource(
    @Arg("data") data: RessourceCreateInput,
    @Ctx() context: ContextType
  ): Promise<Ressource> {
    try {
      const newRessource = new Ressource();
      newRessource.title = data.title;
      newRessource.description = data.description;

      if (data.imageId) {
        const image = await Image.findOne({ where: { id: data.imageId } });

        if (image) {
          newRessource.image_id = image;
        }
      }

      if (data.type === "link" && data.entityId) {
        const link = await Link.findOneBy({
          id: data.entityId,
        });
        if (link) {
          newRessource.link_id = link;
        }
      } else {
        const file = await File.findOneBy({
          id: data.entityId,
        });
        if (file) {
          newRessource.file_id = file;
        }
      }

      if (context.user) {
        newRessource.created_by_user = context.user;
        if (data.groupId !== null) {
          const group = await Group.findOneBy({
            id: data.groupId,
          });
          if (group) {
            newRessource.group_id = group;
          }
        }
      }

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

  @Authorized()
  @Mutation(() => Ressource, { nullable: true })
  async updateRessource(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => RessourceUpdateInput) data: RessourceUpdateInput,
    @Ctx() context: ContextType
  ): Promise<Ressource | null> {
    if (!context.user) {
      throw new Error(`error`);
    }

    const ressource = await Ressource.findOne({
      where: { id: id },
      relations: { created_by_user: true, image_id: true },
    });
    if (!ressource) {
      throw new Error("Resource not found");
    }
    if (ressource.created_by_user.id !== context.user.id) {
      throw new Error("error occured");
    }
    Object.assign(ressource, data);
    if (data.imageId) {
      const image = await Image.findOne({ where: { id: data.imageId } });

      if (image) {
        ressource.image_id = image;
      }
    }
    ressource.updated_at = new Date();
    ressource.updated_by_user = context.user;

    const errors = await validate(ressource);
    if (errors.length > 0) {
      throw new Error(`error occured`);
    } else {
      await ressource.save();
      return ressource;
    }
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteRessource(
    @Arg("id", () => ID) id: number,
    @Ctx() context: ContextType
  ): Promise<boolean> {
    if (!context.user) {
      throw new Error(`error`);
    }
    const ressource = await Ressource.findOne({
      where: { id },
      relations: ["created_by_user"],
    });
    if (!ressource) {
      throw new Error("Resource not found");
    }
    if (ressource.created_by_user.id !== context.user.id) {
      throw new Error("error occured");
    }

    await ressource.remove();
    return true;
  }
}
