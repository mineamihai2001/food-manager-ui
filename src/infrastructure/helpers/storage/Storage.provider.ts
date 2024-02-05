import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageItem } from "./StorageItem";

export class StorageProvider<T extends { [key: string]: any }> {
    public static instance: StorageProvider<any> | null = null;

    private constructor() {}

    public static getInstance<D extends { [key: string]: any }>(): StorageProvider<D> {
        if (this.instance === null) this.instance = new StorageProvider<D>();
        return this.instance;
    }

    public async getItem<K extends keyof T>(key: K): Promise<StorageItem<T[K]> | null> {
        try {
            const value: string | null = await AsyncStorage.getItem(key as string);
            if (value === null) return value;
            return new StorageItem<T[K]>(value);
        } catch (err) {
            return null;
        }
    }

    public async setItem<K extends keyof T>(key: K, value: T[K]): Promise<void> {
        try {
            await AsyncStorage.setItem(key as string, JSON.stringify(value));
        } catch (err) {
            throw err;
        }
    }

    public static destroy(): void {
        this.instance = null;
    }
}
