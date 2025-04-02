import useRegistration from "../registration/useRegistration";

const useHero = () => {
    const { openModal } = useRegistration();

    const scrollToRegistro = () => {
        openModal();
    };

    return { scrollToRegistro };
}

export default useHero;