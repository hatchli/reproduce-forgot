import { format, isToday } from 'date-fns'
import { nanoid } from 'nanoid'
// import { AfterChangeHook, BeforeChangeHook } from '/payload/dist/collections/config/types';
import { Access, CollectionConfig } from 'payload/types'
// import { ReservationValidationEmailHtml } from '@/components/Emails/ReservationValidationEmail'
// import { stripe } from '@/lib/stripe'
import { City, Reservation, Restaurant, User } from '../payload-types'
import {
  BeforeChangeHook,
  AfterChangeHook,
} from 'node_modules/payload/dist/collections/config/types'

const addOwnerUser: BeforeChangeHook<Reservation> = async ({ req, data, operation }) => {
  const user: User | null = req?.user
  if (user && user.role === 'admin' && operation !== 'create') return { ...data }
  else if (!user) return { ...data }
  else if (operation === 'create') return { ...data, owner: user.id }
  else return data
}

// const fullReservationName: AfterChangeHook<Reservation> = async ({ req, doc, previousDoc }) => {
//   const { name, city } = await req.payload.findByID({
//     collection: 'restaurants',
//     id: typeof doc.restaurant === 'object' ? doc.restaurant.id : doc.restaurant,
//     depth: 1
//   });

//   console.log('docid', doc.id);

//   const update = await req.payload.update({
//     collection: 'reservations',
//     where: {
//       id: {
//         equals: doc.id
//       }
//     },
//     data: {
//       name: `${name}, ${typeof city === 'number' ? '' : city.name}`
//     }
//   });
//   console.log('update', update);
//   return doc;
// };

