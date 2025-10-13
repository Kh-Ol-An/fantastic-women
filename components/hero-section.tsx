"use client"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="/fantastic-women.jpg" alt="Фантастичні Жінки" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/60 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in-up">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="relative">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 md:-top-6 lg:top-1 lg:right-24 inline-flex items-center gap-2 bg-card/90 backdrop-blur-sm px-2.5 py-1 rounded-sm shadow-sm">
                  <img className="w-4 h-4 text-primary fill-primary" src="/group.svg" alt="Іконка група жінок" />
                  <span className="text-[11px] sm:text-xs font-medium text-card-foreground tracking-wide sm:tracking-normal">Громадська організація</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white text-balance leading-tight">Фантастичні Жінки</h1>
          </div>

          <p className="text-2xl md:text-3xl text-white/95 font-light text-balance">
            Психологічна підтримка та розвиток жінок
          </p>

          <div className="pt-4">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="text-lg px-8 py-6 bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Приєднатися
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  )
}
