import { FC } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { StorageService } from "../../infrastructure/services/storage";
import { DishesService } from "../../infrastructure/services/dishes";
import { AllDishes } from "../../presentational/home/features";

export const Home: FC = () => {
    const theme = useTheme();

    return (
        <View style={{ backgroundColor: theme.colors.background }} className="w-full h-full">
            <AllDishes dishesService={new DishesService(new StorageService())} />
        </View>
    );
};
