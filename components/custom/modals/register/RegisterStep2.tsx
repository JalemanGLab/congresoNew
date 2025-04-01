import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { MdNumbers } from "react-icons/md";
import InputField from "../../../shared/inputField/InputField";
import SelectData from "../../../shared/selectData/SelectData";
import { UseFormRegister, UseFormHandleSubmit, FieldErrors, Control, UseFormWatch } from "react-hook-form";

interface RegisterStep2Props {
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  control: Control<any>;
  errors: FieldErrors;
  handleStep2Submit: (data: any) => void;
  setStep: (step: number) => void;
  distributorsOptions: any[];
  proceduresOptions: any[];
  brandOptions: any[];
  watch: UseFormWatch<any>;
}

const RegisterStep2 = ({
  register,
  handleSubmit,
  control,
  errors,
  handleStep2Submit,
  setStep,
  distributorsOptions,
  proceduresOptions,
  brandOptions,
  watch,
}: RegisterStep2Props) => {
  return (
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
            <span className="ms-3 text-sm text-gray-500">Sí, acepto</span>
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
  );
};

export default RegisterStep2;
