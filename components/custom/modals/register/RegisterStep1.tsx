import { HiOutlineUser, HiOutlineMail, HiOutlinePhone, HiOutlineIdentification, HiOutlineLocationMarker } from "react-icons/hi";
import InputField from "../../../shared/inputField/InputField";
import { UseFormRegister, UseFormHandleSubmit, FieldErrors } from "react-hook-form";

interface RegisterStep1Props {
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  errors: FieldErrors;
  handleStep1Submit: (data: any) => void;
}

const RegisterStep1 = ({
  register,
  handleSubmit,
  errors,
  handleStep1Submit,
}: RegisterStep1Props) => {
  return (
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
            childrenIcon={<HiOutlineUser className="text-xl sm:text-2xl" />}
            register={register}
            errors={errors}
            rules={{ required: true }}
          />
          <InputField
            name="last_name"
            inputType="text"
            placeholder="Apellido"
            label="Apellido"
            childrenIcon={<HiOutlineUser className="text-xl sm:text-2xl" />}
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
            childrenIcon={<HiOutlineMail className="text-xl sm:text-2xl" />}
            register={register}
            errors={errors}
            rules={{
              required: true,
              pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
            childrenIcon={<HiOutlinePhone className="text-xl sm:text-2xl" />}
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
  );
};

export default RegisterStep1;
