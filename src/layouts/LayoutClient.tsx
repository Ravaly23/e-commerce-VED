import NavConnected from "@/components/NavConnected";
import type { ReactNode } from "react";
export default function LayoutClient({children} :{children : ReactNode}) {
  return (
    <>
      <header>
        <NavConnected />
      </header>

      <main>
        {children}
      </main>
    </>
  );
}
