import { getURLSearchParamValue } from './urlSearchParams'

export const checkIsReadOnlyMode = () => getURLSearchParamValue('accessToken') != null
