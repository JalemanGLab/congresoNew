"use client";
import { useRouter } from "next/navigation";
import { BsDatabaseUp, BsClipboard2Data } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi2";
import { TbMessageForward } from "react-icons/tb";
import MenuItem from "./MenuItem";

const RoleSuper = () => {
	const router = useRouter();

	return (
		<div className="flex flex-col w-full gap-4 px-2">
			<MenuItem text="Datos" onClick={() => router.push('/data')} childrenIcon={<BsDatabaseUp />} />
			<MenuItem text="Reportes" onClick={() => router.push('/reports')} childrenIcon={<BsClipboard2Data />} />
			<MenuItem text="Usuarios" onClick={() => router.push('/users')} childrenIcon={<HiOutlineUsers />} />
			<MenuItem text="Comunicación" onClick={() => router.push('/communication')} childrenIcon={<TbMessageForward />} />
		</div>
	);
}

export default RoleSuper;
