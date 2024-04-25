import { CollectionConfig } from 'payload/types';

export const Cuisines: CollectionConfig = {
  slug: 'cuisines',
  admin: {
    useAsTitle: 'name'
  },
  access: {},
  fields: [{ name: 'name', label: 'Name', type: 'text', required: true }]
};
