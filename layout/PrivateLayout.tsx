import Image from "next/image";
import UserNav from "@/components/shared/UseNav/UserNav";
import DesktopMenu from "@/components/shared/Menu/Desktop/DesktopMenu";
import MobileMenu from "@/components/shared/Menu/Mobile/MobileMenu";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Outlet } from "react-router-dom";

const PrivateLayout = () => {
	return (
		<div className="flex flex-col w-screen h-screen ">
			<div className="flex flex-row w-full h-12 px-2 items-center justify-between  border-b border-neutral-200">
				<div className="flex flex-row w-full h-full items-center gap-4 ">
					<div className=" flex md:hidden flex-row  h-full items-center ">
						<Sheet>
							<SheetTrigger>
								<div className="flex cursor-pointer  w-8 h-8 rounded  bg-neutral-100 hover:bg-neutral-200  items-center justify-center">
									<HiOutlineMenuAlt2 className=" size-5" />
								</div>
							</SheetTrigger>
							<SheetContent side="left">
								<MobileMenu />
							</SheetContent>
						</Sheet>
					</div>
					<div className="hidden md:flex items-center  h-full py-1 ">
						<Image src="/img/solventum.svg" alt="solventum" className=" h-full" />
					</div>

					<div className="hidden md:flex items-center  h-full w-32   text-xl font-extrabold text-neutral-800 leading-4  ">
						CONGRESO MAGNO 3.0
					</div>
				</div>

				<UserNav />
			</div>
			<div className="flex flex-row w-full h-full ">
				<div className="hidden md:flex flex-col w-20 h-full p-2  ">
					<DesktopMenu />
				</div>
				{/* <div className="flex flex-col w-full h-full p-2 ">
					<Outlet />
				</div> */}
			</div>
		</div>
	);
};

export default PrivateLayout;
