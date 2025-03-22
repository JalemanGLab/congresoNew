"use client";

import { UseProgressProps, UseProgressReturn } from "./type";

export function useProgress({
  currentStep,
  steps,
  onStepClick,
  allowNavigation = false,
  icons
}: UseProgressProps): UseProgressReturn {
  //iconos pasados como parametro
  const stepIcons = icons;

  // determinar si un paso es clickeable
  const isClickable = (step: number): boolean => !!(allowNavigation && onStepClick && step <= currentStep);

  //porcentaje de progreso para la barra
  const progressWidth = `${((currentStep - 1) / (steps.length - 1)) * 85}%`;

  return {
    stepIcons,
    isClickable,
    progressWidth
  };
}
