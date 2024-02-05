import { ApplicationError } from "../../../application/error";
import { Ingredient } from "../../../domain/models";
import { BaseService } from "../base";
import { StorageService } from "../storage";

export class IngredientsService extends BaseService {
    public constructor(private readonly storage: StorageService) {
        super();
    }

    public async getAll(): Promise<Ingredient[]> {
        const kitchen = await this.storage.getKitchen();

        return super
            .request<Ingredient[]>(`/ingredients/${kitchen?.id}`)
            .then((res) => res.data)
            .catch((err) => {
                throw new ApplicationError(err);
            });
    }

    public async insertOne(ingredient: Ingredient): Promise<Ingredient> {
        return super
            .request<Ingredient>(`/ingredients`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                data: ingredient,
            })
            .then((res) => res.data)
            .catch((err) => {
                throw new ApplicationError(err);
            });
    }

    public async insertMany(ingredients: Ingredient[]): Promise<Ingredient[]> {
        const promises: Promise<Ingredient>[] = ingredients.map((i) => this.insertOne(i));
        return await Promise.all(promises);
    }

    public async updateOne(ingredient: Ingredient): Promise<Ingredient> {
        return super
            .request<Ingredient>(`/ingredients`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                },
                data: ingredient,
            })
            .then((res) => res.data)
            .catch((err) => {
                throw new ApplicationError(err);
            });
    }

    public async updateMany(ingredients: Ingredient[]): Promise<Ingredient[]> {
        const promises: Promise<Ingredient>[] = ingredients.map((i) => this.updateOne(i));
        return await Promise.all(promises);
    }
}
