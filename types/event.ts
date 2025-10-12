export interface Event {
    _id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    participants: string;
    image: string; // Тепер це буде URL-адреса
    description: string;
    fullDescription: string;
}
