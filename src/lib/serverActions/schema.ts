import parsePhoneNumberFromString from 'libphonenumber-js'
import * as z from 'zod'
export type BookingStartInputs = z.infer<typeof BookingStartSchema>
export type BookingCompleteInputs = z.infer<typeof BookingCompleteSchema>
export type UpdateReservationInputs = z.infer<typeof UpdateReservationSchema>
export type UpdateAdminReservationInputs = z.infer<typeof UpdateAdminReservationSchema>
export type CreateReservationServerInputs = z.infer<typeof CreateReservationServerSchema>
export type SignupInputs = z.infer<typeof SignupFormSchema>
export type ForgottenPasswordInputs = z.infer<typeof ForgottenPasswordSchema>
export type ResetPasswordInputs = z.infer<typeof ResetPasswordSchema>
export type SigninInputs = z.infer<typeof SignInFormSchema>
export type NewsletterInputs = z.infer<typeof NewsletterFormSchema>
export type ProfileFormInputs = z.infer<typeof ProfileFormSchema>

export const SignupFormSchema = z
  .object({
    first: z.string({ required_error: 'Missing' }).min(2, {
      message: 'Missing',
    }),
    last: z.string({ required_error: 'Missing' }).min(2, {
      message: 'Missing',
    }),
    email: z.string({ required_error: 'Please enter a valid email' }).email({
      message: 'Please enter a valid email',
    }),
    password: z.string().min(8, { message: 'Minimum of 8 characters' }),
    confirmPassword: z.string().min(8, { message: 'Minimum of 8 characters' }),
    phone: z.string({ required_error: 'Invalid phone number' }).transform((arg, ctx) => {
      const phone = parsePhoneNumberFromString(arg, {
        defaultCountry: 'US',
        extract: false,
      })
      if (phone && phone.isValid()) {
        return phone.number
      }
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid Phone Number',
      })
      return z.NEVER
    }),
    newsletter: z.boolean().default(true).optional(),
    terms: z
      .boolean({ required_error: 'You must review and accept the terms and conditions' })
      .default(true)
      .refine((val) => val === true, {
        message: 'Please read and accept the terms of service and privacy policy',
      }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      })
    }
  })
export const ProfileFormSchema = z.object({
  first: z.string().min(2, {
    message: 'Please let us know how we should greet you',
  }),
  last: z.string().min(2, {
    message: 'Please let us know how we should greet you',
  }),
  email: z.string().email({
    message: 'Please enter a valid email',
  }),
  // password: z.string().min(8, { message: 'Minimum of 8 characters' }),
  phone: z.string({ required_error: 'Invalid phone number' }).transform((arg, ctx) => {
    const phone = parsePhoneNumberFromString(arg, {
      defaultCountry: 'US',
      extract: false,
    })
    if (phone && phone.isValid()) {
      return phone.number
    }
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Invalid Phone Number',
    })
    return z.NEVER
  }),
  newsletter: z.boolean().default(true).optional(),
})
export const SignInFormSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email',
  }),
  password: z.string().min(8, { message: 'Minimum of 8 characters' }),
})
export const ResetPasswordSchema = z
  .object({
    token: z.coerce.string({
      required_error: 'Please enter a valid email',
    }),
    password: z.string().min(8, { message: 'Minimum of 8 characters' }),
    confirmPassword: z.string().min(8, { message: 'Minimum of 8 characters' }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      })
    }
  })
