import CTA from "@/components/home/CTA";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/home/Navbar";
import Problems from "@/components/home/Problems";
import Solutions from "@/components/home/Solutions";
import Stats from "@/components/home/Stats";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problems />
      <Solutions />
      <Stats />
      <CTA />
      <Footer />
    </>
  );
}
