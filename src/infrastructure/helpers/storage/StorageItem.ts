export class StorageItem<T> {
    public constructor(public readonly value: string) {}

    public toString(): string {
        return this.value;
    }

    public toObject(): T {
        return JSON.parse(this.value) as T;
    }

    public toNumber(): number {
        return parseInt(this.value);
    }

    public toBool(): boolean {
        return this.value === "true" ? true : false;
    }
}
