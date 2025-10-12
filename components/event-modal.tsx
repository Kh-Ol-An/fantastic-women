"use client"

import { useEffect } from "react"
import { X, Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Event {
    title: string
    date: string
    image: string
    description: string
    fullDescription?: string
    location?: string
    participants?: string
    time?: string
}

interface EventModalProps {
    event: Event | null
    isOpen: boolean
    onClose: () => void
}

export function EventModal({ event, isOpen, onClose }: EventModalProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEscape)
            document.body.style.overflow = "hidden"
        }

        return () => {
            document.removeEventListener("keydown", handleEscape)
            document.body.style.overflow = "unset"
        }
    }, [isOpen, onClose])

    if (!isOpen || !event) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 z-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                    onClick={onClose}
                >
                    <X className="w-5 h-5" />
                </Button>

                {/* Image */}
                <div className="w-full aspect-[16/9] overflow-hidden rounded-t-2xl">
                    <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">{event.title}</h2>

                    <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center gap-2 text-primary">
                            <Calendar className="w-5 h-5" />
                            <span className="font-medium">{event.date}</span>
                        </div>
                        {event.time && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <span className="font-medium">{event.time}</span>
                            </div>
                        )}
                        {event.location && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="w-5 h-5" />
                                <span>{event.location}</span>
                            </div>
                        )}
                        {event.participants && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Users className="w-5 h-5" />
                                <span>{event.participants}</span>
                            </div>
                        )}
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <p className="text-muted-foreground text-lg leading-relaxed mb-4">{event.description}</p>
                        {event.fullDescription && (
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{event.fullDescription}</p>
                        )}
                    </div>

                    <div className="mt-8 flex gap-4">
                        <Button size="lg" className="bg-primary hover:bg-primary/90">
                            Зареєструватися
                        </Button>
                        <Button size="lg" variant="outline" onClick={onClose}>
                            Закрити
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
