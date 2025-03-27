import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import MenuItem from "./MenuItem";
import { TfiDashboard } from "react-icons/tfi";
import {
  HiOutlinePower,
  HiOutlineQrCode,
  HiOutlineUser,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";

const MobileMenu = () => {
  return (
    <div className="flex flex-col w-full h-full bg-white gap-2 p-2">
      <div className="flex flex-row gap-2 p-2 w-full rounded-sm bg-neutral-100 h-14 items-center justify-start">
        <div className="flex items-center h-full py-1 text-background">
          {/* <Image src="/img/solventum.svg" alt="solventum" className="h-full" /> */}
          LOGO
        </div>
      </div>
      <ScrollArea className="w-full h-full">
        <div className="flex flex-col w-full gap-2">
          <MenuItem
            text="Asistentes"
            onClick={() => {}}
            childrenIcon={<TfiDashboard />}
          />
          <MenuItem
            text="Buscar"
            onClick={() => {}}
            childrenIcon={<IoSearchOutline />}
          />
          <MenuItem
            text="Gestion"
            onClick={() => {}}
            childrenIcon={<HiOutlinePencilSquare />}
          />
          <MenuItem
            text="Alertas"
            onClick={() => {}}
            childrenIcon={<GoBell />}
          />
          <MenuItem
            text="Perfil"
            onClick={() => {}}
            childrenIcon={<HiOutlineUser />}
          />
          <MenuItem
            text="Scan QR"
            onClick={() => {}}
            childrenIcon={<HiOutlineQrCode />}
          />
        </div>
      </ScrollArea>
      <div className="flex w-full">
        <MenuItem
          text="Salir"
          onClick={() => {}}
          childrenIcon={<HiOutlinePower />}
        />
      </div>
    </div>
  );
};

export default MobileMenu;
