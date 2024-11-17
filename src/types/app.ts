import { VIEW_TEMPLATE } from 'constants/app'

export type ViewType = (typeof VIEW_TEMPLATE)[keyof typeof VIEW_TEMPLATE]['id']
