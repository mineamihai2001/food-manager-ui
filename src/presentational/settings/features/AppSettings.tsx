import { FC } from "react";
import { SettingsService } from "../../../infrastructure/services/settings";
import { View, Text } from "react-native";
import { GeneralSettings } from "../components";
import { useTheme } from "react-native-paper";

interface IProps {
    settingsService: SettingsService;
}

export const AppSettings: FC<IProps> = ({ settingsService }: IProps) => {
    const theme = useTheme();

    return (
        <View className="w-full h-full pt-14 flex flex-col justify-start items-start">
            <View className="px-5 w-full">
                <Text
                    style={{
                        fontSize: theme.fonts.headlineMedium.fontSize,
                        color: theme.colors.onBackground,
                        fontWeight: "600",
                    }}
                >
                    Settings
                </Text>
            </View>
            <GeneralSettings settingsService={settingsService} />
        </View>
    );
};
