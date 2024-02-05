import { FC, useEffect, useState } from "react";
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Animated,
    Appearance,
} from "react-native";
import { SettingsService } from "../../../infrastructure/services/settings";
import { Card, List, Switch, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface IProps {
    settingsService: SettingsService;
}

export const GeneralSettings: FC<IProps> = ({ settingsService }: IProps) => {
    const theme = useTheme();

    const [isDark, setIsDark] = useState<boolean>(true);

    const toggleIsDark = (): void => {
        setIsDark((oldTheme) => {
            const newTheme = !oldTheme;
            Appearance.setColorScheme(newTheme === true ? "dark" : "light");

            return newTheme;
        });
    };

    return (
        <View className="w-full">
            <List.Accordion title={"General"} id={1}>
                <View className="flex flex-row justify-start items-center">
                    <List.Item
                        titleStyle={{
                            fontSize: theme.fonts.titleLarge.fontSize,
                        }}
                        title="Theme"
                    ></List.Item>
                    <TouchableWithoutFeedback onPress={toggleIsDark}>
                        <Animated.View
                            className="ml-auto mr-4 p-1 
                                    flex flex-row justify-center items-center
                                    rounded-full"
                            style={{
                                backgroundColor: theme.colors.primary,
                                gap: 8,
                            }}
                        >
                            <View
                                className="rounded-full p-2"
                                style={{
                                    backgroundColor: !isDark
                                        ? theme.colors.primaryContainer
                                        : theme.colors.primary,
                                }}
                            >
                                <MaterialCommunityIcons
                                    color={
                                        !isDark
                                            ? theme.colors.onSecondaryContainer
                                            : theme.colors.onPrimary
                                    }
                                    size={16}
                                    name="white-balance-sunny"
                                />
                            </View>
                            <View
                                style={{
                                    backgroundColor: isDark
                                        ? theme.colors.primaryContainer
                                        : theme.colors.primary,
                                }}
                                className="rounded-full p-2"
                            >
                                <MaterialCommunityIcons
                                    color={
                                        isDark
                                            ? theme.colors.onSecondaryContainer
                                            : theme.colors.onPrimary
                                    }
                                    size={16}
                                    name="moon-waning-crescent"
                                />
                            </View>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </List.Accordion>
        </View>
    );
};
