import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design'
import { getBalance, mint, registerCoin, transferCoins } from './utils/CoinMethods'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { Account, AccountAddress, AccountAddressInput} from "@aptos-labs/ts-sdk";

function App() {

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App


export const NavBar = () => {
  return(
    <div className='w-full flex justify-between px-8 py-4 bg-orange-300 text-xl font-serif font-bold text-black items-center'>
      <h1>New Dapp</h1>
      <div>
        <WalletSelector/>
      </div>
    </div>
  )
}

export const Home = () => {
  const wallet = useWallet()
  const CoinTypeAddress = AccountAddress.from(import.meta.env.VITE_ACC_ADDRESS)
  const address = AccountAddress.from(wallet.account?.address as AccountAddressInput)
  return (
    <div className='flex justify-center items-center w-full'>
      <div className='w-10/12 gap-y-2 flex justify-center flex-col p-3 items-center'>
        <button onClick={() => {registerCoin().then((res) => console.log(res))}} className='p-3 bg-blue-500 text-white font-sans text-left rounded-lg text-xl'>Register the minter acc</button>
        <button onClick={() => {getBalance(address).then(res => console.log(res))}} className='p-3 bg-blue-500 text-white font-sans text-left rounded-lg text-xl'>Get Balance</button>
        <button onClick={() => {mint(CoinTypeAddress, 10000000).then(res => console.log(res))}} className='p-3 bg-blue-500 text-white font-sans text-left rounded-lg text-xl'>Mint tokens</button>
        <button onClick={() => {transferCoins(wallet, "0x73403a07954b60387490fe6c804e186f624a296905decadf4a815386badaf97d", 100000).then(res => console.log(res))}} className='p-3 bg-blue-500 text-white font-sans text-left rounded-lg text-xl'>Transfere 100 Chuckel Coins</button>
      </div>
      
    </div>
  )
}