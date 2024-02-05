import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import { ITabNavigatorItem } from "../types";

const Stack = createNativeStackNavigator();

interface IProps {
    screens: ITabNavigatorItem[];
}

export const RouterNavigator: FC<IProps> = (props: IProps) => {
    const { screens } = props;

    return (
        <Stack.Navigator>
            {screens.map((screen, i) => {
                return <Stack.Screen key={i} name={screen.name} component={screen.component} />;
            })}
        </Stack.Navigator>
    );
};
