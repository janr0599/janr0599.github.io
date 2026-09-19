import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { ArchitectureGrid } from "@/components/architecture-grid";
import { ArchitectureDiagrams } from "@/components/architecture-diagrams";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ArchitectureGrid />
        <ArchitectureDiagrams />
      </main>
      <Footer />
    </>
  );
}
