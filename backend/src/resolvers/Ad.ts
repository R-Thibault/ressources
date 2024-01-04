import {
  Resolver,
  Query,
  Arg,
  Mutation,
  ID,
  Authorized,
  Ctx,
} from "type-graphql";
import {
  Ad,
  InputAd,
  UpdatedAd,
  WhereAd,
  AdsWithMaxPrice,
} from "../entities/Ad";
import { validateDatas } from "../utils/validate";
import { Like, In, MoreThanOrEqual, LessThanOrEqual } from "typeorm";
import { DummyProduct } from "../dummyDatas";
import { merge } from "../utils/update";
import { ContextType } from "../middlewares/auth";

@Resolver(Ad)
export class AdResolver {
  @Query(() => AdsWithMaxPrice)
  async getAds(
    @Arg("query", () => WhereAd, { nullable: true }) query?: WhereAd,
    @Arg("orderBy", () => String, { nullable: true }) orderBy?: String
  ): Promise<{ ads: Ad[]; maxPrice: number }> {
    let whereQuery: any = {};
    let whereOrder: any = {};

    if (query?.searchTitle) {
      whereQuery.title = Like(`%${query.searchTitle}%`);
    }

    if (query?.category) {
      whereQuery.category = { id: In(query.category) };
    }

    if (query?.tags) {
      whereQuery.tags = { id: In(query.tags) };
    }

    if (query?.priceGTE) {
      whereQuery.price = MoreThanOrEqual(Number(query.priceGTE));
    }

    if (query?.priceLTE) {
      whereQuery.price = LessThanOrEqual(Number(query.priceLTE));
    }

    if (orderBy) {
      if (orderBy === "ASC") {
        whereOrder.price = "ASC";
      } else if (orderBy === "DESC") {
        whereOrder.price = "DESC";
      } else {
        whereOrder.price = null;
      }
    }

    const ads = await Ad.find({
      where: whereQuery,
      relations: {
        category: true,
        tags: true,
        user: true,
      },
      order: whereOrder,
    });

    const highestPriceAd = ads.reduce((prev, current) => {
      return prev && prev.price > current.price ? prev : current;
    });

    return { ads: ads, maxPrice: highestPriceAd.price };
  }

  @Query(() => Ad)
  async getAdById(@Arg("id", () => ID) id: number): Promise<Ad | null> {
    try {
      const datas = await Ad.findOne({
        where: {
          id: id,
        },
        relations: {
          category: true,
          tags: true,
          user: true,
        },
      });
      return datas;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Authorized()
  @Mutation(() => Ad)
  async updateAd(
    @Arg("id", () => ID)
    id: number,
    @Arg("data", () => UpdatedAd) inputData: UpdatedAd
  ): Promise<Ad | null> {
    try {
      const ad = await Ad.findOne({
        where: {
          id: id,
        },
        relations: {
          tags: true,
          category: true,
          user: true,
        },
      });

      if (ad) {
        merge(ad, inputData);
        const error = await validateDatas(ad);
        if (error.length > 0) {
          throw new Error(`error occured ${JSON.stringify(error)}`);
        } else {
          const datas = await Ad.save(ad);
          return datas;
        }
      } else {
        throw new Error(`no ad found`);
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }


  @Mutation(() => Ad)
  async deleteAd(
    @Arg("id", () => ID)
    id: number
  ): Promise<Ad | null> {
    try {
      const ad = await Ad.findOne({
        where: {
          id: id,
        },
        relations: {
          category: true,
          tags: true,
          user: true,
        },
      });
      if (ad) {
        await ad.remove();
        ad.id = id;
      }
      return ad;
    } catch (error) {
      console.log(error);
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Authorized()
  @Mutation(() => Ad)
  async addNewAd(
    @Ctx() context: ContextType,
    @Arg("data") inputData: InputAd
  ): Promise<Ad | null> {
    try {
      const newAd = new Ad();
      newAd.title = inputData.title;
      newAd.description = inputData.description;
      newAd.price = inputData.price;
      newAd.imageUrl = inputData.imageUrl;
      newAd.location = inputData.location;
      newAd.category = inputData.category;
      newAd.tags = inputData.tags;

      if (context.user) {
        newAd.user = context.user;
      }

      const error = await validateDatas(newAd);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        const datas = await newAd.save();
        return datas;
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => AdsWithMaxPrice)
  async populateAdsTable(): Promise<{ ads: Ad[]; maxPrice: number }> {
    for (let i = 0; i < DummyProduct.length; i++) {
      try {
        const newAd = new Ad();
        newAd.title = DummyProduct[i].title;
        newAd.description = DummyProduct[i].description;
        newAd.price = DummyProduct[i].price;
        newAd.imageUrl = DummyProduct[i].picture;
        newAd.location = DummyProduct[i].location;
        newAd.category = DummyProduct[i].category;
        newAd.tags = DummyProduct[i].tags;
        newAd.user = DummyProduct[i].user;

        const error = await validateDatas(newAd);

        if (error.length > 0) {
          throw new Error(`error occured ${JSON.stringify(error)}`);
        } else {
          const datas = await newAd.save();
        }
      } catch (error) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      }
    }
    return await this.getAds();
  }
}
