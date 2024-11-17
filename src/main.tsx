/* eslint-disable @typescript-eslint/ban-ts-comment */
import 'react-app-polyfill/ie11'
import { createRoot } from 'react-dom/client'
import 'utils/polyfills.js'
// @ts-ignore
import App from 'components/App/App'
import './index.css'

// import.meta.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Todo: Be warned, this allows MITM attacks!!!

createRoot(document.getElementById('root')!).render(<App />)
