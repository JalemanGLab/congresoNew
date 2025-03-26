// src/pages/register/RegisterForm.tsx
"use client";
import useRegisterForm from "./useRegisterForm";
import {
  HiOutlineUser,
  HiOutlineQuestionMarkCircle,
  HiOutlineCreditCard,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineIdentification,
  HiOutlineLocationMarker,
  HiOutlineDocumentText,
  HiOutlineCalendar,
  HiOutlineLockClosed,
} from "react-icons/hi";
import { MdNumbers } from "react-icons/md";
import InputField from "../../../shared/inputField/InputField";
import SelectData from "../../../shared/selectData/SelectData";
import ProgressSteps from "../../../shared/processSteps/ProgressSteps";
import { Toaster } from "sonner";
import useModal from "@/components/shared/modal/useModal";

interface RegisterFormProps {
  closeModalAction: () => void;
}

const RegisterForm = ({ closeModalAction }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    errors,
    registerPayment,
    handleSubmitPayment,
    controlPayment,
    paymentErrors,
    step,
    setStep,
    selectedPayment,
    setSelectedPayment,
    handleStep1Submit,
    handleStep2Submit,
    handleStep3Submit,
    distributorsOptions,
    proceduresOptions,
    brandOptions,
    banksOptions,
    documentTypeOptions,
    isSubmitting,
    statusFinish,
    setStatusFinish,
  } = useRegisterForm();

  const steps = [1, 2, 3];

  return (
    <div className="w-full bg-white flex flex-col rounded-r-lg p-4 sm:p-6">
      {statusFinish === "success" && (
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
            <h3 className="text-lg font-medium text-black mb-3">Resumen de tu registro</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-sm font-medium text-black mb-2">Información Personal</h4>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-start">
                      <HiOutlineUser className="text-gray-700 mt-0.5 mr-2" />
                      <div>
                        <p className="text-xs text-black">Nombre completo</p>
                        <p className="text-sm font-medium text-black">{watch("first_name")} {watch("last_name")}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <HiOutlineMail className="text-gray-700 mt-0.5 mr-2" />
                      <div>
                        <p className="text-xs text-black">Correo electrónico</p>
                        <p className="text-sm font-medium text-black">{watch("email")}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <HiOutlinePhone className="text-gray-700 mt-0.5 mr-2" />
                      <div>
                        <p className="text-xs text-black">Teléfono</p>
                        <p className="text-sm font-medium text-black">{watch("phone")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-black mb-2">Información Profesional</h4>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-start">
                      <HiOutlineLocationMarker className="text-gray-700 mt-0.5 mr-2" />
                      <div>
                        <p className="text-xs text-black">Distribuidor</p>
                        <p className="text-sm font-medium text-black">{watch("distributor")}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <HiOutlineDocumentText className="text-gray-700 mt-0.5 mr-2" />
                      <div>
                        <p className="text-xs text-black">Procedimiento principal</p>
                        <p className="text-sm font-medium text-black">{watch("main_procedure")}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MdNumbers className="text-gray-700 mt-0.5 mr-2" />
                      <div>
                        <p className="text-xs text-black">Volumen de trabajo</p>
                        <p className="text-sm font-medium text-black">{watch("cases_per_week")} casos/semana</p>
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
                  <p className="text-sm font-medium text-black">{selectedPayment === "card" ? "Tarjeta de Crédito" : "PSE"}</p>
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
                Si no recibes el correo en los próximos minutos, revisa tu
                carpeta de spam o contáctanos para ayudarte.
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
      )}

      {statusFinish === "error" && (
        <div className="w-full bg-white border border-gray-200 p-8 rounded-xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                No se pudo completar el registro
              </h2>
              {(errors?.phone || errors?.email || errors?.id) && (
                <p className="text-sm text-gray-600 mt-1">
                  Ya existe un usuario con el {" "}
                  {errors?.phone && "número de teléfono ingresado"}
                  {errors?.email && "correo electrónico ingresado"}
                  {errors?.id && "número de identificación ingresado"}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="px-4 py-1 bg-[#00391c] text-white font-medium rounded-lg transition-colors"
              onClick={() => {
                setStatusFinish("not");
                setStep(1);
              }}
            >
              Volver a intentar
            </button>
          </div>
        </div>
      )}

      {statusFinish === "not" && (
        <>
          <Toaster position="top-right" />
          <div className="w-full mx-auto flex flex-col justify-center items-center rounded-lg gap-3 sm:gap-4 md:gap-5">
            <div className="text-xl sm:text-2xl text-[#031a10] text-center font-bold">
              {step === 1 && "Información Personal"}
              {step === 2 && "Información Profesional"}
              {step === 3 && "Método de Pago"}
            </div>

            <div className="w-full bg-white flex flex-col rounded-lg md:gap-4">
              <ProgressSteps currentStep={step} steps={steps} />

              {/* PASO 1: INFORMACIÓN PERSONAL */}
              {step === 1 && (
                <div className="w-full flex flex-col gap-2 md:gap-4 mt-4">
                  <div className="text-sm text-center text-[#A0A0A0]">
                    Por favor complete sus datos personales
                  </div>
                  <form
                    onSubmit={handleSubmit(handleStep1Submit)}
                    className="w-full flex flex-col gap-4 sm:gap-5 px-2 sm:px-4 md:px-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        name="first_name"
                        inputType="text"
                        placeholder="Nombre"
                        label="Nombre"
                        childrenIcon={
                          <HiOutlineUser className="text-xl sm:text-2xl" />
                        }
                        register={register}
                        errors={errors}
                        rules={{ required: true }}
                      />
                      <InputField
                        name="last_name"
                        inputType="text"
                        placeholder="Apellido"
                        label="Apellido"
                        childrenIcon={
                          <HiOutlineUser className="text-xl sm:text-2xl" />
                        }
                        register={register}
                        errors={errors}
                        rules={{
                          required: true,
                          minLength: 2,
                          pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
                        }}
                      />
                      <InputField
                        name="email"
                        inputType="email"
                        placeholder="correo@ejemplo.com"
                        label="Correo electrónico"
                        childrenIcon={
                          <HiOutlineMail className="text-xl sm:text-2xl" />
                        }
                        register={register}
                        errors={errors}
                        rules={{
                          required: true,
                          pattern:
                            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        }}
                      />
                      <InputField
                        name="id"
                        inputType="number"
                        placeholder="Número de cédula"
                        label="Cédula"
                        childrenIcon={
                          <HiOutlineIdentification className="text-xl sm:text-2xl" />
                        }
                        register={register}
                        errors={errors}
                        rules={{
                          required: true,
                          minLength: 6,
                          maxLength: 20,
                          pattern: /^[0-9]+$/,
                        }}
                      />
                      <InputField
                        name="phone"
                        inputType="tel"
                        placeholder="Número de teléfono"
                        label="Teléfono"
                        childrenIcon={
                          <HiOutlinePhone className="text-xl sm:text-2xl" />
                        }
                        register={register}
                        errors={errors}
                        rules={{
                          required: true,
                          pattern: /^[0-9]+$/,
                          minLength: 10,
                          maxLength: 10,
                        }}
                      />
                      <InputField
                        name="city"
                        inputType="text"
                        placeholder="Ciudad"
                        label="Ciudad"
                        childrenIcon={
                          <HiOutlineLocationMarker className="text-xl sm:text-2xl" />
                        }
                        register={register}
                        errors={errors}
                        rules={{
                          required: true,
                          minLength: 3,
                          pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="w-full flex flex-col-reverse sm:flex-row justify-end gap-3">
                        <button
                          type="submit"
                          className="w-full sm:w-[180px] md:w-[200px] h-[45px] sm:h-[50px] rounded-lg flex items-center justify-center gap-2 text-white border border-[#1E4D2B] bg-[#225d33]
                            hover:bg-[#1b4829] transition-all duration-300 text-sm font-medium cursor-pointer"
                        >
                          Continuar
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* PASO 2: INFORMACIÓN PROFESIONAL */}
              {step === 2 && (
                <div className="w-full flex flex-col gap-4 mt-4">
                  <div className="text-sm text-[#A0A0A0] text-center">
                    Por favor complete sus datos profesionales
                  </div>
                  <form
                    onSubmit={handleSubmit(handleStep2Submit)}
                    className="w-full flex flex-col gap-4 sm:gap-5 px-2 sm:px-4 md:px-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <SelectData
                        label="Redimir bono en"
                        options={distributorsOptions}
                        name="distributor"
                        errors={errors}
                        rules={{ required: true }}
                        control={control}
                      />
                      <SelectData
                        label="Procedimiento principal"
                        options={proceduresOptions}
                        name="main_procedure"
                        errors={errors}
                        rules={{ required: true }}
                        control={control}
                      />
                      <SelectData
                        label="Marca mas usada"
                        options={brandOptions}
                        name="brand"
                        errors={errors}
                        rules={{ required: true }}
                        control={control}
                      />
                      {watch("brand") === "otro" && (
                        <InputField
                          name="other_brand"
                          inputType="text"
                          placeholder="¿Cuál marca?"
                          label="Especifique la marca"
                          register={register}
                          errors={errors}
                          rules={{ required: true }}
                          childrenIcon={
                            <HiOutlineQuestionMarkCircle className="text-xl sm:text-2xl" />
                          }
                        />
                      )}
                      <InputField
                        name="cases_per_week"
                        inputType="number"
                        placeholder="Casos por semana"
                        label="Casos por semana"
                        childrenIcon={
                          <MdNumbers className="text-xl sm:text-2xl" />
                        }
                        register={register}
                        errors={errors}
                        rules={{
                          maxLength: 3,
                          required: true,
                          min: 0,
                          max: 100,
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-gray-700 block">
                        ¿Autorizas recibir información comercial?
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          {...register("comercialInfo")}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#225d33]"></div>
                        <span className="ms-3 text-sm text-gray-500">
                          Sí, acepto
                        </span>
                      </label>
                    </div>

                    <div className="w-full flex flex-col-reverse sm:flex-row justify-between gap-3 mt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-full sm:w-[180px] h-[45px] sm:h-[50px] bg-white border border-[#333333] text-[#333333] rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-all duration-300 text-sm font-medium cursor-pointer"
                      >
                        Volver
                      </button>
                      <button
                        type="submit"
                        className="w-full sm:w-[180px] md:w-[200px] h-[45px] sm:h-[50px] rounded-lg flex items-center justify-center gap-2 text-white border border-[#1E4D2B] bg-[#225d33]
                            hover:bg-[#1b4829] transition-all duration-300 text-sm font-medium cursor-pointer"
                      >
                        Continuar
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* PASO 3: MÉTODO DE PAGO */}
              {step === 3 && (
                <form
                  onSubmit={handleSubmitPayment(handleStep3Submit)}
                  className="w-full flex flex-col gap-4 mt-4 px-2 sm:px-4 md:px-6"
                >
                  <div className="text-sm text-center text-[#A0A0A0]">
                    Seleccione su método de pago preferido
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      className={`flex items-center justify-center p-4 sm:p-6 border-2 rounded-lg cursor-pointer transition-all
                        ${
                          selectedPayment === "card"
                            ? "border-green-800"
                            : "border-gray-200"
                        }
                      `}
                      onClick={() => setSelectedPayment("card")}
                    >
                      <div className="flex flex-col items-center">
                        <HiOutlineCreditCard className="text-3xl sm:text-4xl text-green-800" />
                        <span className="mt-2 text-green-800">
                          Targeta de Credito
                        </span>
                      </div>
                    </div>
                    <div
                      className={`flex items-center justify-center p-4 sm:p-6 border-2 rounded-lg cursor-pointer transition-all
                        ${
                          selectedPayment === "pse"
                            ? "border-green-800"
                            : "border-gray-200"
                        }
                      `}
                      onClick={() => setSelectedPayment("pse")}
                    >
                      <div className="flex flex-col items-center">
                        <HiOutlineDocumentText className="text-3xl sm:text-4xl text-green-800" />
                        <span className="mt-2 text-green-800">PSE</span>
                      </div>
                    </div>
                  </div>

                  {!selectedPayment && (
                    <div className="text-red-500 text-sm text-center">
                      Por favor seleccione un método de pago
                    </div>
                  )}

                  {selectedPayment === "card" && (
                    <div className="col-span-1 md:col-span-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                          name="card_name"
                          inputType="text"
                          placeholder="Nombre en la tarjeta"
                          label="Nombre en la tarjeta"
                          childrenIcon={
                            <HiOutlineUser className="text-xl sm:text-2xl" />
                          }
                          register={registerPayment}
                          errors={paymentErrors}
                          rules={{ required: true }}
                        />
                        <InputField
                          name="card_number"
                          inputType="text"
                          placeholder="XXXX XXXX XXXX XXXX"
                          label="Número de tarjeta"
                          childrenIcon={
                            <HiOutlineCreditCard className="text-xl sm:text-2xl" />
                          }
                          register={registerPayment}
                          errors={paymentErrors}
                          rules={{
                            required: true,
                            pattern: /^[0-9]{16}$/,
                            maxLength: 16,
                          }}
                        />
                        <InputField
                          name="expiry_date"
                          inputType="text"
                          placeholder="MM/AA"
                          label="Fecha de expiración"
                          childrenIcon={
                            <HiOutlineCalendar className="text-xl sm:text-2xl" />
                          }
                          register={registerPayment}
                          errors={paymentErrors}
                          rules={{
                            required: true,
                            pattern: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                          }}
                        />
                        <InputField
                          name="cvc"
                          inputType="text"
                          placeholder="CVC"
                          label="CVC"
                          childrenIcon={
                            <HiOutlineLockClosed className="text-xl sm:text-2xl" />
                          }
                          register={registerPayment}
                          errors={paymentErrors}
                          rules={{
                            required: true,
                            pattern: /^[0-9]{3,4}$/,
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-2 mt-4 text-gray-300 px-2 sm:px-4">
                        <HiOutlineLockClosed className="text-xs sm:text-sm" />
                        <span className="text-xs">
                          Sus datos de pago están seguros y encriptados
                        </span>
                      </div>
                    </div>
                  )}

                  {selectedPayment === "pse" && (
                    <div className="col-span-1 md:col-span-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectData
                          label="Seleccione su banco"
                          options={banksOptions}
                          name="bank"
                          errors={paymentErrors}
                          rules={{ required: true }}
                          control={controlPayment}
                        />
                        <SelectData
                          label="Tipo de documento"
                          options={documentTypeOptions}
                          name="document_type"
                          errors={paymentErrors}
                          rules={{ required: true }}
                          control={controlPayment}
                        />
                      </div>
                      <div className="flex items-center gap-2 mt-3 text-gray-400 px-2 sm:px-4">
                        <HiOutlineLockClosed className="text-xs sm:text-sm" />
                        <span className="text-xs">
                          Conexión segura con su entidad bancaria
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="w-full flex flex-col-reverse sm:flex-row justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full sm:w-[180px] md:w-[200px] h-[45px] sm:h-[50px] bg-white border border-[#333333] text-[#333333] rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-all duration-300 text-sm font-medium cursor-pointer"
                    >
                      Volver
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting || !selectedPayment}
                      className={`w-full sm:w-[180px] md:w-[200px] h-[45px] sm:h-[50px] rounded-lg flex items-center justify-center gap-2 text-white border border-[#1E4D2B] 
                        ${!selectedPayment ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#225d33] hover:bg-[#1b4829]'} 
                        transition-all duration-300 text-sm font-medium
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
                        "Completar registro"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterForm;
