import React from 'react';
import { Controller } from 'react-hook-form';
import { SelectDataProps } from './type';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const SelectData: React.FC<SelectDataProps> = ({
    label,
    options,
    name,
    icon: Icon,
    errors,
    rules,
    control
}) => {
    return (
      <div className="w-full">
         <label className="text-sm text-gray-500 font-normal">{label}</label>
         <div className="relative">
            {Icon && (
               <Icon className="text-xl absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            )}
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <Select
                        onValueChange={field.onChange}
                        value={field.value}
                    >
                        <SelectTrigger className={`bg-white text-black h-[40px] outline-none shadow-none rounded-[5px] ${Icon ? 'pl-10' : 'pl-2'} ${errors?.[name] ? 'border-red-500' : 'border-gray-300'}`}>
                            <SelectValue placeholder="Seleccione una opción" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-none">
                            <SelectGroup className="bg-white text-black">
                                <SelectLabel>{label}</SelectLabel>
                                {options.map((option) => (
                                    <SelectItem key={option.value} value={option.value} className="text-black bg-white">
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
            />
         </div>
      </div>
    );
};

export default SelectData;