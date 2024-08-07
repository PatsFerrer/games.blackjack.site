import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import HomeClient from "./components/HomeClient";
import { ISala } from "@/interface";

export const dynamic = 'force-dynamic'

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
    <div className="p-4 flex flex-col h-full bg-secondary">
      <HomeClient salas={salas} />
    </div>
  );
}
