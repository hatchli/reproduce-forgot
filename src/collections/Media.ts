import { CollectionConfig } from 'payload/types'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    // hidden: ({ user }) => user.role !== 'admin',
  },
  access: {
    read: () => true,
  },
  // upload: {
  //   // staticURL: '/media',
  //   staticDir: 'media',
  //   // imageSizes: [
  //   //   { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
  //   //   { name: 'card', width: 768, height: 1024, position: 'centre' },
  //   //   { name: 'tablet', width: 1024, height: undefined, position: 'centre' }
  //   // ],
  //   mimeTypes: ['image/*'],
  // },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: { condition: () => false },
    },
    {
      name: 'blurhash',
      type: 'text',
    },
  ],
}
