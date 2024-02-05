import { AxiosError } from "axios";
import { ApplicationError } from "../../../application/error";
import { BaseService } from "../base";

export class AppService extends BaseService {
    public constructor() {
        super();
    }

    public async healthCheck() {
        return super
            .request("/health")
            .then((res) => res.json())
            .catch((err: AxiosError) => {
                throw new ApplicationError(err);
            });
    }
}
