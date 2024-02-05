export interface Dish {
    _id: string;
    kitchenId: string;
    name: string;
    description: string;
    coverPhoto: string;
    ingredientIds: string[];
    recipe: string;
    duration?: {
        min: number;
        max: number;
    };
    reviews?: number | "N/A";
}
