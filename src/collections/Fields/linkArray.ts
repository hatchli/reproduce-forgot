import { ArrayField, CollapsibleField } from 'payload/types'

const linkArray: ArrayField = {
  label: 'Link',
  type: 'array',
  name: 'linkArray',
  admin: {
    initCollapsed: true,
  },
  fields: [
    {
      name: 'lType',
      label: 'Link Type',
      type: 'radio',
      defaultValue: 'none',
      options: [
        {
          label: 'Popover',
          value: 'popover',
        },
        { label: 'Link', value: 'link' },
        { label: 'None', value: 'none' },
      ],
    },

    {
      name: 'lLocation',
      label: 'Link/Popover Location',
      type: 'radio',
      admin: {
        condition: (data, sib) => {
          return sib.lType !== 'none'
        },
      },
      options: [
        {
          label: 'Internal',
          value: 'internal',
        },
        { label: 'External', value: 'external' },
      ],
    },
    {
      name: 'iMatch',
      label: 'Matching Internal Word(s)',
      type: 'text',
      admin: {
        condition: (data, sib) => {
          return sib.lLocation === 'internal'
        },
      },
    },
    {
      name: 'pCopy',
      label: 'External Popover Copy',
      type: 'text',
      required: false,
      admin: {
        condition: (data, sib) => {
          return sib.lLocation === 'external' && sib.lType === 'popover'
        },
      },
    },
    {
      name: 'eCopy',
      label: 'External Copy',
      type: 'text',
      required: false,
      admin: {
        condition: (data, sib) => {
          return sib.lLocation === 'external'
        },
      },
    },
    {
      name: 'icon',
      type: 'radio',
      label: 'Link Icon',
      required: false,
      admin: {
        condition: (data, sib) => {
          return sib.lType !== 'none'
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
      name: 'link',
      label: 'URL',
      type: 'text',
      admin: {
        condition: (data, sib) => {
          return sib.lType === 'link'
        },
      },
    },
    {
      name: 'openNewTab',
      type: 'checkbox',
      label: 'Open Link In New Tab',
      admin: {
        condition: (data, sib) => {
          return sib.lType === 'link'
        },
      },
    },
  ],
}

export default linkArray
