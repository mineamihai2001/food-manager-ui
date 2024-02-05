import { FC } from "react";
import { Card, useTheme } from "react-native-paper";

interface IProps {
    children: React.ReactNode;
    extraClassName?: string;
}

export const ModalCategory: FC<IProps> = ({ children, extraClassName = "" }: IProps) => {
    const theme = useTheme();

    return (
        <Card
            mode="contained"
            style={{
                backgroundColor: theme.colors.surfaceDisabled,
            }}
            className={`${extraClassName}`}
        >
            {children}
        </Card>
    );
};
