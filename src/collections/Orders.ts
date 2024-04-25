import {
  AfterChangeHook,
  BeforeChangeHook,
} from 'node_modules/payload/dist/collections/config/types'
import { Access, CollectionConfig, PayloadRequest } from 'payload/types'
import { Order, Reservation } from '../payload-types'

const yourOwn: Access = ({ req: { user } }) => {
  if (user.role === 'admin') return true
  return {
    user: {
      equals: user?.id,
    },
  }
}

function sleep(milli: number) {
  // console.log('starting sleep')
  return new Promise((resolve) => setTimeout(resolve, milli))
}

interface deleteOrdersInterface {
  req: PayloadRequest
  order: Order
}
interface deleteOldOrdersInterface {
  req: PayloadRequest
  order: Partial<Order>
}

interface UnfinishedOrdersI {}

const deleteOldOrders = async ({ req, order }: deleteOldOrdersInterface) => {
  // console.log('deleteOldOrders', order)
  if (order?.user) {
    const { docs: unfinishedOrders, errors: unfinishedOrdersErrors } = await req.payload.delete({
      req,
      collection: 'orders',
      where: {
        and: [
          {
            id: {
              not_equals: order.id,
            },
          },
          {
            orderStatus: {
              equals: 'initiated',
            },
            user: {
              equals: order.user as number,
            },
          },
        ],
      },
    })

    const reducedUnfinishedOrders = unfinishedOrders.reduce<UnfinishedOrdersI[]>(
      (acc, { reservation }) => {
        acc.push((reservation as Reservation)?.id)
        return acc
      },
      [],
    )

    if (reducedUnfinishedOrders.length > 0) {
      const { docs: resupdocs, errors: resuperr } = await req.payload.update({
        req,
        collection: 'reservations',
        where: {
          id: {
            in: reducedUnfinishedOrders,
          },
        },
        data: {
          saleStatus: 'available',
        },
      })
    }
  } else {
    const { docs: unfinishedOrders, errors: guestDeleteErrors } = await req.payload.delete({
      req,
      collection: 'orders',
      where: {
        and: [
          {
            id: {
              not_equals: order.id,
            },
          },
          {
            or: [
              {
                and: [
                  {
                    orderStatus: {
                      equals: 'initiated',
                    },
                    phone: {
                      equals: order.phone,
                    },
                  },
                ],
              },
              {
                and: [
                  {
                    orderStatus: {
                      equals: 'initiated',
                    },
                    email: {
                      equals: order.email,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    })

    const reducedUnfinishedOrders = unfinishedOrders.reduce<UnfinishedOrdersI[]>(
      (acc, { reservation }) => {
        acc.push((reservation as Reservation)?.id)
        return acc
      },
      [],
    )
    if (reducedUnfinishedOrders.length > 0) {
      const { docs: resupdocs, errors: resuperr } = await req.payload.update({
        req,
        collection: 'reservations',
        where: {
          id: {
            in: reducedUnfinishedOrders,
          },
        },
        data: {
          saleStatus: 'available',
        },
      })
    }
  }
  return
}

const deleteOrders = async ({ req, order }: deleteOrdersInterface) => {
  await sleep(Number(process.env.NEXT_PUBLIC_TIME_OUT))

  const { docs } = await req.payload.find({
    collection: 'orders',
    where: {
      id: {
        equals: order?.id,
      },
    },
  })

  if (docs.length > 0) {
    const { _isPaid, reservation } = docs?.[0]
    // console.log(`Is order #${order.id} paid? ${_isPaid}`);
    if (!_isPaid && order?.id) {
      const { id } = await req.payload.delete({
        req,
        collection: 'orders',
        id: order.id,
      })
      const { saleStatus } = await req.payload.update({
        req,
        collection: 'reservations',
        id: (reservation as Reservation).id,
        data: {
          saleStatus: 'available',
        },
      })
    }
  }
  return
}

const removePendingAndFailedOrders: AfterChangeHook<Order> = async ({ doc, req, operation }) => {
  // console.log(`checking ${doc.id}`);
  if (!doc._isPaid && operation === 'create') {
    deleteOrders({ req, order: doc })
    // console.log('deleted');
  }
  // console.log('returning remove doc');
  return doc
}

const removeOldOrders: BeforeChangeHook<Order> = async ({ data, req }) => {
  await deleteOldOrders({ req, order: data })
  return data
}

const syncReservation: AfterChangeHook<Order> = async ({ req, doc, operation }) => {
  let order = doc
  // console.log('attempting sync');
  if (operation === 'create') {
    // console.log('order created, so attempting to sync reservation');
    const { saleStatus, order: connectedOrder } = await req.payload.update({
      req,
      collection: 'reservations',
      id: (order.reservation as Reservation).id,
      data: {
        saleStatus: 'pending',
        order: order.id,
      },
    })
    // console.log('created reservation status', saleStatus, 'connectedOrder', connectedOrder);
  } else if (operation === 'update') {
    // console.log('updating order, so attempting to sync reservation', order);
    const updateReservationStatus = await req.payload.update({
      req,
      collection: 'reservations',
      id: (order.reservation as Reservation).id,
      data: {
        saleStatus:
          order.orderStatus === 'failed' || 'pending' || 'initiated'
            ? 'pending'
            : order.orderStatus === 'paid'
            ? 'sold'
            : 'available',
      },
    })
    // console.log('updating reservation status', updateReservationStatus.saleStatus)
  }
  return doc
}

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'Your Orders',
    description: 'Summary of all your orders',
  },
  // access: {
  //   read: yourOwn,
  //   create: ({ req }) => req.user.role === 'admin',
  //   update: ({ req }) => req.user.role === 'admin',
  //   delete: ({ req }) => req.user.role === 'admin',
  // },
  hooks: {
    beforeChange: [removeOldOrders],
    afterChange: [syncReservation, removePendingAndFailedOrders],
  },
  fields: [
    {
      name: '_isPaid',
      type: 'checkbox',
      // access: {
      //   read: ({ req }) => req.user.role === 'admin',
      //   create: () => false,
      //   update: () => false,
      // },
      admin: {
        hidden: true,
      },
      required: true,
    },
    {
      name: 'orderStatus',
      label: 'Order Status',
      type: 'select',
      defaultValue: 'initiated',
      options: [
        { label: 'Paid', value: 'paid' },
        { label: 'Pending', value: 'pending' },
        { label: 'Failed', value: 'failed' },
        { label: 'Initiated', value: 'initiated' },
      ],
    },
    { name: '_pi', type: 'text', label: 'Payment Intent' },
    {
      name: '_paidOut',
      type: 'checkbox',
      defaultValue: false,
      label: 'Paid Out',
    },
    {
      name: '_paidOutDate',
      type: 'date',
      label: 'Paid Out Date',
    },
    {
      name: 'serviceFee',
      type: 'number',
      label: 'Service Fee',
    },
    // {
    //   name: '_paidOut',
    //   label: 'Paid Out',
    //   type: 'select',
    //   defaultValue: 'notFinalized',
    //   options: [
    //     { label: 'Paid', value: 'paid' },
    //     { label: 'Pending', value: 'pending' },
    //     { label: 'Failed', value: 'failed' },
    //     { label: 'Ready To Pay', value: 'ready' },
    //     { label: 'Not Finalized', value: 'notFinalized' }
    //   ]
    // },
    {
      name: 'discount',
      type: 'number',
      defaultValue: 0,
    },
    { name: 'orderGroup', type: 'text' },
    { name: 'sourceTransaction', type: 'text' },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      // admin: { hidden: true },
      required: false,
    },
    {
      name: 'sleeping',
      type: 'checkbox',
      required: true,
      defaultValue: false,
    },
    {
      name: 'first',
      type: 'text',
      required: true,
    },
    {
      name: 'last',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      // admin: { hidden: true },
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      // admin: { hidden: true },
      required: true,
    },
    {
      name: 'reservation',
      type: 'relationship',
      relationTo: 'reservations',
      required: true,
      hasMany: false,
    },
  ],
}
