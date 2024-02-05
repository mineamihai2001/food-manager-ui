import { ErrorScreen, Home, Ingredients, Kitchen, Settings } from "../screens";
import { ITabNavigatorItem } from "../types";
import { MD3Theme } from "react-native-paper/lib/typescript/types";

export function tabNavigatorProvider(theme: MD3Theme): ITabNavigatorItem[] {
    const navigator: ITabNavigatorItem[] = [
        {
            name: "Home",
            component: Home,
            icon: {
                name: "home",
                color: theme.colors.onSurface,
                inactiveColor: theme.colors.surfaceDisabled,
            },
        },
        {
            name: "Ingredients",
            component: Ingredients,
            icon: {
                name: "fridge-outline",
                color: theme.colors.onSurface,
                inactiveColor: theme.colors.surfaceDisabled,
            },
        },
        {
            name: "Kitchen",
            component: Kitchen,
            icon: {
                name: "table-chair",
                color: theme.colors.onSurface,
                inactiveColor: theme.colors.surfaceDisabled,
            },
        },
        {
            name: "Settings",
            component: Settings,
            icon: {
                name: "cog",
                color: theme.colors.onSurface,
                inactiveColor: theme.colors.surfaceDisabled,
            },
        },
    ];
    return navigator;
}
