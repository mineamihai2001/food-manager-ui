import { FC } from "react";
import { View } from "react-native";
import { Dish } from "../../../domain/models";
import { Card, Chip, Text, useTheme } from "react-native-paper";
import coverPlaceholder from "../../../../assets/dishes/cover-placeholder.png";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AppTheme } from "../../../application/constants";

interface IProps {
    dish: Dish;
    handleSetCurrentDish: (dish: Dish) => void;
}

export const DishCard: FC<IProps> = ({ dish, handleSetCurrentDish }: IProps) => {
    const theme = useTheme<AppTheme>();

    return (
        <Card
            onPress={(): void => handleSetCurrentDish(dish)}
            className="w-full"
            elevation={1}
            mode="elevated"
            style={{
                backgroundColor: theme.colors.surface,
                shadowColor: theme.colors.outline,
            }}
        >
            <View className="relative">
                <Card.Cover
                    className="h-28 rounded-b-none opacity-50"
                    source={dish.coverPhoto || coverPlaceholder}
                />
                <Chip className="absolute bottom-3 right-3 rounded-full">
                    {dish.duration?.min ?? "?"}-{dish.duration?.max ?? "?"} min
                </Chip>
            </View>

            <Card.Content>
                <View className="pt-2 pb-1 flex flex-row items-end">
                    <Text
                        className=""
                        style={{
                            fontSize: theme.fonts.bodyLarge.fontSize,
                            color: theme.colors.primary,
                            fontWeight: "600",
                        }}
                    >
                        {dish.name}
                    </Text>
                    <View className="ml-auto flex flex-row justify-center items-center">
                        <MaterialCommunityIcons
                            name="star"
                            size={22}
                            color={theme.colors.primary}
                        />
                        <Text
                            style={{
                                fontSize: theme.fonts.titleMedium.fontSize,
                                color: theme.colors.primary,
                                fontWeight: "700",
                            }}
                        >
                            {dish.reviews ?? "N/A"}
                        </Text>
                    </View>
                </View>
                <View className="">
                    <Text
                        variant="bodyMedium"
                        style={{
                            color: theme.colors.onSurfaceDisabled,
                        }}
                    >
                        {dish.description}
                    </Text>
                </View>
            </Card.Content>
        </Card>
    );
};
