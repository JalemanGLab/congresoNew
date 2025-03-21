"use client"

import Header from "@/components/pages/home/header/header"
import HeroSection from "@/components/pages/home/hero/hero-section"
import CountdownSection from "@/components/pages/home/countdown/countdown-section"
import RegistrationSection from "@/components/pages/home/registration/registration-section"
import EventSection from "@/components/pages/home/event/event-section"
import AgendaSection from "@/components/pages/home/agenda/agenda-section"
import SpeakersSection from "@/components/pages/home/speakers/speakers-section"
import ProductsSection from "@/components/pages/home/products/products-section"
import FaqSection from "@/components/pages/home/faq/faq-section"
import NewsletterSection from "@/components/pages/home/newsletter/newsletter-section"
import Footer from "@/components/pages/home/footer/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#001208] to-[#001810]">
      {/* Header/Navigation */}
      <Header />

      <main className="flex-1">
        {/* Hero Banner with Slider */}
        <HeroSection />

        {/* Countdown Timer Section */}
        <CountdownSection />

        {/* Event Registration CTA with Event Info */}
        <RegistrationSection />

        {/* Event Summary with Map */}
        <EventSection />

        {/* Agenda Section */}
        <AgendaSection />

        {/* Speakers Section */}
        <SpeakersSection />

        {/* Products Section */}
        <ProductsSection />

        {/* FAQ Section */}
        <FaqSection />

        {/* Newsletter Section */}
        <NewsletterSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

