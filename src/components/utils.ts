interface IUrlParams {
  q: string,
  correct: string,
  wrong: string
}

import { useUrlSearchParams } from '@vueuse/core'
export const urlParams = useUrlSearchParams<IUrlParams>('history')