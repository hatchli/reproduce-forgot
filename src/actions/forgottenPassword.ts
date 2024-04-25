'use server'

import { ForgottenPasswordInputs } from '@/lib/serverActions/schema'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function serverForgottenPasswordSubmit(data: ForgottenPasswordInputs) {
  const payload = await getPayload({ config: configPromise })
  try {
    console.log('data', data)
    const passwordReset = await payload.forgotPassword({
      collection: 'users',
      data: {
        email: data.email,
      },
      disableEmail: false,
    })
    console.log('passwordReset', passwordReset)
    return { success: true }
  } catch (err) {
    console.log('err', err)
    return { success: false }
  }

  // const {id,_id,userId,email,name,newsletter,phone,terms} = result.data;
  // const { clientSecret, order } = await createStripeSession({ id: _id, email, phone });
  // const payload = await getPayloadClient();
  // const reservation = await payload.findByID({
  //   collection: 'reservations',
  //   id:_id,
  //   depth: 2
  // });

  // const resUser = reservation.user as User;

  // const order = await payload.create({
  //   collection: 'orders',
  //   data: {
  //     _isPaid: false,
  //     reservation: reservation.id,
  //     user: user.id
  //   }
  // });
}