export const ForgottenPasswordSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email',
  }),
})
export const BookingStartSchema = z.object({
  first: z
    .string({ required_error: 'Name required', invalid_type_error: 'Please enter a valid name' })
    .min(2, {
      message: 'Please let us know under how we should greet you!',
    }),
  last: z
    .string({ required_error: 'Name required', invalid_type_error: 'Please enter a valid name' })
    .min(2, {
      message: 'Please let us know how we should greet you',
    }),
  email: z
    .string({
      required_error: 'Invalid email',
      invalid_type_error: 'Please enter a valid email',
    })
    .email({
      message: 'Please enter a valid email',
    }),
  discount: z.boolean().default(false),
  phone: z
    .string({
      required_error: 'Invalid phone number',
      invalid_type_error: 'Please enter a valid phone number',
    })
    .transform((arg, ctx) => {
      const phone = parsePhoneNumberFromString(arg, {
        defaultCountry: 'US',
        extract: false,
      })
      if (phone && phone.isValid()) {
        return phone.number
      }
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid Phone Number',
      })
      return z.NEVER
    }),
  id: z.string({ required_error: 'Something Went Wrong' }),
  userId: z.number({ invalid_type_error: 'invalid user id' }).nullable(),
  _id: z.number({ required_error: "Can't locate id" }),
})
export const BookingCompleteSchema = z.object({
  first: z.string().min(2, {
    message: 'Please let us know how we should greet you',
  }),
  last: z.string().min(2, {
    message: 'Please let us know how we should greet you',
  }),
  email: z.string().email({
    message: 'Please enter a valid email',
  }),
  phone: z.string({ required_error: 'Invalid phone number' }).transform((arg, ctx) => {
    const phone = parsePhoneNumberFromString(arg, {
      defaultCountry: 'US',
      extract: false,
    })
    if (phone && phone.isValid()) {
      return phone.number
    }
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Invalid Phone Number',
    })
    return z.NEVER
  }),
  id: z.string({ required_error: 'Something Went Wrong' }),
  orderId: z.number({ required_error: 'Missing Order' }),
  userId: z.number({ invalid_type_error: 'wrong userid type' }).optional().nullable(),
  _id: z.number({ required_error: "Can't locate id", invalid_type_error: 'wrong _id type' }),
  newsletter: z.boolean().default(true).optional(),
  terms: z
    .boolean({ required_error: 'You must review and accept the terms and conditions' })
    .default(true)
    .refine((val) => val === true, {
      message: 'Please read and accept the terms of service and privacy policy',
    }),
})
export const UpdateReservationSchema = z.object({
  id: z.number({ required_error: 'need reservation id' }),
  details: z.number({
    required_error: 'need reservation proof',
    invalid_type_error: 'Missing reservation proof',
  }),
  price: z.coerce.number({
    required_error: 'Please indictate the price you wish to charge',
    invalid_type_error: 'Please indictate the price you wish to charge',
  }),
  date: z.coerce.date({
    required_error: 'Please provide the reservation date and time',
    invalid_type_error: 'something went wrong with the type',
  }),
  saleStatus: z.boolean({ required_error: 'Need status' }),

  seats: z.coerce.number({
    required_error: 'Please indicate the maximum number of guests for the reservation',
    invalid_type_error: 'Please indicate the maximum number of guests for the reservation',
  }),
  restaurant: z.number({
    required_error: 'Please select a restaurant',
    invalid_type_error: 'Please select a restaurant',
  }),
  city: z.number({
    required_error: 'Please select a city',
    invalid_type_error: 'Please select a city',
  }),
  tos: z
    .boolean({ required_error: 'Please read and accept the terms of service and privacy policy' })
    .refine((val) => val === true, {
      message: 'Please read and accept the terms of service and privacy policy',
    }),
  serviceFee: z
    .boolean({
      required_error:
        'Please confirm that you accept that a service fee will be charged for all sales',
    })
    .refine((val) => val === true, {
      message: 'Please confirm that you accept that a service fee will be charged for all sales',
    }),
  // picture: z
  //   .custom<FileList>()
  //   .refine((files) => {
  //     return Array.from(files ?? []).length !== 0;
  //   }, 'Image is required')
  //   .refine((files) => {
  //     return Array.from(files ?? []).every((file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE);
  //   }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`)
  //   .refine((files) => {
  //     return Array.from(files ?? []).every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type));
  //   }, 'File type is not supported'),
  link: z
    .string({ required_error: 'Please enter a valid url' })
    .url({ message: 'Please enter a valid url' })
    .transform((url) => new URL(url).href),
  reservationFor: z.string({ required_error: 'Who is the reservation under?' }),
  mealCredit: z.coerce.number().optional(),
  // price: z.coerce.number({ required_error: 'need price' }),
  // mealCredit: z.coerce.number().optional(),
  // date: z.coerce.date({
  //   required_error: 'Please provide the reservation date and time',
  //   invalid_type_error: 'something went wrong with the type'
  // }),
  // saleStatus: z.boolean({ required_error: 'Need status' })
})
export const UpdateAdminReservationSchema = z.object({
  id: z.number({ required_error: 'need reservation id' }),
  details: z.number({
    required_error: 'need reservation proof',
    invalid_type_error: 'Missing reservation proof',
  }),
  price: z.coerce.number({
    required_error: 'Please indictate the price you wish to charge',
    invalid_type_error: 'Please indictate the price you wish to charge',
  }),
  date: z.coerce.date({
    required_error: 'Please provide the reservation date and time',
    invalid_type_error: 'something went wrong with the type',
  }),
  saleStatus: z.boolean({ required_error: 'Need status' }),

  seats: z.coerce.number({
    required_error: 'Please indicate the maximum number of guests for the reservation',
    invalid_type_error: 'Please indicate the maximum number of guests for the reservation',
  }),
  restaurant: z.number({
    required_error: 'Please select a restaurant',
    invalid_type_error: 'Please select a restaurant',
  }),
  city: z.number({
    required_error: 'Please select a city',
    invalid_type_error: 'Please select a city',
  }),
  tos: z
    .boolean({ required_error: 'Please read and accept the terms of service and privacy policy' })
    .refine((val) => val === true, {
      message: 'Please read and accept the terms of service and privacy policy',
    }),
  serviceFee: z
    .boolean({
      required_error:
        'Please confirm that you accept that a service fee will be charged for all sales',
    })
    .refine((val) => val === true, {
      message: 'Please confirm that you accept that a service fee will be charged for all sales',
    }),
  approvedForSale: z.enum(['pending', 'approved', 'denied']),
  adminComments: z.string().optional(),
  // picture: z
  //   .custom<FileList>()
  //   .refine((files) => {
  //     return Array.from(files ?? []).length !== 0;
  //   }, 'Image is required')
  //   .refine((files) => {
  //     return Array.from(files ?? []).every((file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE);
  //   }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`)
  //   .refine((files) => {
  //     return Array.from(files ?? []).every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type));
  //   }, 'File type is not supported'),
  link: z
    .string({ required_error: 'Please enter a valid url' })
    .url({ message: 'Please enter a valid url' })
    .transform((url) => new URL(url).href),
  reservationFor: z.string({ required_error: 'Who is the reservation under?' }),
  mealCredit: z.coerce.number().optional(),
  // price: z.coerce.number({ required_error: 'need price' }),
  // mealCredit: z.coerce.number().optional(),
  // date: z.coerce.date({
  //   required_error: 'Please provide the reservation date and time',
  //   invalid_type_error: 'something went wrong with the type'
  // }),
  // saleStatus: z.boolean({ required_error: 'Need status' })
})

