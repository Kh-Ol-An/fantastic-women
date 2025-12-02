import type {StructureResolver} from 'sanity/structure'

const singletonTypes = new Set(['pageSettings'])

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) => {
  try {
    const documentTypeItems = S.documentTypeListItems().filter(
      (listItem) => {
        const id = listItem.getId()
        return id && !singletonTypes.has(id)
      },
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
  } catch (error) {
    console.error('Error in structure resolver:', error)
    // Return a basic structure if there's an error
    return S.list()
      .title('Content')
      .items(S.documentTypeListItems())
  }
}
