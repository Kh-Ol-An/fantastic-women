import type {StructureResolver} from 'sanity/structure'

const singletonTypes = new Set(['pageSettings'])

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) => {
  const documentTypeItems = S.documentTypeListItems().filter(
    (listItem) => listItem.getId() && !singletonTypes.has(listItem.getId() ?? ''),
  )

  return S.list()
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
      ...documentTypeItems,
    ])
}
