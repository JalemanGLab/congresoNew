"use client";

import Header from "@/components/pages/home/header/header";
import HeroSection from "@/components/pages/home/hero/hero-section";
import CountdownSection from "@/components/pages/home/countdown/countdown-section";
import RegistrationSection from "@/components/pages/home/registration/registration-section";
import EventSection from "@/components/pages/home/event/event-section";
import AgendaSection from "@/components/pages/home/agenda/agenda-section";
import SpeakersSection from "@/components/pages/home/speakers/speakers-section";
import ProductsSection from "@/components/pages/home/products/products-section";
import FaqSection from "@/components/pages/home/faq/faq-section";
import Footer from "@/components/pages/home/footer/footer";
import WhatsappButton from "@/components/whatsapp-button";
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#003027]">
      {/* Header/Navigation */}
      <WhatsappButton />
      <Header />

      <main className="flex-1">
        {/* Hero Banner with Slider */}
        <HeroSection />

        {/* Event Registration CTA with Event Info */}
        <RegistrationSection />

        {/* Speakers Section */}
        <SpeakersSection />

        {/* Agenda Section */}
        <AgendaSection />

        {/* Event Summary with Map */}
        <EventSection  />

        {/* Products Section */}
        <ProductsSection  />

        {/* FAQ Section */}
        <FaqSection />

        {/* Countdown Timer Section */}
        <CountdownSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
