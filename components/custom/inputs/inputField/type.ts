import { FieldErrors, UseFormRegister, RegisterOptions } from "react-hook-form";

export interface InputFieldProps {
   name: string;
   inputType?: string;
   register: UseFormRegister<any>;
   childrenIcon?: React.ReactNode;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   errors: FieldErrors<any>;
   rules?: RegisterOptions;
   placeholder?: string;
   label?: string;
}