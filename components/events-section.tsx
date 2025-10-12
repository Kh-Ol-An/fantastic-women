"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import { EventModal } from "./event-modal"

const events = [
    {
        title: "Щотижнева зустріч",
        date: "Кожної неділі",
        time: "14:00 - 16:00",
        location: "Київ, вул. Хрещатик 1",
        participants: "15-20 учасниць",
        image: "/women-gathering-workshop-creative-activities.jpg",
        description: "Регулярні зустрічі для спілкування, підтримки та розвитку",
        fullDescription:
            "Наші щотижневі зустрічі - це безпечний простір для жінок, де можна поділитися своїми думками, отримати підтримку та знайти нових подруг.\n\nНа зустрічах ми обговорюємо різні теми: від особистого розвитку до професійних викликів. Кожна зустріч включає час для вільного спілкування, тематичні дискусії та практичні вправи.\n\nПриєднуйтесь до нашої спільноти та відчуйте силу жіночої підтримки!",
    },
    {
        title: "Майстер-клас з арт-терапії",
        date: "15 Березня 2024",
        time: "18:00 - 20:30",
        location: "Арт-студія 'Палітра'",
        participants: "До 12 учасниць",
        image: "/art-therapy-workshop-women-painting.jpg",
        description: "Творчий підхід до психологічного здоров'я",
        fullDescription:
            "Арт-терапія - це потужний інструмент для самопізнання та емоційного відновлення. На цьому майстер-класі ви навчитеся використовувати творчість для роботи з емоціями та стресом.\n\nПрограма включає:\n• Вступ до арт-терапії\n• Практичні вправи з малювання\n• Групову роботу та обмін досвідом\n• Чаювання та спілкування\n\nВсі матеріали надаються. Попередній досвід малювання не потрібен!",
    },
    {
        title: "Зустріч зі зіркою",
        date: "22 Квітня 2024",
        time: "19:00 - 21:00",
        location: "Конференц-зал 'Горизонт'",
        participants: "До 50 учасниць",
        image: "/celebrity-event-stage-performance-audience.jpg",
        description: "Спеціальна подія з відомою особистістю",
        fullDescription:
            "Запрошуємо вас на особливу зустріч з успішною українською жінкою, яка поділиться своєю історією успіху, викликами та досягненнями.\n\nВи дізнаєтесь:\n• Як долати перешкоди на шляху до мети\n• Секрети балансу між кар'єрою та особистим життям\n• Поради щодо особистого розвитку\n\nПісля виступу буде сесія запитань-відповідей та можливість особистого спілкування. Не пропустіть цю натхненну подію!",
    },
    {
        title: "Літній ретрит",
        date: "15-17 Червня 2024",
        time: "П'ятниця 18:00 - Неділя 16:00",
        location: "Карпати, еко-садиба 'Гармонія'",
        participants: "20 учасниць",
        image: "/women-retreat-nature-meditation-wellness.jpg",
        description: "Відпочинок та відновлення на природі",
        fullDescription:
            "Триденний ретрит для жінок, які прагнуть відновити внутрішню гармонію та енергію серед мальовничої природи Карпат.\n\nПрограма ретриту:\n• Ранкові медитації та йога\n• Майстер-класи з mindfulness\n• Творчі майстерні\n• Прогулянки на природі\n• Групові терапевтичні сесії\n• Здорове харчування\n• Вільний час для відпочинку\n\nПроживання в комфортних номерах, триразове харчування включено. Кількість місць обмежена - реєструйтесь заздалегідь!",
    },
]

export function EventsSection() {
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
                                    key={index}
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
