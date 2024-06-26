import { ISala } from "@/interface/ISala";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  let salas: ISala[] = [];
  try {
    const res = await fetch("https://66718da9e083e62ee43c1800.mockapi.io/salas-disponiveis/salas", { method: "GET" });
    salas = await res.json();
  } catch (error) {
    console.error("Failed to fetch salas", error);
  }

  return (
    <div className="p-14 flex flex-col min-h-screen bg-primary">
      <HomeClient salas={salas} />
    </div>
  );
}
