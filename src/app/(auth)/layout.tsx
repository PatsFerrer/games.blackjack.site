import { Navbar } from "@/components";
import { EventosProvider } from "@/context/EventosContext";

export default function AuthLayout({ children }: {
  readonly children: React.ReactNode;
}) {
  return (
      <EventosProvider>
        <Navbar />
        {children}
      </EventosProvider>
  );
}