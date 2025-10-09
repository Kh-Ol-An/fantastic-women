"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Card className="p-8 md:p-12 bg-card border-border/50 shadow-lg">
            <div className="space-y-6">
              <div className="inline-block">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">Про нас</h2>
                <div className="h-1 w-24 bg-primary mt-4 rounded-full" />
              </div>

              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed text-pretty">
                Громадська організація, створена сім'єю, що щонеділі збирає учасниць для спільного розвитку, підтримки,
                тренінгів і культурних подій. Кілька разів на рік ми запрошуємо зірок естради та шоу-бізнесу для
                масштабних зустрічей.
              </p>

              <div className="grid md:grid-cols-3 gap-6 pt-8">
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-primary">100+</div>
                  <div className="text-sm text-muted-foreground">Учасниць</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-primary">52</div>
                  <div className="text-sm text-muted-foreground">Зустрічі на рік</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-primary">10+</div>
                  <div className="text-sm text-muted-foreground">Років досвіду</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
