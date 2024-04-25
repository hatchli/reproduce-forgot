import path from 'path'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { en } from 'payload/i18n/en'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
// import { vercelBlobAdapter } from '@payloadcms/plugin-cloud-storage/vercelBlob'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3'
// import { s3Storage } from '@payloadcms/storage-s3'
//import { slateEditor } from '@payloadcms/richtext-slate'
// import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload/config'
import sharp from 'sharp'
import search from '@payloadcms/plugin-search'
import { fileURLToPath } from 'url'
import { Users } from '@/collections/Users'
import { Reservations } from '@/collections/Reservations'
import { Cities } from '@/collections/Cities'
import { Restaurants } from '@/collections/Restaurants'
import { Media } from '@/collections/Media'
import { Cuisines } from '@/collections/Cuisines'
import { Recomendations } from '@/collections/Recomendations'
import { Orders } from '@/collections/Orders'
import { Locations } from '@/collections/Locations'
import { Details } from '@/collections/Details'
import { Addresses } from '@/collections/Addresses'
import { Newsletter } from '@/collections/Newsletter'
import { Pages } from '@/collections/Pages'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import nodemailer from 'nodemailer'
import Nav from '@/collections/Globals/Nav'
// import { Admin } from '@/collections/Admin'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.PAYLsOAD_PUBLIC_SERVER_URL,

  //editor: slateEditor({}),

  editor: lexicalEditor(),
  globals: [Nav],
  collections: [
    Pages,
    Users,
    Reservations,
    Cities,
    Restaurants,
    Media,
    // ProtectedMedia,
    Cuisines,
    Recomendations,
    Orders,
    Locations,
    Details,
    Addresses,
    Newsletter,
  ],
  plugins: [
    cloudStorage({
      collections: {
        [Media.slug]: {
          // adapter: vercelBlobAdapter({
          //   token: process.env.BLOB_READ_WRITE_TOKEN || '',
          // }),
          // disableLocalStorage: true,
          // disablePayloadAccessControl: true,
          adapter: s3Adapter({
            bucket: process.env.S3_BUCKET,
            config: {
              region: process.env.S3_REGION,
              endpoint: process.env.S3_ENDPOINT,
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
              },
            },
          }),
          disableLocalStorage: true,
          disablePayloadAccessControl: true,
        },
      },
    }),
    // s3Storage({
    //   collections: {
    //     [Media.slug]: true
    //   },
    //   config: {
    //           region: process.env.S3_REGION,
    //           endpoint: process.env.S3_ENDPOINT,
    //           credentials: {
    //             accessKeyId: process.env.S3_ACCESS_KEY_ID,
    //             secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    //           },
    //         },
    //         bucket: process.env.S3_BUCKET,
    //       }),
    //       disableLocalStorage: true,
    //       disablePayloadAccessControl: true,

    // }),
    // s3Storage({
    //   collections: {
    //     [Media.slug]: true,
    //   },
    //   bucket: process.env.S3_BUCKET,
    //   config: {
    //     credentials: {
    //       accessKeyId: process.env.S3_ACCESS_KEY_ID,
    //       secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    //     },
    //     region: process.env.S3_REGION,
    //     endpoint: process.env.S3_ENDPOINT,
    //   },
    //   disableLocalStorage: true,

    //   // disablePayloadAccessControl: true,
    // }),
    search({
      collections: ['restaurants'],
      searchOverrides: {
        fields: [
          { name: 'city', type: 'text' },
          { name: 'citySlug', type: 'text' },
          { name: 'slug', type: 'text' },
        ],
      },
      beforeSync: ({ searchDoc, originalDoc }) => {
        const returnDoc = {
          ...searchDoc,
          city: originalDoc?.city?.name,
          citySlug: originalDoc?.city?.slug,
          title: originalDoc?.name,
          slug: originalDoc?.slug,
        }
        return returnDoc
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  // db: mongooseAdapter({
  //   url: process.env.MONGODB_URI || '',
  // }),

  /**
   * Payload can now accept specific translations from the @payloadcms/translations package.
   * This is an optional feature.
   */
  i18n: {
    supportedLanguages: { en },
  },
  email: nodemailerAdapter({
    defaultFromAddress: 'info@hatchli.com',
    defaultFromName: 'TableForYou',
    transport: nodemailer.createTransport({
      host: 'smtp.resend.com',
      secure: true,
      port: 465,
      auth: {
        user: 'resend',
        pass: process.env.RESEND_API_KEY,
      },
    }),
  }),
  admin: {
    user: 'users',

    // autoLogin: {
    //   email: 'dev@payloadcms.com',
    //   password: 'test',
    //   prefillOnly: true,
    // },
  },
  async onInit(payload) {
    // const existingUsers = await payload.find({
    //   collection: 'users',
    //   limit: 1,
    // })
    // if (existingUsers.docs.length === 0) {
    //   await payload.create({
    //     collection: 'users',
    //     data: {
    //       email: 'dev@payloadcms.com',
    //       password: 'test',
    //     },
    //   })
    // }
  },
  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.

  // This is temporary - we may make an adapter pattern
  // for this before reaching 3.0 stable
  sharp,
})
