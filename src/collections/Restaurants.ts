import kebabCase from 'lodash.kebabcase'
// import { AfterChangeHook } from 'payload/dist/collections/config/types';
import { CollectionConfig } from 'payload/types'
// import { Restaurant } from 'src/payload-types';

// const syncCity: AfterChangeHook<Restaurant> = async ({ req, doc, previousDoc, operation }) => {
//   const fullCity = await req.payload.findByID({
//     collection: 'cities',
//     id: typeof doc.city === 'object' ? doc.city.id : doc.city
//   });

//   console.log('fullCity', fullCity);

//   if (fullCity && typeof fullCity === 'object') {
//     const { restaurants } = fullCity;
//     console.log('restaurants', restaurants);
//     const updatedCities = await req.payload.update({
//       req,
//       collection: 'cities',
//       id: fullCity.id,
//       data: {
//         restaurants: Array.from(
//           new Set([
//             ...(restaurants?.length > 0 ? restaurants.map((res: Restaurant) => res?.id) : []),
//             doc.id
//           ])
//         )
//       }
//     });

//     console.log('updatedCities', updatedCities);

//     return doc;
//   } else {
//     console.error('Issue with syncCity');
//   }
// };
export const Restaurants: CollectionConfig = {
  slug: 'restaurants',
  admin: {
    useAsTitle: 'composite',
  },
  hooks: {
    // afterChange: [syncCity]
  },
  // access: {},
  fields: [
    {
      name: 'city',
      type: 'relationship',
      relationTo: 'cities',
      required: false,
      hasMany: false,
      admin: { condition: () => true },
    },
    { name: 'name', label: 'Name', type: 'text', required: true },
    {
      name: 'composite',
      type: 'text',
      admin: { hidden: true },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            delete siblingData['composite']
          },
        ],
        afterRead: [
          async ({ req, data }) => {
            if (data) {
              const { name } = await req.payload.findByID({
                collection: 'cities',
                id: data.city,
              })
              return `${data.name} in ${name}`
            }
          },
        ],
      },
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: false,
      index: true,
      access: {
        create: () => false,
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
      name: 'trending',
      type: 'number',
      min: 0,
      max: 10,
      defaultValue: 0,
    },

    // {
    //   name: 'rare',
    //   type: 'checkbox'
    // },
    {
      name: 'location',
      label: 'Location',
      type: 'relationship',
      relationTo: 'locations',
      hasMany: false,
      required: true,
    },
    { name: 'address', label: 'Address', type: 'text', required: true },
    { name: 'avg', label: 'Average Price', type: 'number', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    {
      name: 'recomendation',
      label: 'Recomendations',
      type: 'relationship',
      relationTo: 'recomendations',
      hasMany: true,
      required: true,
    },
    { name: 'signature', label: 'Signature Dish', type: 'text', required: true },
    { name: 'views', label: 'Views', type: 'number', required: true },
    { name: 'score', label: 'Foodie Score', type: 'number', required: true },
    // { name: 'customerScore', label: 'Customer Score', type: 'number', required: false },
    { name: 'booked', label: 'Number of Bookings', type: 'number', required: true },
    {
      name: 'cuisine',
      label: 'Type of Cuisine',
      type: 'relationship',
      relationTo: 'cuisines',
      required: true,
      hasMany: false,
    },
    {
      name: 'price',
      label: 'Price',
      type: 'radio',
      options: [
        { label: '$$$$', value: '4' },
        { label: '$$$', value: '3' },
        { label: '$$', value: '2' },
        { label: '$', value: '1' },
      ],
      required: true,
    },
    {
      name: 'michelin',
      label: 'Michelin Stars',
      type: 'radio',
      options: [
        { label: '☆☆☆', value: '3' },
        { label: '☆☆', value: '2' },
        { label: '☆', value: '1' },
        { label: 'No Star', value: '0' },
      ],
      required: false,
      // defaultValue: 0
    },
    {
      name: 'live',
      type: 'checkbox',
      label: 'Live',
    },
    {
      name: 'image',
      label: 'Restaurant Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
