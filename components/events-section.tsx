"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Calendar } from "lucide-react"

const events = [
  {
    title: "Щотижнева зустріч",
    date: "Кожної неділі",
    image: "/women-gathering-workshop-creative-activities.jpg",
    description: "Регулярні зустрічі для спілкування, підтримки та розвитку",
  },
  {
    title: "Майстер-клас з арт-терапії",
    date: "Березень 2024",
    image: "/art-therapy-workshop-women-painting.jpg",
    description: "Творчий підхід до психологічного здоров'я",
  },
  {
    title: "Зустріч зі зіркою",
    date: "Квітень 2024",
    image: "/celebrity-event-stage-performance-audience.jpg",
    description: "Спеціальна подія з відомою особистістю",
  },
  {
    title: "Літній ретрит",
    date: "Червень 2024",
    image: "/women-retreat-nature-meditation-wellness.jpg",
    description: "Відпочинок та відновлення на природі",
  },
]

export function EventsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
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
          className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Події та зустрічі</h2>
            <p className="text-lg text-muted-foreground text-balance">
              Приєднуйтесь до наших заходів та знайдіть свою спільноту
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <Card
                key={index}
                className={`overflow-hidden bg-card border-border/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{event.title}</h3>
                  <p className="text-muted-foreground text-pretty">{event.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
