import { registerAssistant } from "@/services/asisstantService";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useRegisterForm = () => {
  const [step, setStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<"card" | "pse" | null>(
    null
  );
  const [paymentData, setPaymentData] = useState<any>(null);
  const [statusFinish, setStatusFinish] = useState<"success" | "error" | "not">(
    "not"
  );
  const [personalData, setPersonalData] = useState<any>(null);
  const [infoFormulary, setInfoFormulary] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [distributorsOptions, setDistributorsOptions] = useState([]);

  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        const { getDistributors } = await import("@/services/asisstantService");
        const distributors = await getDistributors();

        // Mapeo de nombres para mantener los values específicos
        const distributorLabels: { [key: string]: string } = {
          dental_83: "Dental 83",
          dental_nader: "Dental Nader",
          dentales_market: "Dentales Market",
          casa_dental: "Casa Dental",
          orbidental: "Orbidental",
          bracket: "Bracket",
          adental: "Adental",
        };

        const formattedDistributors = distributors.map((distributor: any) => ({
          value: distributor.name, // Mantenemos el value original
          label: distributorLabels[distributor.name] || distributor.name, // Usamos el label mapeado o el nombre original si no existe mapeo
          id: distributor.id,
        }));

        setDistributorsOptions(formattedDistributors);
      } catch (error) {
        console.error("Error fetching distributors:", error);
        toast.error("Error al cargar los distribuidores");
      }
    };

    fetchDistributors();
  }, []);

  const proceduresOptions = [
    { value: "odontologia_general", label: "Odontología General" },
    { value: "restauraciones_indirectas", label: "Restauraciones indirectas" },
    { value: "restauraciones_directas", label: "Restauraciones directas" },
    { value: "diseno_sonrisa", label: "Diseño de sonrisa" },
    { value: "ortodoncia_tradicional", label: "Ortodoncia tradicional" },
    { value: "ortodoncia_autoligado", label: "Ortodoncia con autoligado" },
    { value: "ortodoncia_alineadores", label: "Ortodoncia con Alineadores" },
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
    { value: "clear_correct", label: "Clear Correct" },
    { value: "otro", label: "Otro ¿Cuál?" },
  ];

  const banksOptions = [
    { value: "bancolombia", label: "Bancolombia" },
    { value: "banco_bogota", label: "Banco de Bogotá" },
    { value: "davivienda", label: "Davivienda" },
    { value: "bbva", label: "BBVA" },
    { value: "banco_occidente", label: "Banco de Occidente" },
    { value: "banco_popular", label: "Banco Popular" },
    { value: "banco_agrario", label: "Banco Agrario" },
    { value: "banco_avvillas", label: "Banco AV Villas" },
  ];

  const documentTypeOptions = [
    { value: "cc", label: "Cédula de Ciudadanía" },
    { value: "ce", label: "Cédula de Extranjería" },
    { value: "passport", label: "Pasaporte" },
    { value: "nit", label: "NIT" },
    { value: "ti", label: "Tarjeta de Identidad" },
  ];

  // Formulario principal para info personal y profesional
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

  // Formulario separado para pagos
  const {
    register: registerPayment,
    handleSubmit: handleSubmitPayment,
    control: controlPayment,
    formState: { errors: paymentErrors },
    trigger: triggerPayment,
  } = useForm({
    mode: "onChange",
  });

  const handleStep1Submit = async (data: any) => {
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
      step1: data,
    }));
    setStep(2);
    toast.success("Información personal guardada correctamente");
  };

  const handleStep2Submit = async (data: any) => {
    if (
      !data.distributor ||
      !data.main_procedure ||
      !data.brand ||
      !data.cases_per_week
    ) {
      toast.error("Por favor complete todos los campos requeridos");
      return;
    }
    setInfoFormulary((prev: Record<string, any>) => ({
      ...prev,
      step2: data,
    }));
    setStep(3);
    setPersonalData(data);
    toast.success("Información profesional guardada correctamente");
  };

  const handleStep3Submit = async (data: any) => {
    if (selectedPayment === "card") {
      const isValid = await triggerPayment([
        "card_name",
        "card_number",
        "expiry_date",
        "cvc",
      ]);
      if (!isValid) {
        toast.error("Por favor complete todos los campos de la tarjeta");
        return;
      }
    } else if (selectedPayment === "pse") {
      const isValid = await triggerPayment(["bank", "document_type"]);
      if (!isValid) {
        toast.error("Por favor complete todos los campos de PSE");
        return;
      }
    }

    const finalFormData = {
      assistant: {
        identification: infoFormulary?.step1?.id
          ? Number(infoFormulary.step1.id)
          : undefined,
        first_name: infoFormulary?.step1?.first_name,
        last_name: infoFormulary?.step1?.last_name,
        phone: infoFormulary?.step1?.phone,
        email: infoFormulary?.step1?.email,
        main_procedure: infoFormulary?.step2?.main_procedure,
        product_brand: infoFormulary?.step2?.brand,
        weekly_procedure: infoFormulary?.step2?.cases_per_week,
        contact: true,
        distributor: infoFormulary?.step2?.distributor,
        city: infoFormulary?.step1?.city,
      },
      payment: {
        type: selectedPayment?.toUpperCase(),
        value: 500000,
        ...(selectedPayment === "pse" && {
          pse: {
            bank: data.bank,
            type_person: "natural",
          },
        }),
        ...(selectedPayment === "card" && {
          card: {
            name: data.card_name,
            number: data.card_number,
            expiry_date: data.expiry_date,
            cvc: data.cvc,
          },
        }),
      },
    };

    setInfoFormulary(finalFormData);
    setIsSubmitting(true);

    try {
      const response = await registerAssistant(finalFormData);

      if (response.status === true) {
        setStatusFinish("success");
        localStorage.removeItem("registerStep");
        localStorage.removeItem("registerForm");
      } else {
        setStatusFinish("error");

        // Marcar campos con error
        if (response.message?.includes("assistant.identification")) {
          setError("id", { type: "server", message: " " });
        }
        if (response.message?.includes("assistant.first_name")) {
          setError("first_name", { type: "server", message: " " });
        }
        if (response.message?.includes("assistant.last_name")) {
          setError("last_name", { type: "server", message: " " });
        }
        if (response.message?.includes("assistant.phone")) {
          setError("phone", { type: "server", message: " " });
        }
        if (response.message?.includes("assistant.email")) {
          setError("email", { type: "server", message: " " });
        }
        if (response.message?.includes("assistant.city")) {
          setError("city", { type: "server", message: " " });
        }
      }
    } catch (error: any) {
      setStatusFinish("error");
      
      // Nuevos mensajes de error
      if (error.message?.includes('número de teléfono ya está registrado')) {
        setError('phone', { type: 'server' });
      }
      if (error.message?.includes('correo electrónico ya está registrado')) {
        setError('email', { type: 'server' });
      }
      if (error.message?.includes('número de identificación ya está registrado')) {
        setError('id', { type: 'server' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Añadir una nueva función para limpiar estados
  const resetForm = () => {
    setInfoFormulary(null);
    setPersonalData(null);
    setPaymentData(null);
    setSelectedPayment(null);
    setStatusFinish("not");
    setStep(1);
  };

  return {
    step,
    setStep,
    selectedPayment,
    setSelectedPayment,
    register,
    registerPayment,
    control,
    controlPayment,
    errors,
    paymentErrors,
    handleStep1Submit,
    handleStep2Submit,
    handleStep3Submit,
    handleSubmit,
    handleSubmitPayment,
    statusFinish,
    setStatusFinish,
    distributorsOptions,
    proceduresOptions,
    brandOptions,
    banksOptions,
    documentTypeOptions,
    watch,
    isSubmitting,
    resetForm,
  };
};

export default useRegisterForm;
