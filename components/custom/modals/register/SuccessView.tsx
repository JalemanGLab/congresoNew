import { HiOutlineUser, HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineDocumentText, HiOutlineCreditCard } from "react-icons/hi";
import { MdNumbers } from "react-icons/md";
import { UseFormWatch } from "react-hook-form";

interface SuccessViewProps {
  watch: UseFormWatch<any>;
  closeModalAction: () => void;
}

const SuccessView = ({ watch, closeModalAction }: SuccessViewProps) => {
  return (
    <div className="w-full bg-white border border-gray-200 p-6 sm:p-8 rounded-xl shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-green-100 p-3 rounded-full">
          <svg
            className="w-6 h-6 text-green-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-black">
            ¡Registro Exitoso!
          </h2>
          <p className="text-sm text-black mt-1">
            Recibirás un correo con la información detallada
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-medium text-black mb-3">
          Resumen de tu registro
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="text-sm font-medium text-black mb-2">
              Información Personal
            </h4>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex flex-col space-y-3">
                <div className="flex items-start">
                  <HiOutlineUser className="text-gray-700 mt-0.5 mr-2" />
                  <div>
                    <p className="text-xs text-black">Nombre completo</p>
                    <p className="text-sm font-medium text-black">
                      {watch("first_name")} {watch("last_name")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <HiOutlineMail className="text-gray-700 mt-0.5 mr-2" />
                  <div>
                    <p className="text-xs text-black">Correo electrónico</p>
                    <p className="text-sm font-medium text-black">
                      {watch("email")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <HiOutlinePhone className="text-gray-700 mt-0.5 mr-2" />
                  <div>
                    <p className="text-xs text-black">Teléfono</p>
                    <p className="text-sm font-medium text-black">
                      {watch("phone")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-black mb-2">
              Información Profesional
            </h4>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex flex-col space-y-3">
                <div className="flex items-start">
                  <HiOutlineLocationMarker className="text-gray-700 mt-0.5 mr-2" />
                  <div>
                    <p className="text-xs text-black">Distribuidor</p>
                    <p className="text-sm font-medium text-black">
                      {watch("distributor")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <HiOutlineDocumentText className="text-gray-700 mt-0.5 mr-2" />
                  <div>
                    <p className="text-xs text-black">Procedimiento principal</p>
                    <p className="text-sm font-medium text-black">
                      {watch("main_procedure")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MdNumbers className="text-gray-700 mt-0.5 mr-2" />
                  <div>
                    <p className="text-xs text-black">Volumen de trabajo</p>
                    <p className="text-sm font-medium text-black">
                      {watch("cases_per_week")} casos/semana
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border-2 border-green-100 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-medium text-black">Valor del boleto</h4>
            <span className="text-lg font-bold text-green-800">$500.000 COP</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-green-100 p-1.5 rounded-full">
              <HiOutlineCreditCard className="text-green-700 text-sm" />
            </div>
            <div>
              <p className="text-xs text-black">Método de pago</p>
              <p className="text-sm font-medium text-black">
                {watch("card") ? "Tarjeta de Crédito" : "PSE"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 bg-gray-100 p-4 rounded-lg mb-6">
        <svg
          className="w-5 h-5 text-gray-700 mt-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <p className="text-sm text-black">
            Si no recibes el correo en los próximos minutos, revisa tu carpeta de
            spam o contáctanos para ayudarte.
          </p>
          <p className="text-sm font-medium text-black mt-2">
            ¡Gracias por registrarte! Te esperamos en el evento.
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-[#00391c] text-white font-medium rounded-lg transition-colors hover:bg-[#002713]"
          onClick={closeModalAction}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default SuccessView;
