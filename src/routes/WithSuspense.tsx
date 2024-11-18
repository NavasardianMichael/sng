import { FC, LazyExoticComponent, Suspense } from 'react'
import Loader from 'components/ui/Loader/Loader'

export const WithSuspense = (Component: LazyExoticComponent<FC>) => {
  return (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  )
}