export const Reservations: CollectionConfig = {
  slug: 'reservations',
  admin: {
    useAsTitle: 'name',
  },

  hooks: {
    // beforeChange: [
    //   createReservationName,
    //   addOwnerUser,
    //   async (args) => {
    //     if (args.operation === 'create') {
    //       const data = args.data as Reservation
    //       const createdReservation = await stripe.products.create({
    //         name: data.publicId as string,
    //         default_price_data: {
    //           currency: 'USD',
    //           unit_amount: Math.round(data.price * 100),
    //         },
    //       })
    //       const updated: Reservation = {
    //         ...data,
    //         stripeId: createdReservation.id,
    //         priceId: createdReservation.default_price as string,
    //       }
    //       return updated
    //     } else if (args.operation === 'update') {
    //       const data = args.data as Reservation
    //       const updatedReservation = await stripe.products.update(data.stripeId!, {
    //         name: data.publicId as string,
    //         default_price: data.priceId!,
    //       })
    //       const updated: Reservation = {
    //         ...data,
    //         stripeId: updatedReservation.id,
    //         priceId: updatedReservation.default_price as string,
    //       }
    //       return updated
    //     }
    //   },
    // ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      access: {
        create: () => false,
        update: () => false,
      },
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: {
        // condition: () => false
      },
    },
    {
      name: 'purchaser',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      hasMany: false,
    },
    {
      name: 'rareFind',
      type: 'checkbox',
    },
    {
      name: 'order',
      type: 'relationship',
      relationTo: 'orders',
      required: false,
      hasMany: false,
      // validate: (val, { data, siblingData }) => {
      //   console.log('val', val, 'data', data, 'siblingData', siblingData);
      //   if (val && data?.order && val != data.order) {
      //     return 'This reservation already has an order associated to it';
      //   }
      //   return true;
      // },
      admin: {
        // condition: () => false
      },
      access: {
        // create: ({ req }) => req.user.role === 'admin',
        // read: ({ req }) => req.user.role === 'admin',
        // update: ({ req }) => req.user.role === 'admin',
      },
    },
    {
      name: 'tos',
      label: 'Agreed to Terms of Service, Privacy Policy',
      type: 'checkbox',
      // access: {
      //   read: ({ req }) => req.user.role === 'admin',
      //   create: () => false,
      //   update: () => false,
      // },
      required: false,
      defaultValue: false,
    },
    {
      name: 'serviceFee',
      label: 'Agreed to Service Fee',
      type: 'checkbox',
      // access: {
      //   read: ({ req }) => req.user.role === 'admin',
      //   create: () => false,
      //   update: () => false,
      // },
      defaultValue: false,
      required: false,
    },
    {
      name: 'date',
      label: 'Date of Reservation',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'd MM yyy h:mm a',
        },
      },
    },
    {
      name: 'timeInterval',
      label: 'Time Interval',
      type: 'radio',
      admin: {
        hidden: true,
      },
      // access: {
      //   create: () => false,
      //   read: () => true,
      //   update: () => false,
      // },
      hooks: {
        afterRead: [
          ({ data }) => {
            if (data) {
              return format(data.date, 'k')
            }
          },
        ],
      },
      options: [
        { label: '12AM - 1PM', value: '12' },
        { label: '1PM - 2PM', value: '13' },
        { label: '2PM - 3PM', value: '14' },
        { label: '3PM - 4PM', value: '15' },
        { label: '4PM - 5PM', value: '16' },
        { label: '5PM - 6PM', value: '17' },
        { label: '6PM - 7PM', value: '18' },
        { label: '7PM - 8PM', value: '19' },
        { label: '8PM - 9PM', value: '20' },
        { label: '9PM - 10PM', value: '21' },
        { label: '10PM - 11PM', value: '22' },
        { label: '11PM - 12AM', value: '23' },
      ],
    },
    {
      name: 'tonight',
      label: 'Tonight',
      type: 'checkbox',
      required: false,
      index: true,
      // access: {
      //   create: () => false,
      //   read: () => true,
      //   update: () => false
      // },
      // admin: {
      //   hidden: true
      // },
      hooks: {
        afterRead: [
          ({ data }) => {
            if (data) {
              return isToday(data.date)
            }
          },
        ],
      },
      // admin: {
      //   date: {
      //     pickerAppearance: 'dayAndTime',
      //     displayFormat: 'h:mm a'
      //   }
      // }
    },
    { name: 'seats', label: 'Seats', type: 'number', required: true },
    { name: 'score', label: 'Score', type: 'number', required: false },
    { name: 'mealCredit', label: 'Meal Credit Amount', type: 'number', required: false },
    { name: 'price', type: 'number', label: 'Price (USD)', min: 0, max: 1000, required: true },
    {
      name: 'restaurant',
      type: 'relationship',
      relationTo: 'restaurants',
      label: 'Restaurant',
      required: true,
      index: true,
    },
    {
      name: 'publicId',
      // access: {
      //   create: () => false,
      //   // read: () => false,
      //   update: () => false,
      // },
      type: 'text',
      defaultValue: () => nanoid(21),
      index: true,
      unique: true,
    },
    {
      name: 'priceId',
      // access: {
      //   create: () => false,
      //   read: ({ req }) => req.user.role === 'admin',
      //   update: () => false,
      // },
      type: 'text',
      admin: {
        // hidden: true
      },
    },
    {
      name: 'stripeId',
      // access: {
      //   create: () => false,
      //   read: ({ req }) => req.user.role === 'admin',
      //   update: () => false,
      // },
      type: 'text',
      admin: {
        // hidden: true
      },
    },
    {
      name: 'saleStatus',
      label: 'Sale Status',
      type: 'select',
      defaultValue: 'available',
      options: [
        { label: 'Sold', value: 'sold' },
        { label: 'Pending', value: 'pending' },
        { label: 'Withheld', value: 'withheld' },
        { label: 'Available', value: 'available' },
      ],
    },
    {
      name: 'adminComments',
      label: 'Admin Comments',
      type: 'textarea',
      required: false,
    },
    {
      name: 'approvedForSale',
      label: 'Reservation Status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending Verification', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Denied', value: 'denied' },
      ],
      // access: {
      //   create: ({ req }) => req.user.role === 'admin',
      //   read: ({ req }) => req.user.role === 'admin',
      //   update: ({ req }) => req.user.role === 'admin',
      // },
    },
    {
      name: 'reservationProof',
      label: 'Proof of Reservation',
      type: 'relationship',
      relationTo: 'details',
      required: true,
      // access: {
      //   create: ({ req }) => req.user.role === 'admin',
      //   read: ({ req }) => req.user.role === 'admin',
      //   update: ({ req }) => req.user.role === 'admin'
      // }
    },
    // {
    //   name: 'images',
    //   type: 'array',
    //   label: 'Reservation Image(s)',
    //   minRows: 1,
    //   maxRows: 4,
    //   required: true,
    //   labels: {
    //     singular: 'Image',
    //     plural: 'Images'
    //   },
    //   fields: [{ name: 'image', type: 'upload', relationTo: 'protectedMedia', required: true }]
    // }
  ],
}
