import { PaperProvider, MD3DarkTheme, MD3Theme, MD3LightTheme } from "react-native-paper";
import { TabNavigator } from "./src/application/router";
import { NavigationContainer } from "@react-navigation/native";
import { tabNavigatorProvider } from "./src/application/router/tab-navigator.provider";
import { useEffect, useState } from "react";
import { KitchensService } from "./src/infrastructure/services/kitchens";
import { StorageProvider } from "./src/infrastructure/helpers/storage/Storage.provider";
import { StorageService } from "./src/infrastructure/services/storage";
import { useColorScheme } from "react-native";
import { darkColorScheme, lightColorScheme } from "./src/application/constants";
import { AppService } from "./src/infrastructure/services/app";
import { ApplicationError } from "./src/application/error";

export default function App() {
    const colorScheme = useColorScheme();

    const darkTheme = {
        ...MD3DarkTheme,
        colors: lightColorScheme,
    };

    const lightTheme = {
        ...MD3LightTheme,
        colors: darkColorScheme,
    };

    const [theme, setTheme] = useState<MD3Theme>(colorScheme === "dark" ? darkTheme : lightTheme);
    const [error, setError] = useState<ApplicationError>();

    const handleHealthCheck = async (): Promise<boolean> => {
        return new AppService()
            .healthCheck()
            .then((res) => {
                return true;
            })
            .catch((err: ApplicationError) => {
                console.log("[Application ERROR] - ", err)
                setError((_) => err);
                return false;
            });
    };

    const handleInitStorage = async (storage: StorageService) => {
        // kitchen id
        await new KitchensService().getKitchen().then(async (res) => {
            await storage.setKitchen({
                id: res._id,
            });
        });

        // theme
        const existingTheme = await storage.getTheme();
        if (existingTheme === "dark") {
            setTheme(darkTheme);
        } else if (existingTheme === "light") {
            setTheme(lightTheme);
        }
    };

    useEffect(() => {
        const storage = new StorageService();
        handleInitStorage(storage);

        return () => {
            StorageProvider.destroy();
        };
    }, []);

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <TabNavigator
                    provider={tabNavigatorProvider(theme)}
                    style={{
                        backgroundColor: theme.colors.surface,
                        shadowColor: theme.colors.inverseSurface,
                        shadowOffset: { width: 100, height: 100 },
                    }}
                    options={{}}
                />
            </NavigationContainer>
        </PaperProvider>
    );
}
