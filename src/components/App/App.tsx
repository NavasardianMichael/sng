import { FC } from 'react'
import Router from 'routes/RouterProvider'
import { StoreProvider } from 'store/Provider'
import 'styles/variables.css'

const App: FC = () => {
  return (
    <StoreProvider>
      <Router />
    </StoreProvider>
  )
}

export default App
