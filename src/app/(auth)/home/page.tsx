import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { HomeClient } from "@/components";
import { ISala } from "@/interface/ISala";

export default async function Home() {

  const session = await getServerSession();

  if (!session) {
    redirect('/')
  }

  let salas: ISala[] = [];
  try {
    const res = await fetch(`${process.env.API_URL}/salas`, { method: "GET" });
    salas = await res.json();
  } catch (error) {
    console.error("Failed to fetch salas", error);
  }

  return (
    <div className="p-14 flex flex-col min-h-screen bg-secondary">
      <HomeClient salas={salas} />
    </div>
  );
}
