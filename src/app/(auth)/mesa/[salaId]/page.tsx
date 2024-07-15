import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Mesa } from "@/components";

export default async function Sala({ params }: { params: { salaId: string } }) {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <Mesa salaId={params.salaId}/>
  );
}
