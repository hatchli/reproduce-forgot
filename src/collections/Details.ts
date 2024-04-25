// import { BeforeChangeHook } from 'payload/dist/collections/config/types';
import { BeforeChangeHook } from 'node_modules/payload/dist/collections/config/types'
import { User } from '../payload-types'
import { Access, CollectionConfig } from 'payload/types'
// import { User } from 'src/payload-types';

const addUser: BeforeChangeHook = ({ req, data }) => {
  //   console.log('data', data);
  // console.log('context', context)
  // console.log('req?.user', req?.user)
  let user: User = req?.user
  // let user: User = data.user
  // console.log('user', user)
  if (user.role === 'admin') return { ...data }
  return { ...data, user: user.id }
}

const yourOwnAndPurchased: Access = async ({ req, data }) => {
  //   console.log('purchased', req.user);
  const user = req.user as User | null
  // const user: User = req?.user
  // console.log('yourOwnAndPurchased', user)
  if (user?.role === 'admin') return true
  if (!user) return false

  const { docs: reservations } = await req.payload.find({
    collection: 'reservations',
    depth: 0,
    where: {
      or: [
        {
          owner: {
            equals: user.id,
          },
        },
        {
          purchaser: {
            equals: user.id,
          },
        },
      ],
    },
  })

  const ownReservationProofIds = reservations
    .map((reservation) => reservation.reservationProof)
    .flat()

  const { docs: orders } = await req.payload.find({
    collection: 'orders',
    depth: 2,
    where: {
      user: {
        equals: user.id,
      },
    },
  })

  const purchasedReservationIds = orders.map((order) => {
    return typeof order.reservation === 'number' ? order.reservation : order.reservation.id
  })

  return {
    id: {
      in: [...ownReservationProofIds, ...purchasedReservationIds],
    },
  }
}

export const Details: CollectionConfig = {
  slug: 'details',
  admin: {
    useAsTitle: 'name',
  },
  hooks: {
    beforeChange: [addUser],
  },
  access: {
    read: yourOwnAndPurchased,
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'link', label: 'Link', type: 'text', required: true },
    { name: 'reservationFor', label: 'Reservation For', type: 'text', required: true },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: { condition: () => false },
    },
  ],
}
