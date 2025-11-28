import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Налаштування сторінки')
        .id('pageSettings')
        .child(
          S.document()
            .schemaType('pageSettings')
            .documentId('pageSettings')
            .title('Налаштування сторінки'),
        ),
      S.divider(),
      S.documentTypeListItem('event').title('Події'),
    ])
