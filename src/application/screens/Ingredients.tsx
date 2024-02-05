import { FC } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { AllIngredients } from "../../presentational/ingredients/features";
import { IngredientsService } from "../../infrastructure/services/ingredients";
import { StorageService } from "../../infrastructure/services/storage";

interface IProps {}

export const Ingredients: FC<IProps> = (props: IProps) => {
    const theme = useTheme();
    const storageService = new StorageService();

    return (
        <View style={{ backgroundColor: theme.colors.background }} className="w-full h-full">
            <AllIngredients
                ingredientsService={new IngredientsService(storageService)}
                storageService={storageService}
            />
        </View>
    );
};
