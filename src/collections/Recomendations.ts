import { CollectionConfig } from 'payload/types';

export const Recomendations: CollectionConfig = {
  slug: 'recomendations',
  admin: {
    useAsTitle: 'name'
  },
  access: {},
  fields: [{ name: 'name', label: 'Name', type: 'text', required: true }]
};
