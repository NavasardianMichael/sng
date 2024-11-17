import { FC, useEffect } from 'react'
import { StoreProvider } from 'store/Provider'
import { initMobileScalers } from 'helpers/mobileScale'
import Auth from 'components/Auth/Auth'
import Main from 'components/Main/Main'
import 'styles/variables.css'

const App: FC = () => {
  useEffect(() => {
    const meta = document.getElementById('meta-viewport')
    if (!meta) return
    meta.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=no')
    initMobileScalers()
  }, [])

  return (
    <StoreProvider>
      <Auth>
        <Main />
      </Auth>
    </StoreProvider>
  )
}

export default App