export const CreateReservationServerSchema = z.object({
  price: z.coerce.number({
    required_error: 'Please indictate the price you wish to charge',
    invalid_type_error: 'Please indictate the price you wish to charge',
  }),
  date: z.coerce.date({
    required_error: 'Please provide the reservation date and time',
    invalid_type_error: 'something went wrong with the type',
  }),
  saleStatus: z.boolean({ required_error: 'Need status' }),
  seats: z.coerce.number({
    required_error: 'Please indicate the maximum number of guests for the reservation',
    invalid_type_error: 'Please indicate the maximum number of guests for the reservation',
  }),
  restaurant: z.number({
    required_error: 'Please select a restaurant',
    invalid_type_error: 'Please select a restaurant',
  }),
  city: z.number({
    required_error: 'Please select a city',
    invalid_type_error: 'Please select a city',
  }),
  tos: z
    .boolean({ required_error: 'Please read and accept the terms of service and privacy policy' })
    .refine((val) => val === true, {
      message: 'Please read and accept the terms of service and privacy policy',
    }),
  serviceFee: z
    .boolean({
      required_error:
        'Please confirm that you accept that a service fee will be charged for all sales',
    })
    .refine((val) => val === true, {
      message: 'Please confirm that you accept that a service fee will be charged for all sales',
    }),
  // picture: z
  //   .custom<FileList>()
  //   .refine((files) => {
  //     return Array.from(files ?? []).length !== 0;
  //   }, 'Image is required')
  //   .refine((files) => {
  //     return Array.from(files ?? []).every((file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE);
  //   }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`)
  //   .refine((files) => {
  //     return Array.from(files ?? []).every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type));
  //   }, 'File type is not supported'),
  link: z
    .string({ required_error: 'Please enter a valid url' })
    .url({ message: 'Please enter a valid url' })
    .transform((url) => new URL(url).href),
  reservationFor: z.string({ required_error: 'Who is the reservation under?' }),
  mealCredit: z.coerce.number().optional(),
})

export const NewsletterFormSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email',
  }),
})
