import kebabCase from 'lodash.kebabcase'
import { CollectionConfig } from 'payload/types'

export const Cities: CollectionConfig = {
  slug: 'cities',
  admin: {
    useAsTitle: 'name',
  },
  access: {},
  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: false,
      index: true,
      access: {
        create: () => false,
        read: () => true,
        update: () => false,
      },
      hooks: {
        afterRead: [
          ({ data }) => {
            if (data) {
              return kebabCase(data.name)
            }
          },
        ],
      },
    },
    {
      name: 'live',
      type: 'checkbox',
      defaultValue: false,
    },
    // {
    //   name: 'restaurants',
    //   label: 'Restaurants',
    //   type: 'relationship',
    //   relationTo: 'restaurants',
    //   hasMany: true
    // },
    { name: 'image', label: 'City Image', type: 'upload', relationTo: 'media', required: true },
  ],
}
