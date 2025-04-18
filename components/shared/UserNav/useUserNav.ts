import { useAuthStore } from "@/store/authStore";
import { authService } from "@/services/authService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const useUserNav = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  const getInitials = () => {
    if (!user?.first_name || !user?.last_name) return "AN";
    return (
      user.first_name.charAt(0).toUpperCase() +
      user.last_name.charAt(0).toUpperCase()
    );
  };

  const handleProfileClick = () => {
    router.push("/profile");
  };

  const closeSession = async () => {
    try {
      await authService.logout();
      toast.success("Sesión cerrada correctamente");
      setTimeout(() => {
        router.replace("/login");
      }, 100);
    } catch (error) {
      toast.error("Error al cerrar sesión");
    }
  };

  return {
    getInitials,
    closeSession,
    handleProfileClick,
  };
};

export default useUserNav;
