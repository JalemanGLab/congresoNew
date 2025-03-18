"use client"

import Header from "@/components/header/header"
import HeroSection from "@/components/hero/hero-section"
import CountdownSection from "@/components/countdown/countdown-section"
import RegistrationSection from "@/components/registration/registration-section"
import EventSection from "@/components/event/event-section"
import AgendaSection from "@/components/agenda/agenda-section"
import SpeakersSection from "@/components/speakers/speakers-section"
import ProductsSection from "@/components/products/products-section"
import FaqSection from "@/components/faq/faq-section"
import NewsletterSection from "@/components/newsletter/newsletter-section"
import Footer from "@/components/footer/footer"

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

