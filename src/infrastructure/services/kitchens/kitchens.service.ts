import { ApplicationError } from "../../../application/error";
import { Kitchen } from "../../../domain/models";
import { BaseService } from "../base";

export class KitchensService extends BaseService {
    public constructor() {
        super();
    }

    public async getKitchen(): Promise<Kitchen> {
        return super
            .request<Kitchen[]>("/kitchens")
            .then((res) => res.data)
            .then((res: Kitchen[]) => {
                return res.at(0)! ?? {};
            })
            .catch((err: Error) => {
                throw new ApplicationError(err);
            });
    }
}
