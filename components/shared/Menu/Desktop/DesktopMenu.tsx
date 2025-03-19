"use client";

import MenuItem from "./MenuItem";
import { TfiDashboard } from "react-icons/tfi";
import { IoSearchOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { HiOutlinePencilSquare, HiOutlineUser, HiOutlinePower, HiOutlineQrCode } from "react-icons/hi2";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabase";
// import { useAuthStore } from "@/store/useAuthStore";
// import { toast } from "sonner";

const DesktopMenu = () => {
	// const router = useRouter();
	// const { clearAuth } = useAuthStore();

	// const closeSession = async () => {
	// 	try {
	// 		const { error } = await supabase.auth.signOut();
	// 		if (error) throw error;

	// 		clearAuth();
	// 		toast.success("Sesión cerrada correctamente");
	// 		router.push("/login"); // Redirigir al login en Next.js
	// 	} catch (error) {
	// 		console.error("Error al cerrar sesión:", error);
	// 		toast.error("Error al cerrar sesión");
	// 	}
	// };

	return (
		<div className="flex w-full h-full flex-col justify-between rounded-lg border border-neutral-300 p-2">
			<div className="flex flex-col gap-3">
				<MenuItem text="Dashboard" href="/dashboard" childrenIcon={<TfiDashboard />} />
				<MenuItem text="Buscar" href="/search" childrenIcon={<IoSearchOutline />} />
				<MenuItem text="Gestión" href="/management" childrenIcon={<HiOutlinePencilSquare />} />
				<MenuItem text="Alertas" href="/alerts" childrenIcon={<GoBell />} />
				<MenuItem text="Perfil" href="/profile" childrenIcon={<HiOutlineUser />} />
				<MenuItem text="Scan QR" href="/scanqr" childrenIcon={<HiOutlineQrCode />} />
			</div>
			<div className="border-t pt-2 border-neutral-300">
				<MenuItem text="Salir" childrenIcon={<HiOutlinePower />} />
			</div>
		</div>
	);
};

export default DesktopMenu;
