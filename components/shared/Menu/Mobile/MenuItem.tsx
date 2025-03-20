import { MenuItemDTO } from "./MenuItemDTO";

const MenuItem = ({ text, childrenIcon, onClick }: MenuItemDTO) => {
    return (
        <div onClick={onClick} className="flex flex-row w-full cursor-pointer hover:bg-neutral-100 h-10 items-center justify-start px-2 gap-2">
            <div className="flex items-center justify-center w-6 h-6 text-neutral-800">{childrenIcon}</div>
            <div className="text-neutral-800">{text}</div>
        </div>
    );
};

export default MenuItem;
