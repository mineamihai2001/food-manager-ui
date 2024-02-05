import { AxiosError } from "axios";
import { ApplicationError } from "../../../application/error";
import { Dish } from "../../../domain/models";
import { BaseService } from "../base";
import { StorageService } from "../storage";

export class DishesService extends BaseService {
    public constructor(private readonly storage: StorageService) {
        super();
    }

    public async getAll(): Promise<Dish[]> {
        const kitchen = await this.storage.getKitchen();

        return super
            .request<Dish[]>(`/dishes/${kitchen?.id}`)
            .then((res) => res.data)
            .catch((err: AxiosError) => {
                throw new ApplicationError(err);
            });
    }
}
