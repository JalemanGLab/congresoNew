import { ReactNode } from "react";

export interface ProgressStepsProps {
  currentStep: number;
  steps: number[];
  onStepClick?: (step: number) => void;
  allowNavigation?: boolean;
}

export interface UseProgressProps extends ProgressStepsProps {
  icons: Record<number, ReactNode>;
}

export interface UseProgressReturn {
  stepIcons: Record<number, ReactNode>;
  isClickable: (step: number) => boolean;
  progressWidth: string;
}
