import { FC, useEffect, useState } from "react";
import { KitchensService } from "../../../infrastructure/services/kitchens";
import { Kitchen } from "../../../domain/models";
import { ApplicationError } from "../../../application/error";
import { View, Text } from "react-native";
import { Snackbar, TextInput, useTheme } from "react-native-paper";
import { sleep } from "../../../application/utils";

interface IProps {
    service: KitchensService;
}

export const CurrentKitchen: FC<IProps> = ({ service }: IProps) => {
    const theme = useTheme();

    const [kitchen, setKitchen] = useState<Kitchen>();
    const [error, setError] = useState<ApplicationError>();
    const [clipboard, setClipboard] = useState<string>();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [snackMessage, setSnackMessage] = useState<string>("");

    const handleCopyToClipboard = (): void => {
        setClipboard((_) => kitchen?._id ?? "");
        handleShowSnack();
        setSnackMessage((_) => "Id copied to clipboard");
    };

    const handleShowSnack = async () => {
        setIsVisible(true);
        await sleep(1000);
        setIsVisible(false);
    };

    const handleHideSnack = () => {
        setIsVisible(false);
    };

    useEffect(() => {
        service
            .getKitchen()
            .then((res: Kitchen) => setKitchen(res))
            .catch((err: ApplicationError) => setError(err));
    }, []);

    return typeof kitchen !== "undefined" ? (
        <View className="w-full h-full flex flex-1 justify-center items-center">
            <View className="w-full p-10">
                <Text
                    className="py-3"
                    style={{
                        color: theme.colors.primary,
                        fontSize: theme.fonts.headlineSmall.fontSize,
                    }}
                >
                    {kitchen.name}
                </Text>
                <TextInput
                    disabled={true}
                    defaultValue={kitchen._id}
                    style={{
                        fontSize: 16,
                        paddingHorizontal: 10,
                    }}
                    right={
                        <TextInput.Icon
                            onPress={handleCopyToClipboard}
                            icon={"clipboard"}
                            color={theme.colors.onSurface}
                        />
                    }
                />
            </View>
            <Snackbar
                visible={isVisible}
                action={{
                    label: "Close",
                    onPress: handleHideSnack,
                }}
                onDismiss={handleHideSnack}
            >
                {snackMessage}
            </Snackbar>
        </View>
    ) : typeof error !== "undefined" ? (
        <>
            <View>
                <Text>{error.message}</Text>
            </View>
        </>
    ) : (
        <>
            <View>
                <Text>Error</Text>
            </View>
        </>
    );
};
