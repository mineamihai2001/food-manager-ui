import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { MaterialBottomTabNavigationOptions } from "react-native-paper/react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Animated, StyleProp, ViewStyle } from "react-native";

export interface IRouterNavigator {
    screens: IRouterNavigatorItem[];
}

export interface IRouterNavigatorItem {
    name: string;
    component: React.ComponentType;
}

export interface ITabNavigator {
    provider: ITabNavigatorItem[];
    options?: MaterialBottomTabNavigationOptions;
    style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
}

export interface ITabNavigatorItem {
    name: string;
    component: React.ComponentType;
    icon: {
        name: keyof typeof MaterialCommunityIcons.glyphMap;
        color?: string;
        inactiveColor?: string;
    };
    children?: IRouterNavigator;
}
