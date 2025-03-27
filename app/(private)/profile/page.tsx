'use client'
import ProfileUser from "@/components/pages/profile/Profile";
import useProfile from "./useProfile";

export default function ProfilePage() {
  const { rol } = useProfile();

  if (!rol) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="">
      <ProfileUser userRole={rol}/>
    </div>
  );
}
