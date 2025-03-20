import { ReactNode } from "react";

export interface MenuItemDTO {
    text: string;
    childrenIcon: ReactNode;
    onClick: () => void;
}
