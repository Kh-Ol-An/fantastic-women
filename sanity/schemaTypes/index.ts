import { type SchemaTypeDefinition } from 'sanity'
import {event} from './event'
import {pageSettings} from '../schemas/pageSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [event, pageSettings],
}
