"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import { EventModal } from "./event-modal"
import {Event} from "@/types/event";

export function EventsSection({ events }: { events: Event[] }) {
    const [isVisible, setIsVisible] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
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

    const handleEventClick = (event: (typeof events)[0]) => {
        setSelectedEvent(event)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setTimeout(() => setSelectedEvent(null), 200)
    }

    const scrollToContact = () => {
        const element = document.getElementById('contact')
        if (element) {
            setIsModalOpen(false)
            setTimeout(() => setSelectedEvent(null), 200)

            const offset = 80
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            })
        }
    }

    return (
        <>
            <section id="events" ref={sectionRef} className="py-24 md:py-32 bg-background">
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

                        <div className="flex flex-col gap-8">
                            {events.map((event, index) => (
                                <Card
                                    key={event._id}
                                    onClick={() => handleEventClick(event)}
                                    className={`overflow-hidden bg-card border-border/50 hover:shadow-xl transition-all duration-500 cursor-pointer ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex flex-col md:flex-row">
                                        <div className="w-full md:w-80 flex-shrink-0 aspect-[4/5] overflow-hidden">
                                            <img
                                                src={event.image || "/placeholder.svg"}
                                                alt={event.title}
                                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-6 md:p-8 flex flex-col justify-center flex-grow">
                                            <div className="flex items-center gap-2 text-sm text-primary mb-4">
                                                <Calendar className="w-4 h-4" />
                                                <span>{event.date}</span>
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">{event.title}</h3>
                                            <p className="text-muted-foreground text-pretty text-lg">{event.description}</p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <EventModal
                event={selectedEvent}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                scrollToContact={scrollToContact}
            />
        </>
    )
}
