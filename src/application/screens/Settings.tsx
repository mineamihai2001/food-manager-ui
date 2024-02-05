import { FC } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { AppSettings } from "../../presentational/settings/features";
import { SettingsService } from "../../infrastructure/services/settings";

interface IProps {}

export const Settings: FC<IProps> = (props: IProps) => {
    const theme = useTheme();

    return (
        <View style={{ backgroundColor: theme.colors.background }} className="w-full h-full">
            <AppSettings settingsService={new SettingsService()} />
        </View>
    );
};
