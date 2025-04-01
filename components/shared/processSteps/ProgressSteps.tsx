"use client";

import React from "react";
import { HiOutlineClipboardList, HiOutlineUser, HiOutlineCreditCard } from "react-icons/hi";
import { FaUserShield } from "react-icons/fa";
import { ProgressStepsProps } from "./type";
import { useProgress } from "./useProgress";

const ProgressSteps: React.FC<ProgressStepsProps> = (props) => {
  const { currentStep, steps, onStepClick } = props;

  const icons = {
    1: <HiOutlineUser className="w-6 h-6" />,
    2: <FaUserShield className="w-6 h-6" />,
    3: <HiOutlineClipboardList className="w-6 h-6" />,
    4: <HiOutlineCreditCard className="w-6 h-6" />
  };

  const labelSteps: Record<number, string> = {
    1: "Datos personales",
    2: "Datos profesionales",
    3: "Confirmación de datos",
    4: "Proceso de pago"
  }

  const { stepIcons, isClickable, progressWidth } = useProgress({
    ...props,
    icons
  });

  return (
    <div className="w-full flex justify-center items-center">
      <div className="relative flex items-center justify-between w-full max-w-xl ">
        <div className="absolute h-1 top-6 left-0 right-0 mr-10 ml-10 bg-[#E5E5E5]" />
        <div
          className="absolute h-1 top-6 left-0 bg-[#00391c] transition-all duration-300 ml-7"
          style={{ width: progressWidth }}
        ></div>

        {steps.map((stepNumber) => (
          <div key={stepNumber} className="flex flex-col items-center z-10">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-medium text-base
                ${currentStep >= stepNumber
                  ? "bg-gradient-to-b from-[#00391c] to-[#002713] text-white"
                  : "bg-[#E5E5E5] text-[#666666]"}
                transition-all duration-300 ${isClickable(stepNumber) ? "cursor-pointer" : ""}`}
              onClick={() => isClickable(stepNumber) && onStepClick?.(stepNumber)}
              role={isClickable(stepNumber) ? "button" : undefined}
              tabIndex={isClickable(stepNumber) ? 0 : undefined}
              aria-label={isClickable(stepNumber) ? `Ir al paso ${stepNumber}: ${[stepNumber]}` : undefined}
            >
              {stepIcons[stepNumber]}
            </div>

            <span
              className={`hidden lg:block text-xs mt-2 font-medium ${currentStep >= stepNumber ? "text-[#00391c]" : "text-[#666666]"}`}
            >
             {labelSteps[stepNumber]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;
