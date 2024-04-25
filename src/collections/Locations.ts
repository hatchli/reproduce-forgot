import { CollectionConfig } from 'payload/types';

export const Locations: CollectionConfig = {
  slug: 'locations',
  admin: {
    useAsTitle: 'name'
  },
  access: {},
  fields: [{ name: 'name', label: 'Name', type: 'text', required: true }]
};
