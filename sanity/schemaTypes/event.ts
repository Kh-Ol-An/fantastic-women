import {defineField, defineType} from 'sanity'

export const event = defineType({
    name: 'event',
    title: 'Подія',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Назва',
            type: 'string',
            validation: (Rule) => Rule.required().error('Назва події є обовʼязковою'),
        }),
        defineField({
            name: 'date',
            title: 'Дата (текстовий формат)',
            type: 'string',
            description: 'Наприклад: "Кожної неділі" або "15 Березня 2024"',
        }),
        defineField({
            name: 'time',
            title: 'Час',
            type: 'string',
            description: 'Наприклад: "14:00 - 16:00"',
        }),
        defineField({
            name: 'location',
            title: 'Локація',
            type: 'string',
        }),
        defineField({
            name: 'participants',
            title: 'Кількість учасниць',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Головне зображення',
            type: 'image',
            options: {
                hotspot: true, // Дозволяє краще кадрувати зображення
            },
        }),
        defineField({
            name: 'description',
            title: 'Короткий опис (для картки на головній)',
            type: 'text', // `text` дозволяє вводити кілька рядків
        }),
        defineField({
            name: 'fullDescription',
            title: 'Повний опис (для модального вікна)',
            type: 'text',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image',
        },
    },
})
