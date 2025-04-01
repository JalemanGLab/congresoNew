import { HiOutlineUser, HiOutlineMail, HiOutlinePhone, HiOutlineIdentification, HiOutlineLocationMarker, HiOutlineDocumentText, HiOutlineCreditCard, HiOutlineBadgeCheck } from "react-icons/hi";
import { MdNumbers } from "react-icons/md";
import { TbDental } from "react-icons/tb";
import { UseFormWatch } from "react-hook-form";

interface RegisterStep3Props {
  watch: UseFormWatch<any>;
  setStep: (step: number) => void;
  handleStep3Submit: () => void;
  isSubmitting: boolean;
}

const RegisterStep3 = ({
  watch,
  setStep,
  handleStep3Submit,
  isSubmitting,
}: RegisterStep3Props) => {
  return (
    <div className="w-full flex flex-col gap-5 mt-4 px-2 sm:px-4 md:px-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800">Resumen de Registro</h3>
        <div className="mt-1 text-sm text-[#707070]">
          Revise su información antes de procesar el pago
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-2">
        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 transition-all hover:shadow-lg">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-[#E8F5E9] rounded-lg">
              <HiOutlineUser className="text-[#225d33] text-lg" />
            </div>
            <h4 className="text-sm font-semibold text-gray-800 ml-2">
              Información Personal
            </h4>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex items-start border-b border-gray-100 pb-2">
              <div className="min-w-[24px] flex justify-center">
                <HiOutlineMail className="text-gray-500 mt-0.5" />
              </div>
              <div className="ml-2">
                <p className="text-xs text-gray-500">Correo electrónico</p>
                <p className="text-sm font-medium text-gray-800">
                  {watch("email")}
                </p>
              </div>
            </div>
            <div className="flex items-start border-b border-gray-100 pb-2">
              <div className="min-w-[24px] flex justify-center">
                <HiOutlinePhone className="text-gray-500 mt-0.5" />
              </div>
              <div className="ml-2">
                <p className="text-xs text-gray-500">Teléfono</p>
                <p className="text-sm font-medium text-gray-800">
                  {watch("phone")}
                </p>
              </div>
            </div>
            <div className="flex items-start border-b border-gray-100 pb-2">
              <div className="min-w-[24px] flex justify-center">
                <HiOutlineIdentification className="text-gray-500 mt-0.5" />
              </div>
              <div className="ml-2">
                <p className="text-xs text-gray-500">Cédula</p>
                <p className="text-sm font-medium text-gray-800">{watch("id")}</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="min-w-[24px] flex justify-center">
                <HiOutlineBadgeCheck className="text-gray-500 mt-0.5" />
              </div>
              <div className="ml-2">
                <p className="text-xs text-gray-500">Nombre completo</p>
                <p className="text-sm font-medium text-gray-800">
                  {watch("first_name")} {watch("last_name")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 transition-all hover:shadow-lg">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-[#E8F5E9] rounded-lg">
              <HiOutlineDocumentText className="text-[#225d33] text-lg" />
            </div>
            <h4 className="text-sm font-semibold text-gray-800 ml-2">
              Información Profesional
            </h4>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex items-start border-b border-gray-100 pb-2">
              <div className="min-w-[24px] flex justify-center">
                <HiOutlineLocationMarker className="text-gray-500 mt-0.5" />
              </div>
              <div className="ml-2">
                <p className="text-xs text-gray-500">Distribuidor</p>
                <p className="text-sm font-medium text-gray-800">
                  {watch("distributor")}
                </p>
              </div>
            </div>
            <div className="flex items-start border-b border-gray-100 pb-2">
              <div className="min-w-[24px] flex justify-center">
                <TbDental className="text-gray-500 mt-0.5" />
              </div>
              <div className="ml-2">
                <p className="text-xs text-gray-500">Marca más utilizada</p>
                <p className="text-sm font-medium text-gray-800">
                  {watch("brand")}
                </p>
              </div>
            </div>
            <div className="flex items-start border-b border-gray-100 pb-2">
              <div className="min-w-[24px] flex justify-center">
                <HiOutlineDocumentText className="text-gray-500 mt-0.5" />
              </div>
              <div className="ml-2">
                <p className="text-xs text-gray-500">Procedimiento principal</p>
                <p className="text-sm font-medium text-gray-800">
                  {watch("main_procedure")}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="min-w-[24px] flex justify-center">
                <MdNumbers className="text-gray-500 mt-0.5" />
              </div>
              <div className="ml-2">
                <p className="text-xs text-gray-500">Volumen de trabajo</p>
                <p className="text-sm font-medium text-gray-800">
                  {watch("cases_per_week")} casos/semana
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-md border-2 border-[#C8E6C9] flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center justify-center gap-3 mb-3 sm:mb-0">
          <div className="p-2 bg-[#E8F5E9] rounded-lg">
            <HiOutlineCreditCard className="text-[#225d33] text-xl" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Valor a pagar</p>
            <h4 className="text-lg font-semibold text-gray-800">Boleto de entrada</h4>
          </div>
        </div>
        <span className="text-xl font-bold text-[#225d33] bg-[#E8F5E9] px-4 py-2 rounded-lg">
          $500.000 COP
        </span>
      </div>

      <div className="w-full flex flex-col-reverse sm:flex-row justify-between gap-3 mt-2">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="w-full sm:w-[180px] h-[45px] sm:h-[50px] bg-white border border-gray-300 text-gray-700 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-all duration-300 text-sm font-medium cursor-pointer"
        >
          Volver
        </button>

        <button
          type="button"
          onClick={handleStep3Submit}
          disabled={isSubmitting}
          className={`w-full sm:w-[180px] md:w-[200px] h-[45px] sm:h-[50px] rounded-xl flex items-center justify-center gap-2 text-white border border-[#1E4D2B] bg-[#225d33] hover:bg-[#1b4829] transition-all duration-300 text-sm font-medium
            ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Procesando...
            </>
          ) : (
            "Procesar pago"
          )}
        </button>
      </div>
    </div>
  );
};

export default RegisterStep3;
