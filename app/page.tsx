import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Presentation from "./components/Presentation";
import FeaturedProject from "./components/FeaturedProject";
import ProjectsGrid from "./components/ProjectsGrid";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import { ParticleOverlay } from "./components/ParticleOverlay";

export default function Home() {
  return (
    <>
      <ParticleOverlay />
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <Presentation />
        <FeaturedProject />
        <ProjectsGrid />
        <Skills />
      </main>
      <Footer />
    </>
  );
}
