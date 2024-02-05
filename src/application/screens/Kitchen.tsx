import { FC } from "react";
import { CurrentKitchen } from "../../presentational/kitchens/features";
import { KitchensService } from "../../infrastructure/services/kitchens";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

interface IProps {}

export const Kitchen: FC<IProps> = () => {
    const theme = useTheme();

    return (
        <View style={{ backgroundColor: theme.colors.background }} className="w-full h-full">
            <CurrentKitchen service={new KitchensService()} />
        </View>
    );
};
