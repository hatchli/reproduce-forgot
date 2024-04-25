import { nanoid } from 'nanoid'
import { CollectionConfig } from 'payload/types'

export const Newsletter: CollectionConfig = {
  slug: 'newsletters',
  fields: [
    { name: 'email', type: 'email', required: true },
    { name: 'verified', type: 'checkbox' },
    {
      name: 'token',
      type: 'text',
      defaultValue: () => nanoid(21),
      // hooks: {
      //   beforeChange: [encryptField],
      //   afterRead: [decryptField]
      // }
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      hasMany: false,
      // admin: { condition: () => false }
    },
    { name: 'newsletter', type: 'checkbox', required: false, defaultValue: false },
  ],
}
