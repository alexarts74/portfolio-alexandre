import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Presentation from "./components/Presentation";
import ProjectsGrid from "./components/ProjectsGrid";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <Presentation />
        <ProjectsGrid />
        <Skills />
      </main>
      <Footer />
    </>
  );
}
