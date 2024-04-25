import { CollectionConfig } from 'payload/types'

export const FooterSections: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
  },
  fields: [
    {
      name: 'sections',
      type: 'array',
      fields: [
        { name: 'sectionValue', type: 'text', required: true },
        { name: 'sectionLabel', type: 'text', required: true },
      ],
    },
  ],
}
