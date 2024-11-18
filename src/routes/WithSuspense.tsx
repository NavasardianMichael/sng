import { FC, LazyExoticComponent, Suspense } from 'react'
import Loader from 'components/_shared/Loader/Loader'

export const WithSuspense = (Component: LazyExoticComponent<FC>) => {
  return (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  )
}
