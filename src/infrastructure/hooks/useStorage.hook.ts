import { StorageProvider } from "../helpers/storage/Storage.provider";

export function useStorage<T extends { [key: string]: any }>(): StorageProvider<T> {
    const storage = StorageProvider.getInstance<T>();
    return storage;
}
