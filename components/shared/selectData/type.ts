import { FieldErrors, Control } from "react-hook-form";

export interface SelectDataProps {
   label: string;
   options: { value: string; label: string }[];
   name: string;
   icon?: React.ElementType;
   errors: FieldErrors<any>;
   rules?: any;
   control: Control<any>;
}