import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { About } from "@/components/sections/About";
import { Expertise } from "@/components/sections/Expertise";
import { Projects } from "@/components/sections/Projects";
import { Toolkit } from "@/components/sections/Toolkit";
import { Education, Training } from "@/components/sections/Journey";
import { Credentials } from "@/components/sections/Credentials";
import { SoftSkills } from "@/components/sections/SoftSkills";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <About />
      <Expertise />
      <Projects />
      <Toolkit />
      <Training />
      <Education />
      <Credentials />
      <SoftSkills />
      <Contact />
    </>
  );
}
