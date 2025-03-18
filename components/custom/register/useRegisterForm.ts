import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const useRegisterForm = () => {
    const [step, setStep] = useState(1);
    const [selectedPayment, setSelectedPayment] = useState<'card' | 'pse' | null>(null);
    const [paymentData, setPaymentData] = useState<any>(null);
    const [personalData, setPersonalData] = useState<any>(null);
    const [infoFormulary, setInfoFormulary] = useState<any>(null);

 

    const distributorsOptions = [
        { value: 'dental_83', label: 'Dental 83' },
        { value: 'dental_nader', label: 'Dental Nader' },
        { value: 'dentales_market', label: 'Dentales Market' },
        { value: 'casa_dental', label: 'Casa Dental' },
        { value: 'orbidental', label: 'Orbidental' },
        { value: 'bracket', label: 'Bracket' },
        { value: 'adental', label: 'Adental' }
    ];

    const proceduresOptions = [
        { value: 'odontologia_general', label: 'Odontología General' },
        { value: 'restauraciones_indirectas', label: 'Restauraciones indirectas' },
        { value: 'restauraciones_directas', label: 'Restauraciones directas' },
        { value: 'diseno_sonrisa', label: 'Diseño de sonrisa' },
        { value: 'ortodoncia_tradicional', label: 'Ortodoncia tradicional' },
        { value: 'ortodoncia_autoligado', label: 'Ortodoncia con autoligado' },
        { value: 'ortodoncia_alineadores', label: 'Ortodoncia con Alineadores' },
        { value: 'odontopediatra', label: 'Odontopediatra' },
        { value: 'estudiante', label: 'Estudiante' },
        { value: 'otro', label: 'Otro' }
    ];

    const brandOptions = [
        { value: 'ivoclar', label: 'Ivoclar' },
        { value: 'ultradent', label: 'Ultradent' },
        { value: 'bisco', label: 'Bisco' },
        { value: 'ormco', label: 'Ormco' },
        { value: 'forestadent', label: 'Forestadent' },
        { value: 'invisalign', label: 'Invisalign' },
        { value: 'clear_correct', label: 'Clear Correct' },
        { value: 'otro', label: 'Otro ¿Cuál?' }
    ];

    const banksOptions = [
        { value: 'bancolombia', label: 'Bancolombia' },
        { value: 'banco_bogota', label: 'Banco de Bogotá' },
        { value: 'davivienda', label: 'Davivienda' },
        { value: 'bbva', label: 'BBVA' },
        { value: 'banco_occidente', label: 'Banco de Occidente' },
        { value: 'banco_popular', label: 'Banco Popular' },
        { value: 'banco_agrario', label: 'Banco Agrario' },
        { value: 'banco_avvillas', label: 'Banco AV Villas' }
    ];

    const documentTypeOptions = [
        { value: 'cc', label: 'Cédula de Ciudadanía' },
        { value: 'ce', label: 'Cédula de Extranjería' },
        { value: 'passport', label: 'Pasaporte' },
        { value: 'nit', label: 'NIT' },
        { value: 'ti', label: 'Tarjeta de Identidad' }
    ];

    // Formulario principal para info personal y profesional
    const { 
        register, 
        handleSubmit, 
        control, 
        formState: { errors }, 
        trigger,
        watch
    } = useForm({
        mode: "onChange"
    });

    // Formulario separado para pagos
    const { 
        register: registerPayment, 
        handleSubmit: handleSubmitPayment,
        control: controlPayment,
        formState: { errors: paymentErrors }, 
        trigger: triggerPayment 
    } = useForm({
        mode: "onChange"
    });

    const handleStep1Submit = async (data: any) => {
        const isValid = await trigger(['first_name', 'last_name', 'email', 'id', 'phone', 'city']);
        if (!isValid) {
            toast.error('Por favor complete todos los campos requeridos');
            return;
        }
        setInfoFormulary((prev: Record<string, any>) => ({
            ...prev,
            step1: data
        }));
        setStep(2);
        toast.success('Información personal guardada correctamente');
    };

    const handleStep2Submit = async (data: any) => {
        if (!data.distributor || !data.main_procedure || !data.brand || !data.cases_per_week) {
            toast.error('Por favor complete todos los campos requeridos');
            return;
        }
        setInfoFormulary((prev: Record<string, any>) => ({
            ...prev,
            step2: data
        }));
        setStep(3);
        setPersonalData(data);
        toast.success('Información profesional guardada correctamente');
    };

    const handleStep3Submit = async (data: any) => {
        if (selectedPayment === 'card') {
            const isValid = await triggerPayment(['card_name', 'card_number', 'expiry_date', 'cvc']);
            if (!isValid) {
                toast.error('Por favor complete todos los campos de la tarjeta');
                return;
            }
        } else if (selectedPayment === 'pse') {
            const isValid = await triggerPayment(['bank', 'document_type']);
            if (!isValid) {
                toast.error('Por favor complete todos los campos de PSE');
                return;
            }
        }

        const finalFormData = {
            assistant: {
                identification: Number(infoFormulary?.step1?.id),
                first_name: infoFormulary?.step1?.first_name,
                last_name: infoFormulary?.step1?.last_name,
                phone: infoFormulary?.step1?.phone,
                email: infoFormulary?.step1?.email,
                main_procedure: infoFormulary?.step2?.main_procedure,
                product_brand: infoFormulary?.step2?.brand,
                weekly_procedure: infoFormulary?.step2?.cases_per_week,
                contact: true,
                distributor: infoFormulary?.step2?.distributor,
                city: infoFormulary?.step1?.city
            },
            payment: {
                type: selectedPayment?.toUpperCase(),
                value: 500000, // Valor fijo del congreso
                ...(selectedPayment === 'pse' && {
                    pse: {
                        bank: data.bank,
                        type_person: "natural"
                    }
                })
            }
        };

        try {
            const response = await fetch('https://gold-sheep-press.loca.lt/assistants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalFormData)
            });
    
            if (!response.ok) {
                throw new Error('Error en el registro');
            }
    
            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
            toast.success('Registro completado correctamente');
            
            // Opcional: Resetear el formulario o redirigir
            setStep(1);
            setSelectedPayment(null);
            setInfoFormulary(null);
            
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            toast.error('Error al procesar el registro. Por favor, intente nuevamente');
        }


        
        toast.success('Registro completado correctamente');
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
        distributorsOptions,
        proceduresOptions,
        brandOptions,
        banksOptions,
        documentTypeOptions,
        watch
    };
};

export default useRegisterForm;
