import { FC } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useTheme } from "react-native-paper";

interface IProps {
    onAdd: () => void;
}

export const NotFound: FC<IProps> = ({ onAdd }: IProps) => {
    const theme = useTheme();

    return (
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
                No ingredients found
            </Text>
            <Button
                className="flex flex-row justify-center items-center"
                mode="contained"
                style={{}}
                textColor={theme.colors.onPrimary}
                icon={"chevron-right"}
                contentStyle={{ flexDirection: "row-reverse" }}
                onPress={onAdd}
            >
                Start adding now
            </Button>
        </View>
    );
};
