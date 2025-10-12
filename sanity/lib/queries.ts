import { groq } from 'next-sanity'

// Запит для отримання опублікованих подій
export const eventsQuery = groq`*[_type == "pageSettings"][0] {
    "events": publishedEvents[]->{
        _id,
        title,
        date,
        time,
        location,
        participants,
        "image": image.asset->url,
        description,
        fullDescription
    }
}`
