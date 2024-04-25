// import kebabCase from 'lodash.kebabcase'
import { CollectionConfig } from 'payload/types'
// import PopoverEndLink from './Blocks/popoverOrEndLink'
// import popoverOrLinkField from './Fields/popoverField'
// import linkPopoverGroup from './Fields/linkPopoverGroup'
// import linkField from './Fields/linkField'
import linkArray from './Fields/linkArray'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
  },
  //   preview: doc => {
  //     return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/preview?url=${encodeURIComponent(
  //       `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/${doc.slug !== 'home' ? doc.slug : ''}`,
  //     )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
  //   },
  // },
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: false,
      index: true,
      // hooks: {
      //   afterRead: [
      //     ({ data, siblingData }) => {
      //       console.log(siblingData)
      //       return
      //       // if (data) {
      //       //   return kebabCase(data.slug)
      //       // }
      //     },
      //   ],
      // },
    },
    // {
    //     name:'navFooter',
    //     type:'group',
    //     fields:[
    //         {
    //             name:'nav',
    //             type:'relationship',
    //             relationTo:'Navbar'
    //         },
    //         {
    //             name:'footer',
    //             type:'relationship',
    //             relationTo:'Footer'
    //         }
    //     ]
    // },
    { name: 'heroImage', label: 'Hero Image', type: 'upload', relationTo: 'media', required: true },
    // {
    //   name:'navbar',type:'group',fields:[
    //     {type:'checkbox',
    //     name:'nav',
    //     label:'Navbar',
    //   },
    //   {
    //     type:'number',
    //     name:'navOrder',
    //     label:"Navbar Order",
    //     min:1,
    //     max:5
    //   }
    //   ]
    // },
    // {
    //   name:'footer',type:'group',fields:[
    //     {type:'checkbox',
    //     name:'footer',
    //     label:'Footer',
    //   },
    //   {
    //     type:'select',
    //     name:'footerSection',
    //     label:"Footer Section",
    //     options:[{
    //       label:'Services',
    //       value:'services'
    //     }]
    //   }
    //   ]
    // },
    {
      name: 'content',
      type: 'blocks',
      blocks: [
        {
          slug: 'faq',
          fields: [
            {
              name: 'faqGroup',
              type: 'group',
              fields: [
                {
                  name: 'description',
                  type: 'textarea',
                },
                linkArray,
              ],
            },
            {
              name: 'faqs',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'question',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'answer',
                      type: 'textarea',
                      required: true,
                    },
                  ],
                },
                linkArray,
              ],
            },
          ],
        },
        {
          slug: 'linkPopover',
          fields: [linkArray],
        },
        // {
        //   slug: 'link',
        //   fields: [
        //     {
        //       type: 'row',
        //       fields: [
        //         {
        //           name: 'copy',
        //           type: 'text',
        //           label: 'Link Text',
        //           required: true,
        //           admin: {
        //             width: '45%',
        //           },
        //         },
        //         {
        //           name: 'icon',
        //           type: 'radio',
        //           label: 'Link Icon',
        //           required: false,
        //           options: [
        //             {
        //               label: 'Information',
        //               value: 'info',
        //             },
        //             {
        //               label: 'Warning',
        //               value: 'warn',
        //             },
        //             {
        //               label: 'None',
        //               value: 'none',
        //             },
        //           ],
        //         },
        //         {
        //           name: 'link',
        //           type: 'text',
        //           label: 'Source URL',
        //           admin: {
        //             width: '45%',
        //           },
        //           required: true,
        //         },
        //         {
        //           name: 'openNewTab',
        //           type: 'checkbox',
        //           label: 'Open Link In New Tab',
        //           required: false,
        //         },
        //       ],
        //     },
        //   ],
        // },
        {
          slug: 'bullets',
          fields: [
            {
              name: 'bullets',
              type: 'array',
              fields: [
                {
                  name: 'bullet',
                  type: 'text',
                },
                linkArray,
              ],
            },
          ],
        },
        {
          slug: 'short-text',
          fields: [
            {
              name: 'short-text',
              type: 'group',
              fields: [
                {
                  name: 'copy',
                  label: 'Text',
                  type: 'text',
                  required: true,
                },
                linkArray,
              ],
            },
          ],
        },
        {
          slug: 'long-text',
          fields: [
            {
              name: 'long-text',
              type: 'group',
              fields: [
                {
                  name: 'copy',
                  label: 'Text',
                  type: 'textarea',
                  required: true,
                },
                linkArray,
              ],
            },
          ],
        },
      ],
    },
  ],
}
