import { GetMaxiomsAPI } from 'api/maxioms/types'
import { Cmap } from 'store/maxiom/types'
import { Universal } from 'store/posts/types'

export const PINNED_CMAP_IDS_BY_UNIVERSAL_ID_MOCK: Record<Universal['id'], Cmap['id'][]> = {
  1: ['1VLHK4ZFQ-13Q733T-KS4', '1VLHK5HLQ-2B8WVXS-KW4', '1VLHKSGD8-3YS08R-LM3'],
  2: ['1VLHK4ZFQ-13Q733T-KS4', '1VLHK5HLQ-2B8WVXS-KW4', '1VLHKTJ03-6Z1KM0-LYP'],
  3: [],
  4: ['1VLHK4ZFQ-1FVDSMH-KRX', '1VLHK4ZFQ-1QSPXCB-KS1', '1VLHKSGD9-6L1PBB-LN8'],
  5: ['1VLHKTJ04-1CP2DF9-LZN', '1VLHKTJ03-1SBBVGT-LYS', '1VLHKSGD8-8VFSR6-LL1'],
  6: ['1VLHKTJ04-1CP2DF9-LZN', '1VLHJLPQ6-22XNJLH-KL5'],
  7: ['1VLHKTJ04-2DTC1X-LZ5'],
}

export const REPETITION_MAXIOMS_MOCK: GetMaxiomsAPI['response'] = [
  {
    maxiomId: 333333333333,
    maxiom:
      'Repetition 1 Repetition 1 Repetition 1 Repetition 1Repetition 1 Repetition 1 Repetition 1 Repetition 1Repetition 1 Repetition 1 Repetition 1 Repetition 1Repetition 1 Repetition 1 Repetition 1 Repetition 1Repetition 1 Repetition 1 Repetition 1 Repetition 1Repetition 1 Repetition 1 Repetition 1 Repetition 1Repetition 1 Repetition 1 Repetition 1 Repetition 1Repetition 1 Repetition 1 Repetition 1 Repetition 1',
    posinconcept: 1,
    cmapId: '1VLHJLPQ6-1SBWXT4-KLB',
    parentCmapId: '1VLHJM35Q-277LMB8-KNK',
    xPos: 612,
    yPos: 93,
    width: 135,
    height: 48,
    isRepetition: true,
    colors: [
      {
        colorId: 2,
        orderId: 1,
      },
      {
        colorId: 0,
        orderId: 2,
      },
      {
        colorId: 0,
        orderId: 3,
      },
      {
        colorId: 2,
        orderId: 4,
      },
      {
        colorId: 3,
        orderId: 5,
      },
      {
        colorId: 0,
        orderId: 6,
      },
    ],
  },
  {
    maxiomId: 66666666666666,
    maxiom: 'Repetition 2',
    posinconcept: 1,
    cmapId: '1VLHJLPQ6-1SBWXT4-KLB',
    parentCmapId: '1VLHJM35Q-277LMB8-KNK',
    xPos: 612,
    isRepetition: true,
    yPos: 93,
    width: 135,
    height: 48,
    colors: [
      {
        colorId: 2,
        orderId: 1,
      },
      {
        colorId: 0,
        orderId: 2,
      },
      {
        colorId: 0,
        orderId: 3,
      },
      {
        colorId: 2,
        orderId: 4,
      },
      {
        colorId: 3,
        orderId: 5,
      },
      {
        colorId: 0,
        orderId: 6,
      },
    ],
  },
]
