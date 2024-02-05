import { FC, useCallback, useEffect, useState } from "react";
import { DishesService } from "../../../infrastructure/services/dishes";
import { Dish } from "../../../domain/models";
import { StorageService } from "../../../infrastructure/services/storage";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { DishCard, DishModal } from "../components";
import { Button, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ApplicationError } from "../../../application/error";
import { AxiosError } from "axios";

interface IProps {
    dishesService: DishesService;
}

export const AllDishes: FC<IProps> = ({ dishesService }: IProps) => {
    const theme = useTheme();

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentDish, setCurrentDish] = useState<Dish>();

    const handleSelectCurrentDish = (dish: Dish): void => {
        setShowModal((_) => true);
        setCurrentDish((_) => dish);
    };

    const handleRefresh = useCallback((): void => {
        setRefreshing(true);
        dishesService
            .getAll()
            .then((res) => {
                setDishes(res);
            })
            .catch((err: ApplicationError) => {
                setDishes([]);
            })
            .finally(() => {
                setRefreshing(false);
            });
    }, []);

    useEffect(() => {
        dishesService.getAll().then((res) => {
            setDishes(res);
        });
    }, []);

    return (
        <View className="w-full h-full p-5 pt-10">
            <View className="py-5">
                <Text
                    style={{
                        fontSize: theme.fonts.headlineSmall.fontSize,
                        color: theme.colors.onBackground,
                        fontWeight: "600",
                    }}
                >
                    Your dishes
                </Text>
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
                className=""
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 20,
                }}
            >
                {dishes.length ? (
                    dishes.map((d: Dish, i: number) => {
                        return (
                            <DishCard
                                handleSetCurrentDish={handleSelectCurrentDish}
                                key={i}
                                dish={d}
                            />
                        );
                    })
                ) : (
                    <View
                        className="w-full h-full flex flex-col justify-center items-center"
                        style={{
                            gap: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: theme.fonts.headlineLarge.fontSize,
                                color: theme.colors.outline,
                            }}
                        >
                            No dishes found
                        </Text>
                        <Button
                            className="flex flex-row justify-center items-center"
                            mode="contained"
                            style={{}}
                            textColor={theme.colors.onPrimary}
                            icon={"chevron-right"}
                            contentStyle={{ flexDirection: "row-reverse" }}
                        >
                            Start adding now
                        </Button>
                    </View>
                )}
            </ScrollView>
            {dishes.length ? (
                <View className="">
                    <Button
                        className="flex flex-row justify-center items-center"
                        mode="contained"
                        style={{}}
                        textColor={theme.colors.onPrimary}
                        icon={"plus"}
                        contentStyle={{ flexDirection: "row-reverse" }}
                    >
                        <Text style={{}}>Add new</Text>
                    </Button>
                </View>
            ) : (
                <></>
            )}
            <DishModal visibleContext={[showModal, setShowModal]} dish={currentDish} />
        </View>
    );
};
