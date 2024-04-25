import { GroupField } from 'payload/types'
import linkField from './linkField'
import popoverField from './popoverField'

const linkPopoverGroup: GroupField = {
  name: 'linkPopover',
  label: 'Link / Popover',
  type: 'group',
  fields: [linkField, popoverField],
}

export default linkPopoverGroup
