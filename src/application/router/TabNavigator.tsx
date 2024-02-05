import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import React, { FC } from "react";
import { ITabNavigator } from "../types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();

interface IProps extends ITabNavigator {}

export const TabNavigator: FC<IProps> = (props: IProps) => {
    const { provider: items, options = {}, style = {} } = props;

    return (
        <Tab.Navigator barStyle={style} screenOptions={{ ...options }}>
            {items.map((screen, i) => {
                return (
                    <Tab.Screen
                        options={{
                            tabBarIcon: ({ color, focused }) => {
                                return (
                                    <MaterialCommunityIcons
                                        name={screen.icon.name}
                                        size={24}
                                        color={
                                            focused
                                                ? screen.icon.color ?? color
                                                : screen.icon.inactiveColor ?? color
                                        }
                                    />
                                );
                            },
                        }}
                        key={i}
                        name={screen.name}
                        component={screen.component}
                    />
                );
            })}
        </Tab.Navigator>
    );
};
