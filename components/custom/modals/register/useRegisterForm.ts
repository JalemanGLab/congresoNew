import { registerAssistant } from "@/services/asisstantService";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Distributor {
  value: string;
  label: string;
  id: number;
}

const useRegisterForm = () => {
  // Estados principales
  const [step, setStep] = useState(1);
  const [statusFinish, setStatusFinish] = useState<"success" | "error" | "not">("not");
  const [personalData, setPersonalData] = useState<any>(null);
  const [infoFormulary, setInfoFormulary] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [registeredUser, setRegisteredUser] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [forceRedirect, setForceRedirect] = useState(false);
  const [redirectAttempts, setRedirectAttempts] = useState(0);

  // Estado para rastrear si hemos recibido respuesta válida del backend
  const [backendResponseReceived, setBackendResponseReceived] = useState(false);

  // Estado para distribuidores
  const [distributorsOptions, setDistributorsOptions] = useState<Distributor[]>([]);

  // Mapeo de nombres de distribuidores para mantener consistencia visual
  const distributorLabels: { [key: string]: string } = {
    dental_83: "Dental 83",
    dental_nader: "Dental Nader",
    dentales_market: "Dentales Market",
    casa_dental: "Casa Dental",
    orbidental: "Orbidental",
    bracket: "Bracket",
    adental: "Adental",
  };

  // Verificar que estamos en el cliente antes de renderizar
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Cargar distribuidores
  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        const { getDistributors } = await import("@/services/asisstantService");
        const distributors = await getDistributors();

        if (!Array.isArray(distributors)) {
          toast.error("Error al cargar los distribuidores. Formato de datos incorrecto.");
          return;
        }

        const formattedDistributors = distributors.map((distributor: any) => ({
          value: distributor.name,
          label: distributorLabels[distributor.name] || distributor.name,
          id: distributor.id,
        }));

        setDistributorsOptions(formattedDistributors);
      } catch (error) {
        toast.error("Error al cargar los distribuidores. Por favor, actualice la página.");
      }
    };

    fetchDistributors();
  }, []);

  // Reiniciar contador de intentos al cambiar de paso
  useEffect(() => {
    setRedirectAttempts(0);
    setForceRedirect(false);
  }, [step]);

  // Opciones para los selectores
  const proceduresOptions = [
    { value: "odontologia general", label: "Odontología General" },
    { value: "restauraciones indirectas", label: "Restauraciones indirectas" },
    { value: "restauraciones directas", label: "Restauraciones directas" },
    { value: "diseño de sonrisa", label: "Diseño de sonrisa" },
    { value: "ortodoncia tradicional", label: "Ortodoncia tradicional" },
    { value: "ortodoncia autoligado", label: "Ortodoncia con autoligado" },
    { value: "ortodoncia alineadores", label: "Ortodoncia con Alineadores" },
    { value: "odontopediatra", label: "Odontopediatra" },
    { value: "estudiante", label: "Estudiante" },
    { value: "otro", label: "Otro" },
  ];

  const brandOptions = [
    { value: "ivoclar", label: "Ivoclar" },
    { value: "ultradent", label: "Ultradent" },
    { value: "bisco", label: "Bisco" },
    { value: "ormco", label: "Ormco" },
    { value: "forestadent", label: "Forestadent" },
    { value: "invisalign", label: "Invisalign" },
    { value: "clear correct", label: "Clear Correct" },
    { value: "otro", label: "Otro ¿Cuál?" },
  ];

  const documentTypeOptions = [
    { value: "cc", label: "Cédula de Ciudadanía" },
    { value: "ce", label: "Cédula de Extranjería" },
    { value: "passport", label: "Pasaporte" },
    { value: "nit", label: "NIT" },
    { value: "ti", label: "Tarjeta de Identidad" },
  ];

  // Limpiar datos antes de enviar
  const cleanDataBeforeSubmit = (data: Record<string, any>) => {
    const cleanedData: Record<string, any> = {};

    Object.keys(data).forEach((key) => {
      if (typeof data[key] === "string") {
        cleanedData[key] = data[key].replace(/_/g, " ");
      } else {
        cleanedData[key] = data[key];
      }
    });

    return cleanedData;
  };

  // Configuración del formulario
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    watch,
    setError,
  } = useForm({
    mode: "onChange",
  });

  // PASO 1: Datos personales
  const handleStep1Submit = async (data: any) => {
    try {
      const cleanedData = cleanDataBeforeSubmit(data);
      const isValid = await trigger([
        "first_name",
        "last_name",
        "email",
        "id",
        "phone",
        "city",
      ]);

      if (!isValid) {
        toast.error("Por favor complete todos los campos requeridos");
        return;
      }

      setInfoFormulary((prev: Record<string, any>) => ({
        ...prev,
        step1: cleanedData,
      }));

      setStep(2);
      toast.success("Información personal guardada correctamente");
    } catch (error) {
      toast.error("Ha ocurrido un error al procesar sus datos personales");
    }
  };

  // PASO 2: Datos profesionales
  const handleStep2Submit = async (data: any) => {
    try {
      const cleanedData = cleanDataBeforeSubmit(data);

      if (
        !data.distributor ||
        !data.main_procedure ||
        !data.brand ||
        !data.cases_per_week
      ) {
        toast.error("Por favor complete todos los campos requeridos");
        return;
      }

      // Obtener el distributor_id del distributor seleccionado
      const selectedDistributor = distributorsOptions.find(
        (dist: any) => dist.value === data.distributor
      );

      if (!selectedDistributor) {
        toast.error("El distribuidor seleccionado no es válido");
        return;
      }

      setInfoFormulary((prev: Record<string, any>) => ({
        ...prev,
        step2: {
          ...cleanedData,
          distributor_id: selectedDistributor?.id
        },
      }));

      // Validar los datos del usuario antes de avanzar al paso 3
      await validateUserData({
        ...infoFormulary?.step1,
        ...cleanedData
      });
    } catch (error) {
      toast.error("Ha ocurrido un error al procesar sus datos profesionales");
    }
  };

  // Función para validar los datos del usuario antes de avanzar al resumen
  const validateUserData = async (data: any) => {
    try {
      setPersonalData(data);
      setStep(3);
      toast.success("Información profesional guardada correctamente");
    } catch (error: any) {
      toast.error(error.message || "Ha ocurrido un error inesperado");
    }
  };

  // PASO 3: Confirmación de datos
  const handleStep3Submit = async () => {
    setIsSubmitting(true);

    try {
      if (!infoFormulary?.step1 || !infoFormulary?.step2) {
        throw new Error("Por favor complete todos los campos requeridos");
      }

      // Encontrar el ID del distribuidor seleccionado
      const selectedDistributor = distributorsOptions.find(
        (dist: any) => dist.value === infoFormulary.step2.distributor
      );

      if (!selectedDistributor) {
        throw new Error("Distribuidor no válido");
      }

      // Preparar los datos del usuario
      const userData = {
        assistant: {
          identification: Number(infoFormulary.step1.id),
          first_name: infoFormulary.step1.first_name,
          last_name: infoFormulary.step1.last_name,
          phone: infoFormulary.step1.phone,
          email: infoFormulary.step1.email,
          city: infoFormulary.step1.city,
          distributor: infoFormulary.step2.distributor,
          distributor_id: selectedDistributor.id,
          main_procedure: infoFormulary.step2.main_procedure,
          product_brand: infoFormulary.step2.brand === "otro"
            ? infoFormulary.step2.other_brand
            : infoFormulary.step2.brand,
          weekly_procedure: infoFormulary.step2.cases_per_week,
          contact: infoFormulary.step2.comercialInfo || false
        }
      };


      // Intentar registrar con el backend
      try {
        const response = await registerAssistant(userData);

        if (response && response.status === true && response.url_redirect) {
          // Usar la URL que proporciona el backend
          setRedirectUrl(response.url_redirect);
          setRegisteredUser(response.data?.[0] || null);
          setStep(4);
          toast.success("Registro exitoso");
        } else if (response) {
          // Si hay respuesta pero con error
          throw new Error(response.message || "Error en el registro");
        }
      } catch (connectionError: any) {
        // Error de conexión o registro

        // Mostrar mensaje de error genérico
        toast.error(connectionError.message || "Error en el registro. Por favor intenta nuevamente.");
        setStatusFinish("error");
      }
    } catch (error: any) {
      toast.error("Ocurrió un error inesperado. Por favor intenta de nuevo más tarde.");
      setStatusFinish("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para redirigir al usuario a la plataforma de pago
  const redirectToPayment = () => {
    try {
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        // Si no hay URL de redirección, mostrar un mensaje de error claro
        toast.error("No se ha podido obtener el enlace de pago. Contacte a soporte o intente nuevamente.");
        setStatusFinish("error");
      }
    } catch (error) {
      toast.error("Error al redirigir al pago. Por favor intente nuevamente.");
      setStatusFinish("error");
    }
  };

  // Limpiar el formulario
  const resetForm = () => {
    setInfoFormulary(null);
    setPersonalData(null);
    setStatusFinish("not");
    setStep(1);
    setRedirectUrl(null);
    setRegisteredUser(null);
    setRedirectAttempts(0);
    setForceRedirect(false);
    setBackendResponseReceived(false);
  };

  return {
    step,
    setStep,
    register,
    control,
    errors,
    handleStep1Submit,
    handleStep2Submit,
    handleStep3Submit,
    handleSubmit,
    statusFinish,
    setStatusFinish,
    distributorsOptions,
    proceduresOptions,
    brandOptions,
    documentTypeOptions,
    watch,
    isSubmitting,
    resetForm,
    redirectUrl,
    redirectToPayment,
    registeredUser,
    isClient,
    redirectAttempts,
    forceRedirect,
    backendResponseReceived
  };
};

export default useRegisterForm;
