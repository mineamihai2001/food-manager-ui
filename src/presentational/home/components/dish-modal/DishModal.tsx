import { Dispatch, FC, SetStateAction } from "react";
import { Card, Chip, Modal, useTheme } from "react-native-paper";
import { Dish } from "../../../../domain/models";
import { View, Text, ScrollView, Image } from "react-native";
import coverPlaceholder from "../../../../../assets/dishes/cover-placeholder.png";
import { ModalCategory } from "./ModalCategory";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface IProps {
    visibleContext: [boolean, Dispatch<SetStateAction<boolean>>];
    dish?: Dish;
}

export const DishModal: FC<IProps> = ({ visibleContext: [visible, setVisible], dish }: IProps) => {
    const theme = useTheme();

    return (
        <Modal
            visible={visible}
            contentContainerStyle={{
                backgroundColor: theme.colors.surface,
                margin: 20,
                borderRadius: 30,
            }}
            onDismiss={() => setVisible(false)}
        >
            {typeof dish !== "undefined" ? (
                <>
                    <View className="">
                        <Image
                            className="w-full h-36 rounded-t-md"
                            source={dish.coverPhoto || coverPlaceholder}
                        />
                    </View>
                    <ScrollView contentContainerStyle={{}}>
                        <ModalCategory extraClassName="p-4 rounded-t-none">
                            <View className="flex flex-col items-start justify-start gap-2">
                                <Text
                                    style={{
                                        color: theme.colors.onSurface,
                                        fontSize: theme.fonts.headlineSmall.fontSize,
                                        fontWeight: "700",
                                    }}
                                >
                                    {dish.name}
                                </Text>
                                <View className="w-full flex flex-row justify-start items-center">
                                    <Chip
                                        className="rounded-full"
                                        style={{
                                            backgroundColor: theme.colors.error,
                                        }}
                                        textStyle={{
                                            color: theme.colors.onError,
                                        }}
                                    >
                                        {dish.duration?.min ?? "?"}-{dish.duration?.max ?? "?"} min
                                    </Chip>
                                    <View className="ml-auto mr-2 flex flex-row justify-center items-center">
                                        <>
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
                                        </>
                                    </View>
                                </View>
                                <Text
                                    style={{
                                        color: theme.colors.outline,
                                        fontSize: theme.fonts.bodyLarge.fontSize,
                                    }}
                                >
                                    {dish.description}
                                </Text>
                            </View>
                        </ModalCategory>
                        <ModalCategory extraClassName="mt-5 p-4">
                            <Text
                                style={{
                                    color: theme.colors.onSurface,
                                    fontSize: theme.fonts.titleLarge.fontSize,
                                }}
                            >
                                Ingredients
                            </Text>
                        </ModalCategory>
                        <ModalCategory extraClassName="mt-5 p-4">
                            <Text
                                style={{
                                    color: theme.colors.onSurface,
                                    fontSize: theme.fonts.titleLarge.fontSize,
                                }}
                            >
                                Recipe
                            </Text>
                        </ModalCategory>
                    </ScrollView>
                </>
            ) : (
                <></>
            )}
        </Modal>
    );
};
