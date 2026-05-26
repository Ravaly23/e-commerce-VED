import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CiLogout } from "react-icons/ci";

interface AlertDialogBasicProps {
  title: string;
  description: string;
  buttonContent: string;
  buttonCancel: string;
  buttonAction: string;
  action?: () => void;
  styleLink?: boolean;
  className?: string;
}

export function AlertDialogBasic({
  title,
  description,
  buttonContent,
  buttonCancel,
  buttonAction,
  action,
  styleLink,
  className,
}: AlertDialogBasicProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild> 
       {
       styleLink ? 
       <Button  className={className} title={title}><CiLogout className="text-gray-900 text-2xl"/> {buttonContent}</Button> 
       : 
       <Button variant="default" className="hover:cursor-pointer" title=""><CiLogout className="text-black text-2xl"/> {buttonContent}</Button>
       } 
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:cursor-pointer">{buttonCancel}</AlertDialogCancel>
          <AlertDialogAction onClick={action} className="hover:cursor-pointer">{buttonAction}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
