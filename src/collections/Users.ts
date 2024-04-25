import { redirect } from 'next/navigation'
import { Access, CollectionConfig } from 'payload/types'

const adminsAndUser: Access = ({ req: { user, url } }) => {
  // if (user?.role === 'admin') return true
  // if (url && url.includes('admin') && user?.role === 'user') {
  //   redirect('/')
  // } else if (url && url.includes('admin') && !user) {
  //   redirect('/sign-in?origin=admin')
  // }
  return {
    id: {
      equals: user?.id,
    },
  }
}

export const Users: CollectionConfig = {
  slug: 'users',

  auth: {
    forgotPassword: {
      generateEmailHTML: ({ token }) => {
        console.log('token', token)
        return `<a href='${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?token=${token}'>Click here to reset your password</a>`
      },
    },
    verify: {
      generateEmailHTML: ({ token }) => {
        return `<a href='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}'>Click here to Verify Your Email</a>`
      },
    },
    tokenExpiration: 86400,
    cookies: {
      sameSite: 'Strict',
    },
  },
  access: {
    read: adminsAndUser,
    // create: () => true,
    // update: ({ req }) => req.user.role === 'admin',
    // delete: ({ req }) => req.user.role === 'admin',
  },
  admin: {
    // hidden: ({ user }) => user.role !== 'admin',
    defaultColumns: ['id'],
  },
  fields: [
    { name: 'first', type: 'text', required: true, saveToJWT: true },
    { name: 'last', type: 'text', required: true, saveToJWT: true },
    {
      name: 'newsletter',
      type: 'checkbox',
      required: false,
      defaultValue: false,
      hooks: {
        afterChange: [
          async ({ operation, originalDoc, previousValue, req, value }) => {
            if (operation === 'update') {
              const findNewsletter = await req.payload.find({
                collection: 'newsletters',
                where: {
                  or: [
                    {
                      user: {
                        equals: originalDoc.id,
                      },
                    },
                    {
                      email: {
                        equals: originalDoc.email,
                      },
                    },
                  ],
                },
                limit: 1,
                depth: 0,
              })

              const [newsletter] = findNewsletter.docs
              //newsletter exists with that email or user
              if (newsletter) {
                //newlsetter doesn't have a user so must share the same email
                if (!newsletter?.user) {
                  //user is verified
                  if (originalDoc?._verified) {
                    const connectNewsletter = req.payload.update({
                      req,
                      collection: 'newsletters',
                      id: newsletter?.id,
                      data: {
                        user: originalDoc.id,
                        verified: true,
                        newsletter: value,
                      },
                    })
                    return value
                  } else {
                    // the user isn't verified, so we dont want to connect the newsletter
                    return value
                  }
                  //newsletter has user connected already
                } else if (newsletter.user) {
                  const connectNewsletter = req.payload.update({
                    req,
                    collection: 'newsletters',
                    id: newsletter?.id,
                    data: {
                      verified: true,
                      newsletter: value,
                    },
                  })
                  return value
                }
                //no associated newsletter found
              } else if (!newsletter) {
                //user is verified
                if (originalDoc?._verified && value) {
                  try {
                    const createNewsletter = await req.payload.create({
                      req,
                      collection: 'newsletters',
                      data: {
                        email: originalDoc.email,
                        newsletter: value,
                        verified: true,
                        user: originalDoc.id,
                      },
                    })
                    return value
                  } catch (err) {
                    console.log(err)
                    return err
                  }
                } else {
                  //user is not verified, we don't want to do anything yet
                  return value
                }
              } else return value
            } else return value
          },
        ],
      },
    },
    { name: 'tos', type: 'checkbox', required: false, defaultValue: false },
    { name: 'phone', type: 'text', required: false, unique: false, saveToJWT: true },
    {
      name: 'reservations',
      label: 'Reservations',
      admin: {
        condition: () => false,
      },
      type: 'relationship',
      relationTo: 'reservations',
      hasMany: true,
    },
    {
      name: 'stripeAccountId',
      type: 'text',
      label: 'Stripe Connected Account ID',
    },
    {
      name: 'transacionCost',
      type: 'number',
      label: 'Transaction Percentage',
      defaultValue: 15,
    },
    {
      name: 'availableFunds',
      type: 'number',
      label: 'Available Funds',
    },
    {
      name: 'reservedFunds',
      type: 'number',
      label: 'Reserved Funds',
    },
    {
      name: 'pendingFunds',
      type: 'number',
      label: 'Pending Funds',
    },
    {
      name: 'payoutsEnabled',
      type: 'checkbox',
      label: 'Payout Enabled',
      defaultValue: false,
    },
    {
      name: 'points',
      type: 'number',
      min: 0,
      defaultValue: 0,
    },
    {
      name: 'servicePoints',
      type: 'number',
      min: 0,
      max: 1500,
      defaultValue: 0,
    },
    {
      name: 'disabledReason',
      type: 'text',
      required: false,
    },
    {
      name: 'address',
      type: 'relationship',
      relationTo: 'addresses',
      required: false,
    },
    {
      name: 'detailsSubmitted',
      type: 'checkbox',
      label: 'Payout Details Submitted',
      defaultValue: false,
    },
    {
      name: 'role',
      defaultValue: 'user',
      required: true,
      type: 'select',
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
    },
  ],
}
