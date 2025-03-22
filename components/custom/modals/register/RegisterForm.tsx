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

const RegisterForm = () => {
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
  } = useRegisterForm();

  const steps = [1, 2, 3];

  return (
    <div className="w-full bg-white flex flex-col rounded-r-lg p-4 sm:p-6">
      {statusFinish && (
        <div className="w-full bg-green-500 text-white p-4 rounded-lg">
          <h2 className="text-lg font-bold">¡Registro completado!</h2>
          <p className="text-sm">
            Gracias por registrarte en nuestro programa.
          </p>
        </div>
      )}

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
                    childrenIcon={<MdNumbers className="text-xl sm:text-2xl" />}
                    register={register}
                    errors={errors}
                    rules={{ maxLength: 3, required: true, min: 0, max: 100 }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("authorization")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#225d33]"></div>
                    <span className="ms-3 text-sm font-medium text-gray-600">
                      ¿Autorizas recibir información comercial?
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
                  disabled={isSubmitting}
                  className={`w-full sm:w-[180px] md:w-[200px] h-[45px] sm:h-[50px] rounded-lg flex items-center justify-center gap-2 text-white border border-[#1E4D2B] bg-[#225d33]
                        hover:bg-[#1b4829] transition-all duration-300 text-sm font-medium cursor-pointer
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
    </div>
  );
};

export default RegisterForm;
