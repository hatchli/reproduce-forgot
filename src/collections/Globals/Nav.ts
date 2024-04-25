import { GlobalConfig } from 'payload/types'

const Nav: GlobalConfig = {
  slug: 'nav',
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      maxRows: 8,
      fields: [
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages', // "pages" is the slug of an existing collection
          required: false,
        },
      ],
    },
    {
      name: 'noPageItems',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'slug',
          type: 'text',
          required: false,
        },
      ],
    },
  ],
}

export default Nav
