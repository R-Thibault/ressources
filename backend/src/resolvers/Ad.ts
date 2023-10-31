import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Ad, InputAd, UpdatedAd, WhereAd } from "../entities/Ad";
import { validateDatas } from "../utils/validate";
import { Like } from "typeorm";

@Resolver(Ad)
export class AdResolver {
  @Query(() => [Ad])
  async getAds(
    @Arg("query", () => WhereAd, { nullable: true }) query?: WhereAd
  ): Promise<Ad[]> {
    let whereQuery: any = {};

    if (query?.searchTitle) {
      whereQuery = { title: Like(`%${query.searchTitle}%`) };
    }

    return await Ad.find({
      where: whereQuery,
      relations: {
        category: true,
        tags: true,
      },
    });
  }

  @Query(() => Ad)
  async getAdById(@Arg("id") id: number): Promise<Ad | null> {
    try {
      const datas = await Ad.findOne({
        where: {
          id: id,
        },
        relations: {
          category: true,
          tags: true,
        },
      });
      return datas;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => Ad)
  async updateAd(
    @Arg("id")
    id: number,
    @Arg("data") inputData: UpdatedAd
  ): Promise<Ad | null> {
    try {
      const ad = await Ad.findOne({
        where: {
          id: id,
        },
      });

      if (ad) {
        Object.assign(ad, inputData, { id: id });
        const error = await validateDatas(ad);
        if (error.length > 0) {
          throw new Error(`error occured ${JSON.stringify(error)}`);
        } else {
          await Ad.save(ad);
          return this.getAdById(id);
        }
      } else {
        throw new Error(`no ad found`);
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => [Ad])
  async deleteAd(
    @Arg("id")
    id: number
  ): Promise<Ad[] | null> {
    try {
      const ad = await Ad.findOne({
        where: {
          id: id,
        },
      });
      await ad?.remove();
      return await this.getAds();
    } catch (error) {
      console.log(error);
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => [Ad])
  async addNewAd(@Arg("data") inputData: InputAd): Promise<Ad | null> {
    try {
      const newAd = new Ad();
      newAd.title = inputData.title;
      newAd.description = inputData.description;
      newAd.owner = inputData.owner;
      newAd.price = inputData.price;
      newAd.imageUrl = inputData.imageUrl;
      newAd.location = inputData.location;
      newAd.category = inputData.category;
      newAd.tags = inputData.tags;

      const error = await validateDatas(newAd);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        const datas = await newAd.save();
        return await this.getAdById(datas.id);
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }
}
