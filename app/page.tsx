import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ActivitiesSection } from "@/components/activities-section"
import { EventsSection } from "@/components/events-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { client } from "@/sanity/lib/client"
import { eventsQuery } from "@/sanity/lib/queries"
import { Event } from "@/types/event"

async function getPageData(): Promise<{ events: Event[] }> {
    const data = await client.fetch<{ events: Event[] }>(
        eventsQuery,
        {},
        { cache: 'no-store' }
    )
    return data || { events: [] } // Повертаємо порожній масив, якщо data = null
}

export default async function Home() {
    const { events } = await getPageData()

    return (
        <>
            <Navigation />
            <main className="min-h-screen">
                <HeroSection />
                <AboutSection />
                <ActivitiesSection />
                <EventsSection events={events} />
                <ContactSection />
            </main>
            <Footer />
        </>
    )
}
