import { FC, useCallback, useEffect, useRef, useState } from "react";
import { IngredientsService } from "../../../infrastructure/services/ingredients";
import {
    View,
    Text,
    RefreshControl,
    ScrollView,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { Ingredient } from "../../../domain/models";
import { NotFound } from "../components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StorageService } from "../../../infrastructure/services/storage";
import { StatefulIngredient } from "../components/StatefulIngredient";
import v4 from "react-native-uuid";

interface IProps {
    ingredientsService: IngredientsService;
    storageService: StorageService;
}

type TStatefulIngredient = {
    id: string;
    ingredient: Ingredient;
    state: "view" | "edit";
    done: boolean | null;
};

export const AllIngredients: FC<IProps> = ({ ingredientsService, storageService }: IProps) => {
    const theme = useTheme();
    const uuid = v4.v4;

    const [ingredients, setIngredients] = useState<TStatefulIngredient[]>([]);
    const [newIngredients, setNewIngredients] = useState<TStatefulIngredient[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [kitchenId, setKitchenId] = useState<string>("");
    const [collect, setCollect] = useState<boolean>(false);
    const [changed, setChanged] = useState<boolean>(false);

    const ingredientsRef = useRef<TStatefulIngredient[]>([]);
    const newIngredientsRef = useRef<TStatefulIngredient[]>([]);

    const handleRefresh = useCallback((): void => {
        setRefreshing(true);
        ingredientsService
            .getAll()
            .then((res: Ingredient[]) => {
                const ingredientsArr: TStatefulIngredient[] = res.map(
                    (i) =>
                        ({
                            id: uuid() as string,
                            ingredient: i,
                            state: "view",
                            done: null,
                        } satisfies TStatefulIngredient)
                );
                setIngredients(ingredientsArr);
                ingredientsRef.current = ingredientsArr;
            })
            .catch((err) => {
                setIngredients([]);
            })
            .finally(() => {
                setRefreshing(false);
            });
    }, []);

    const handleAddNewIngredient = (): void => {
        const ingredientsArr = [
            ...newIngredients,
            {
                id: uuid() as string,
                ingredient: {
                    kitchenId,
                    name: "",
                },
                state: "edit",
                done: false,
            } satisfies TStatefulIngredient,
        ];
        setNewIngredients(ingredientsArr);
        newIngredientsRef.current = ingredientsArr;
    };

    const handleRemoveIngredient = (id: string): void => {
        setNewIngredients([...newIngredients].filter((i) => i.id !== id));
        setIngredients([...ingredients].filter((i) => i.id !== id));
    };

    const handlePushIngredient = (id: string, ingredient: Ingredient) => {
        const existingIndex = ingredientsRef.current.findIndex((i) => i.id === id);
        const newIndex = newIngredientsRef.current.findIndex((i) => i.id === id);

        if (existingIndex !== -1) {
            ingredientsRef.current[existingIndex] = {
                ...ingredientsRef.current.at(existingIndex)!,
                ingredient: ingredient,
                done: true,
            };
        } else if (newIndex !== -1) {
            newIngredientsRef.current[newIndex] = {
                ...newIngredientsRef.current.at(newIndex)!,
                ingredient: ingredient,
                done: true,
            };
        } else {
            console.log("index not found", existingIndex, newIndex);
        }
    };

    const handleCollect = () => {
        // send signal to all StatefulIngredient components
        setCollect((_) => true);
    };

    // Detect collect updates
    useEffect(() => {
        // collect not yet done
        if (
            !collect ||
            ingredientsRef.current.find((i) => i.done === false) ||
            newIngredientsRef.current.find((i) => i.done === false)
        ) {
            return;
        }

        // add new ingredients
        ingredientsService
            .insertMany(newIngredientsRef.current.map((i): Ingredient => i.ingredient))
            .then((res) => {
                console.log(">>> insert done", res);
            });

        // update existing ingredients
        // TODO: add updated|modified field
        // ingredientsService.updateMany(ingredientsRef.current.filter(i => i.))

        // remove deleted ingredients
        //TODO: add remove
    }, [collect, ingredientsRef, newIngredientsRef]);

    // Detect changes
    useEffect(() => {
        if (changed) return;
        setChanged(true);
    }, [ingredients, newIngredients]);

    // On mount, get all ingredients
    useEffect(() => {
        ingredientsService
            .getAll()
            .then((res: Ingredient[]) => {
                const ingredientsArr: TStatefulIngredient[] = res.map(
                    (i) =>
                        ({
                            id: uuid() as string,
                            ingredient: i,
                            state: "view",
                            done: null,
                        } satisfies TStatefulIngredient)
                );
                setIngredients(ingredientsArr);
                ingredientsRef.current = ingredientsArr;
            })
            .then((_) => {
                storageService.getKitchen().then((k) => setKitchenId(k?.id ?? ""));
            });
    }, []);

    return (
        <View className="w-full h-full pt-10">
            <View className="py-5 px-5">
                <Text
                    style={{
                        fontSize: theme.fonts.headlineSmall.fontSize,
                        color: theme.colors.onBackground,
                        fontWeight: "600",
                    }}
                >
                    Your ingredients
                </Text>
            </View>
            {ingredients.length || newIngredients.length ? (
                <>
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
                        {newIngredients.map((iObj, i) => {
                            return (
                                <StatefulIngredient
                                    key={i}
                                    id={iObj.id}
                                    ingredient={iObj.ingredient}
                                    state={iObj.state}
                                    collect={collect}
                                    handlePushIngredient={handlePushIngredient}
                                    handleRemoveIngredient={handleRemoveIngredient}
                                />
                            );
                        })}
                        {ingredients.map((iObj, i) => {
                            return (
                                <StatefulIngredient
                                    key={i}
                                    id={iObj.id}
                                    ingredient={iObj.ingredient}
                                    state={iObj.state}
                                    collect={collect}
                                    handlePushIngredient={handlePushIngredient}
                                    handleRemoveIngredient={handleRemoveIngredient}
                                />
                            );
                        })}
                    </ScrollView>
                    <View
                        className="mx-5 flex flex-row justify-center items-center"
                        style={{
                            gap: 8,
                        }}
                    >
                        <Button
                            className="flex-1 flex flex-row justify-center items-center"
                            mode="contained"
                            style={{}}
                            textColor={theme.colors.onPrimary}
                            icon={"plus"}
                            contentStyle={{ flexDirection: "row-reverse" }}
                            onPress={handleAddNewIngredient}
                        >
                            <Text style={{}}>Add new</Text>
                        </Button>
                        <Button
                            className="flex-1 flex flex-row justify-center items-center"
                            mode="contained"
                            style={{}}
                            disabled={false}
                            buttonColor={theme.colors.secondary}
                            textColor={theme.colors.onSecondary}
                            icon={"content-save-outline"}
                            contentStyle={{ flexDirection: "row-reverse" }}
                            onPress={handleCollect}
                        >
                            <Text style={{}}>Save</Text>
                        </Button>
                    </View>
                </>
            ) : (
                <NotFound onAdd={handleAddNewIngredient} />
            )}
        </View>
    );
};
