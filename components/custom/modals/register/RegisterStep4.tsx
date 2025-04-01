import { UseFormWatch } from "react-hook-form";
import { AlertCircle, CheckCircle2, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';

interface RegisterStep4Props {
  setStep: (step: number) => void;
  handleStep3Submit: () => void;
  isSubmitting: boolean;
  redirectUrl: string | null;
  watch: UseFormWatch<any>;
  registeredUser?: {
    first_name?: string;
    email?: string;
  };
  onClose?: () => void;
}

const RegisterStep4 = ({
  setStep,
  handleStep3Submit,
  isSubmitting,
  redirectUrl,
  watch,
  registeredUser,
  onClose
}: RegisterStep4Props) => {
  
  // Efecto para abrir automáticamente la URL de redirección en una nueva pestaña
  useEffect(() => {
    if (redirectUrl) {
      const newWindow = window.open(redirectUrl, '_blank');
      if (newWindow) newWindow.focus();
    }
  }, [redirectUrl]);

  // Si aún no hay URL de redirección, mostrar el resumen y confirmación
  if (!redirectUrl) {
    return (
      <div className="w-full flex flex-col gap-6 mt-4 px-2 sm:px-4 md:px-6">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-blue-600 w-5 h-5 mt-0.5" />
          <div>
            <p className="text-sm text-blue-900">
              A continuación serás redirigido a nuestra plataforma de pagos para completar
              tu inscripción. Por favor, ten a mano tu método de pago preferido.
            </p>
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={() => setStep(3)}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Volver
          </button>
          <button
            type="button"
            onClick={handleStep3Submit}
            disabled={isSubmitting}
            className={`px-6 py-2 bg-[#225d33] text-white rounded-lg hover:bg-[#1b4829] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Procesando...
              </span>
            ) : (
              'Continuar al pago'
            )}
          </button>
        </div>
      </div>
    );
  }

  // Si hay URL de redirección, mostrar la confirmación y redirección
  return (
    <div className="w-full flex flex-col gap-6 mt-4 px-2 sm:px-4 md:px-6">
      <div className="bg-green-50 border border-green-100 rounded-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-full flex flex-col justify-center items-center gap-2">
            <h2 className="text-xl font-semibold text-green-900">
              ¡Registro exitoso!
            </h2>
            <p className="text-sm text-green-700 mt-1">
              {registeredUser?.first_name
                ? `¡Hola ${registeredUser.first_name}! Tu registro ha sido exitoso.`
                : 'Tu registro ha sido exitoso.'}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-green-200 rounded-lg p-4">
            <div className="space-y-2 text-sm text-green-800">
              <div>
                Se ha abierto automáticamente una nueva pestaña con la plataforma de pago.
              </div>
              <div>
                Una vez verificada la transacción, recibirás un correo de confirmación en{' '}
                <span className="font-medium">
                  {registeredUser?.email || watch("email")}
                </span>
                {' '}con los detalles de acceso.
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="text-yellow-600 w-5 h-5 mt-0.5" />
            <div>
              <p className="text-sm text-yellow-800">
                Si la página de pago no se abrió automáticamente, por favor verifica que no esté bloqueada por tu navegador.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 bg-[#225d33] text-white rounded-lg hover:bg-[#1b4829] transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default RegisterStep4;
