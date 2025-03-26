"use client";
import { useRouter } from "next/navigation";
import { TfiDashboard } from "react-icons/tfi";
import {  HiOutlineUser } from "react-icons/hi2";
import MenuItem from "./MenuItem";

const RoleUser = () => {
	const router = useRouter();

	return (
		<div className="flex flex-col w-full gap-4 px-2">
			<MenuItem text="Dashboard" onClick={() => router.push('/dashboard')} childrenIcon={<TfiDashboard />} />
			<MenuItem text="Perfil" onClick={() => router.push('/profile')} childrenIcon={<HiOutlineUser />} />
		</div>
	);
}

export default RoleUser;
