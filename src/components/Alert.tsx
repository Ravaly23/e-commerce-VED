import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { ReactNode } from "react";

interface AlertProps {
  icon?: ReactNode;
  title: string;
  description?: string;
}
export function AlertColors({ icon, title, description }: AlertProps) {
  return (
    <Alert variant="destructive" className="max-w-full my-3">
      {icon}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
