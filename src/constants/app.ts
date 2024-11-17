import { lazy } from 'react'
import CardsViewIcon from 'assets/icons/card.svg'
import CascadeViewIcon from 'assets/icons/cascade.svg'
import ColumnViewIcon from 'assets/icons/column.svg'
import { Cascade } from 'components/Content/Cascade/Cascade'

const ColumnViewLazy = lazy(() => import('components/Content/Column/Column'))
const CardViewLazy = lazy(() => import('components/Content/Cards/Cards'))

export const VIEW_TEMPLATE = {
  cascade: {
    id: 'cascade',
    label: 'Cascade',
    Icon: CascadeViewIcon,
    ContentComponent: Cascade,
  },
  column: {
    id: 'column',
    label: 'Column',
    Icon: ColumnViewIcon,
    ContentComponent: ColumnViewLazy,
  },
  universalCards: {
    id: 'universalCards',
    label: 'Universal Cards',
    Icon: CardsViewIcon,
    ContentComponent: CardViewLazy,
  },
} as const

export const VIEW_TYPES_LIST = [VIEW_TEMPLATE.cascade.id, VIEW_TEMPLATE.column.id, VIEW_TEMPLATE.universalCards.id]
