import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Category, InputCategory } from "../entities/Category";
import { validateDatas } from "../utils/validate";
import { DummyCategories } from "../dummyDatas";

@Resolver(Category)
export class CategoryResolver {
  @Query(() => [Category])
  async getCategories(): Promise<Category[]> {
    return await Category.find({
      relations: {
        ads: true,
      },
    });
  }

  @Query(() => Category)
  async getCategoryById(@Arg("id") id: number): Promise<Category | null> {
    try {
      const datas = await Category.findOne({
        where: {
          id: id,
        },
        relations: {
          ads: true,
        },
      });
      return datas;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => Category)
  async addNewCategory(
    @Arg("data") { title }: InputCategory
  ): Promise<Category> {
    try {
      const newCategory = new Category();
      newCategory.title = title;
      const error = await validateDatas(newCategory);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        const datas = await newCategory.save();
        return datas;
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => [Category])
  async populateCategoryTable(): Promise<Category[] | null> {
    for (let i = 0; i < DummyCategories.length; i++) {
      try {
        const newCategory = new Category();
        newCategory.title = DummyCategories[i].title;

        const error = await validateDatas(newCategory);

        if (error.length > 0) {
          throw new Error(`error occured ${JSON.stringify(error)}`);
        } else {
          const datas = await newCategory.save();
        }
      } catch (error) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      }
    }
    return await this.getCategories();
  }

  @Mutation(() => Category)
  async deleteCategory(
    @Arg("id")
    id: number
  ): Promise<Category | undefined> {
    try {
      const category = await Category.findOne({
        where: {
          id: id,
        },
      });
      const datas = await category?.remove();
      return datas;
    } catch (error) {
      console.log(error);
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => Category)
  async updateCategory(
    @Arg("id")
    id: number,
    @Arg("data") { title }: InputCategory
  ): Promise<Category | null> {
    try {
      const category = await Category.findOne({
        where: {
          id: id,
        },
      });

      if (category) {
        Object.assign(category, { title: title }, { id: id });
        const error = await validateDatas(category);
        if (error.length > 0) {
          throw new Error(`error occured ${JSON.stringify(error)}`);
        } else {
          const datas = await Category.save(category);
          return datas;
        }
      } else {
        throw new Error(`no ad found`);
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }
}
