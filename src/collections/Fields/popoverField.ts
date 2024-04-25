import { CollapsibleField, Field, GroupField } from 'payload/types'

const popoverField: CollapsibleField = {
  label: 'Popover',
  type: 'collapsible',
  admin: {
    initCollapsed: true,
  },
  fields: [
    {
      name: 'pCopy',
      label: 'Copy Before Hover',
      type: 'text',
      admin: {
        condition: (data, sib) => {
          return sib.pContent
        },
      },
    },
    {
      name: 'pIcon',
      type: 'radio',
      label: 'Popover Icon',
      admin: {
        condition: (data, sib) => {
          return sib.pContent
        },
      },

      options: [
        {
          label: 'Information',
          value: 'info',
        },
        {
          label: 'Warning',
          value: 'warn',
        },
        {
          label: 'None',
          value: 'none',
        },
      ],
    },
    {
      name: 'pContent',
      label: 'Inside Popover Copy',
      type: 'text',
      // admin: {
      //   condition: (data, sib) => {
      //     return sib.pCopy
      //   },
      // },
    },
  ],
}

export default popoverField
