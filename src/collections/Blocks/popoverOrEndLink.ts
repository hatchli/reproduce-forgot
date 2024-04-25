import { Block } from 'payload/types'

const PopoverEndLink: Block = {
  slug: 'popoverOrEndLink',
  fields: [
    {
      name: 'endLcontent',
      label: 'Link Content',
      type: 'text',
      admin: {
        condition: (data, sib) => {
          return sib.content
        },
      },
    },
    {
      name: 'icon',
      type: 'select',
      label: ' Icon',
      required: false,
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
          value: undefined,
        },
      ],
    },
    {
      name: 'popoverContent',
      label: 'Popover Copy',
      type: 'text',
      required: false,
    },
    {
      name: 'link',
      label: 'URL',
      type: 'text',
      admin: {
        condition: (data, sib) => {
          return sib.content
        },
      },
    },
  ],
}

export default PopoverEndLink
