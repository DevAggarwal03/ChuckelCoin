import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react'
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { BrowserRouter } from 'react-router-dom'

const wallets = [new PetraWallet()]

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AptosWalletAdapterProvider autoConnect={true} plugins={wallets}>
      <App />
      </AptosWalletAdapterProvider>
    </BrowserRouter>
  </StrictMode>,
)
