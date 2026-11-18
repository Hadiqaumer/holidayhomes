import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Solutions, Why, Industries, How, Faq, Footer } from "@/components/Sections";
import Journey from "@/components/Journey";
import About from "@/components/About";
import Services from "@/components/Services";
import IndustryStrip from "@/components/IndustryStrip";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
       <IndustryStrip />
       <About />
       <Services />
      <Journey />
      <Solutions />
      <Why />
      <Industries />
      <How />
      <Faq />
      <ContactForm />
      <Footer />
    </main>
  );
}