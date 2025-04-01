// src/pages/register/RegisterForm.tsx
"use client";
import { useEffect } from "react";
import useRegisterForm from "./useRegisterForm";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";
import RegisterStep4 from "./RegisterStep4";
import ProgressSteps from "../../../shared/processSteps/ProgressSteps";
import { Toaster } from "sonner";
import SuccessView from "./SuccessView";
import ErrorView from "./ErrorView";

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
    step,
    setStep,
    handleStep1Submit,
    handleStep2Submit,
    handleStep3Submit,
    distributorsOptions,
    proceduresOptions,
    brandOptions,
    documentTypeOptions,
    isSubmitting,
    statusFinish,
    setStatusFinish,
    redirectUrl,
    redirectToPayment,
    registeredUser,
    isClient,
  } = useRegisterForm();

  const steps = [1, 2, 3, 4];

  // No renderizar nada hasta que estemos en el cliente
  if (!isClient) {
    return <div className="min-h-[400px]"></div>;
  }

  return (
    <div className="w-full bg-white flex flex-col rounded-r-lg p-4 sm:p-6">
      <Toaster position="top-right" />

      {statusFinish === "success" && (
        <SuccessView watch={watch} closeModalAction={closeModalAction} />
      )}

      {statusFinish === "error" && (
        <ErrorView
          errors={errors}
          setStatusFinish={setStatusFinish}
          setStep={setStep}
        />
      )}

      {statusFinish === "not" && (
        <div className="w-full mx-auto flex flex-col justify-center items-center rounded-lg gap-3 sm:gap-4 md:gap-5">
          <div className="text-xl sm:text-2xl text-[#031a10] text-center font-bold">
            {step === 1 && "Información Personal"}
            {step === 2 && "Información Profesional"}
            {step === 3 && "Resumen y Confirmación"}
            {step === 4 && "Confirmación de Pago"}
          </div>

          <div className="w-full bg-white flex flex-col rounded-lg md:gap-4">
            {/* Mostrar los pasos solo si no estamos en el resumen */}
            {step < 5 && <ProgressSteps currentStep={step} steps={steps} />}

            {step === 1 && (
              <RegisterStep1
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                handleStep1Submit={handleStep1Submit}
              />
            )}

            {step === 2 && (
              <RegisterStep2
                register={register}
                handleSubmit={handleSubmit}
                control={control}
                errors={errors}
                handleStep2Submit={handleStep2Submit}
                setStep={setStep}
                distributorsOptions={distributorsOptions}
                proceduresOptions={proceduresOptions}
                brandOptions={brandOptions}
                watch={watch}
              />
            )}

            {step === 3 && (
              <RegisterStep3
                watch={watch}
                setStep={setStep}
                handleStep3Submit={handleStep3Submit}
                isSubmitting={isSubmitting}
              />
            )}

            {step === 4 && (
              <RegisterStep4
                setStep={setStep}
                handleStep3Submit={handleStep3Submit}
                isSubmitting={isSubmitting}
                redirectUrl={redirectUrl}
                watch={watch}
                registeredUser={registeredUser}
                onClose={closeModalAction}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
