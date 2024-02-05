import { FC, useEffect, useState } from "react";
import { Ingredient } from "../../../domain/models";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface IProps {
    id: string;
    ingredient: Ingredient;
    state: "view" | "edit";
    collect: boolean;
    handlePushIngredient: (id: string, ingredient: Ingredient) => void;
    handleRemoveIngredient: (id: string) => void;
}

export const StatefulIngredient: FC<IProps> = ({
    id,
    ingredient: initialIngredient,
    state,
    collect,
    handlePushIngredient,
    handleRemoveIngredient,
}: IProps) => {
    const theme = useTheme();

    const [mode, setMode] = useState<"view" | "edit">(state);
    const [ingredient, setIngredient] = useState<Ingredient>(initialIngredient);

    const handleChangeName = (value: string): void => {
        setIngredient({
            ...ingredient,
            name: value,
        });
    };

    const handleConfirm = () => {
        setMode("view");
    };

    const handleEdit = () => {
        setMode("edit");
    };

    useEffect(() => {
        if (!collect) return;

        handlePushIngredient(id, ingredient);
    }, [collect]);

    return mode === "edit" ? (
        <View
            className="w-full flex flex-row justify-center items-center px-5 "
            style={{
                gap: 5,
            }}
        >
            <TextInput
                className="w-2/3"
                mode="outlined"
                label={"Your new ingredient"}
                value={ingredient.name}
                onChangeText={(text) => handleChangeName(text)}
            />
            <View
                className="w-1/3 flex flex-row justify-end items-center"
                style={{
                    gap: 3,
                }}
            >
                <TouchableOpacity onPress={handleConfirm}>
                    <View
                        className="w-10 h-10 rounded-full flex justify-center items-center"
                        style={{
                            borderColor: theme.colors.primary,
                            borderWidth: 2,
                        }}
                    >
                        <MaterialCommunityIcons
                            color={theme.colors.primary}
                            name="check"
                            size={20}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRemoveIngredient(id)}>
                    <View
                        className="w-10 h-10 rounded-full flex justify-center items-center"
                        style={{
                            borderColor: theme.colors.errorContainer,
                            borderWidth: 2,
                        }}
                    >
                        <MaterialCommunityIcons
                            color={theme.colors.errorContainer}
                            name="trash-can-outline"
                            size={20}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    ) : (
        <View
            className="w-full flex flex-row px-5"
            style={{
                gap: 5,
                // borderColor: theme.colors.outline,
                // borderTopWidth: 1,
                // borderBottomWidth: 1,
            }}
        >
            <View className="flex-1 flex flew-row justify-center items-start">
                <Text
                    className="w-2/3"
                    style={{
                        color: theme.colors.onBackground,
                        fontSize: theme.fonts.labelLarge.fontSize,
                    }}
                >
                    {ingredient.name}
                </Text>
            </View>
            <View
                className="flex flex-row justify-center items-center "
                style={{
                    gap: 3,
                }}
            >
                <TouchableOpacity onPress={handleEdit}>
                    <View
                        className="w-10 h-10 rounded-full flex justify-center items-center"
                        style={{
                            borderColor: theme.colors.tertiary,
                            borderWidth: 2,
                        }}
                    >
                        <MaterialCommunityIcons
                            color={theme.colors.tertiary}
                            name="pencil-outline"
                            size={20}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};
