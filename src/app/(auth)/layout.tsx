import { Navbar } from "@/components";
import { EventosProvider } from "@/context/EventosContext";

export default function AuthLayout({ children }: {
  readonly children: React.ReactNode;
}) {
  return (
    <EventosProvider>
      <div className="grid grid-rows-layout min-h-screen">
        <Navbar />
        {children}
      </div>
    </EventosProvider>
  );
}