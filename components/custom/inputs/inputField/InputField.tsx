import React from 'react';
import { InputFieldProps } from './type';

const InputField: React.FC<InputFieldProps> = ({
    name,
    inputType = "text",
    register,
    childrenIcon,
    onChange,
    errors,
    rules,
    placeholder,
    label
}) => {
    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-sm text-gray-500 font-normal">{label}</label>}
            <div className="relative w-full h-[40px]">
                <input
                    {...register(name, rules)}
                    type={inputType}
                    placeholder={placeholder}
                    onChange={onChange}
                    autoComplete="off"
                    className={`absolute top-0 bg-white text-black left-0 w-full h-full outline-none rounded-[5px] pl-10 pr-3 
                        border ${errors?.[name] ? 'border-red-500' : 'border-gray-300'}`}
                />
                {childrenIcon && (
                    <div className="absolute top-0 left-0 w-10 h-full flex items-center justify-center text-gray-400">
                        {childrenIcon} {/* Recomendado el tamaño 2xl para los iconos */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InputField;