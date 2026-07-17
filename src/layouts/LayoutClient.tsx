import NavConnected from "@/components/NavConnected";
import { type ReactNode } from "react";
export default function LayoutClient({
  favCount,
  children,
}: {
  children: ReactNode;
  favCount?: number;
}) {
  return (
    <>
      <header>
        <NavConnected favoritesCount={favCount} />
      </header>

      <main>{children}</main>
    </>
  );
}
