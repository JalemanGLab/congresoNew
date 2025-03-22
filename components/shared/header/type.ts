import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface NavItem {
  name: string;
  href: string;
}

export interface DesktopHeaderProps {
  navItems: NavItem[];
}

export interface MobileHeaderProps {
  navItems: NavItem[];
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  router: AppRouterInstance;
}

export interface HeaderHookResult {
  router: AppRouterInstance;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  handleLoginClick: () => void;
  navItems: NavItem[];
}
