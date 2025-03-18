import { useRouter } from "next/navigation";

export const useHeader = () => {
  const router = useRouter();

  return {
    router,
  };
};
