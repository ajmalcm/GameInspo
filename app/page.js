import About from "@/components/About";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-zinc-600">
    <NavBar/>
      <Hero/>
      <About/>
    </main>
  );
}
