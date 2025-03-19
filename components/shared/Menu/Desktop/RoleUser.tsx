"use client";
import { useRouter } from "next/navigation";
import { TfiDashboard } from "react-icons/tfi";
import { IoSearchOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { HiOutlinePencilSquare, HiOutlineUser } from "react-icons/hi2";
import MenuItem from "./MenuItem";

const RoleUser = () => {
	const router = useRouter();

	return (
		<div className="flex flex-col w-full gap-4 px-2">
			<MenuItem text="Dashboard" onClick={() => router.push('/dashboard')} childrenIcon={<TfiDashboard />} />
			<MenuItem text="Buscar" onClick={() => router.push('/search')} childrenIcon={<IoSearchOutline />} />
			<MenuItem text="Gestión" onClick={() => router.push('/management')} childrenIcon={<HiOutlinePencilSquare />} />
			<MenuItem text="Alertas" onClick={() => router.push('/alerts')} childrenIcon={<GoBell />} />
			<MenuItem text="Perfil" onClick={() => router.push('/profile')} childrenIcon={<HiOutlineUser />} />
		</div>
	);
}

export default RoleUser;
