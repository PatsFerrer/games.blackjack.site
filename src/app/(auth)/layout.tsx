import { Navbar } from "@/components";

export default function AuthLayout({ children }: {
  readonly children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}