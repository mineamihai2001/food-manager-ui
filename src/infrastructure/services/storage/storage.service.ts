import { StorageModel } from "../../../domain/models";
import { StorageProvider } from "../../helpers/storage/Storage.provider";

export class StorageService {
    private provider: StorageProvider<StorageModel>;

    public constructor() {
        this.provider = StorageProvider.getInstance<StorageModel>();
    }

    public async getKitchen(): Promise<StorageModel["kitchen"] | null> {
        const so = await this.provider.getItem("kitchen");
        return so ? so.toObject() : null;
    }

    public async setKitchen(value: StorageModel["kitchen"]): Promise<void> {
        return this.provider.setItem("kitchen", value);
    }

    public async getTheme(): Promise<StorageModel["theme"] | null> {
        const so = await this.provider.getItem("theme");
        return so ? so.toObject() : null;
    }

    public async setTheme(value: StorageModel["theme"]): Promise<void> {
        return this.provider.setItem("theme", value);
    }
}
