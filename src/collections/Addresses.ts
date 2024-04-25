import { CollectionConfig } from 'payload/types';

export const Addresses: CollectionConfig = {
  slug: 'addresses',
  admin: {
    useAsTitle: 'street'
  },
  access: {},
  fields: [
    { name: 'street', label: 'Street Address', type: 'text', required: true },
    { name: 'streetSecondary', label: 'Street Address (Line Two)', type: 'text', required: false },
    { name: 'city', label: 'city', type: 'text', required: true },
    { name: 'state', label: 'state', type: 'text', required: true },
    { name: 'zip', label: 'zip', type: 'number', required: true }
  ]
};
