import {
  AlertDialog,
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
}

export function AlertDialogBasic({
  title,
  description,
  buttonContent,
  buttonCancel,
  buttonAction,
  action,
}: AlertDialogBasicProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <CiLogout className="text-black text-2xl" /> {buttonContent}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{buttonCancel}</AlertDialogCancel>
          {/* ✅ Button normal au lieu de AlertDialogAction */}
          <Button
            variant="destructive"
            onClick={() => {
              action?.();
            }}
          >
            {buttonAction}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// import { CiLogout } from "react-icons/ci";

// interface AlertDialogBasicProps {
//   title: string;
//   description: string;
//   buttonContent: string;
//   buttonCancel: string;
//   buttonAction: string;
//   action?: () => void;
// }

// export function AlertDialogBasic({
//   title,
//   description,
//   buttonContent,
//   buttonCancel,
//   buttonAction,
//   action,
// }: AlertDialogBasicProps) {
//   return (
//     <AlertDialog>
//       <AlertDialogTrigger asChild> 
//         <Button variant="outline"><CiLogout className="text-black text-2xl"/> {buttonContent}</Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>{title}</AlertDialogTitle>
//           <AlertDialogDescription>{description}</AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>{buttonCancel}</AlertDialogCancel>
//           <AlertDialogAction onClick={action}>{buttonAction}</AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }
