import {defineField, defineType} from 'sanity'

export const pageSettings = defineType({
    name: 'pageSettings',
    title: 'Налаштування сторінки',
    type: 'document',
    fields: [
        defineField({
            name: 'publishedEvents',
            title: 'Опубліковані події',
            description: 'Оберіть події, які будуть відображатись на головній сторінці. Ви можете змінювати їх порядок.',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{type: 'event'}],
                },
            ],
            validation: (Rule) => Rule.unique().error('Події не повинні повторюватись'),
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Налаштування відображення подій',
            }
        },
    },
})
