
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import BottomNavigation from "./BottomNavigation";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  hideNavigation?: boolean;
}

const PageContainer = ({ children, className, hideNavigation = false }: PageContainerProps) => {
  return (
    <div className={cn("min-h-screen pb-20", className)}>
      {children}
      {!hideNavigation && <BottomNavigation />}
    </div>
  );
};

export default PageContainer;
