import { FieldErrors } from "react-hook-form";

interface ErrorViewProps {
  errors: FieldErrors;
  setStatusFinish: (status: "success" | "error" | "not") => void;
  setStep: (step: number) => void;
}

const ErrorView = ({ errors, setStatusFinish, setStep }: ErrorViewProps) => {
  return (
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
              Ya existe un usuario con el{" "}
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
  );
};

export default ErrorView;
