"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { BookOpen, Palette, Users } from "lucide-react"

const activities = [
  {
    icon: BookOpen,
    title: "Тренінги та лекції",
    description: "Психологічна підтримка, особистісний розвиток та навчання від експертів",
  },
  {
    icon: Users,
    title: "Пізнання культури",
    description: "Культурні події, зустрічі зі зірками естради та шоу-бізнесу",
  },
  {
    icon: Palette,
    title: "Творчі майстер-класи",
    description: "Розвиток творчих здібностей через мистецтво та ремесла",
  },
]

export function ActivitiesSection() {
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
    <section ref={sectionRef} className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div
          className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Наші напрями</h2>
            <p className="text-lg text-muted-foreground text-balance">
              Комплексний підхід до розвитку та підтримки жінок
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {activities.map((activity, index) => {
              const Icon = activity.icon
              return (
                <Card
                  key={index}
                  className={`p-8 bg-card border-border/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{activity.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-pretty">{activity.description}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
