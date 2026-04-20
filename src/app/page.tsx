'use client'

import Link from 'next/link'
import { ConnectKitButton } from 'connectkit'
import { useAccount, useBalance, useChainId } from 'wagmi'
import { mainnet, sepolia, polygon, base, arbitrum } from 'wagmi/chains'
import { formatEther } from 'viem'

const CHAIN_NAMES: Record<number, string> = {
  [mainnet.id]: 'Ethereum Mainnet',
  [sepolia.id]: 'Sepolia Testnet',
  [polygon.id]: 'Polygon Mainnet',
  [base.id]: 'Base Mainnet',
  [arbitrum.id]: 'Arbitrum One',
}

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export default function Home() {
  const { isConnected, address } = useAccount()
  const chainId = useChainId()
  const { data: balance } = useBalance({
    address,
  })

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-slate-900/50 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-white">NFT Marketplace</h1>
              </div>
              
              <nav className="hidden md:flex items-center gap-1">
                <Link
                  href="/"
                  className="px-4 py-2 rounded-lg text-white bg-purple-600/30 border border-purple-500/30"
                >
                  Home
                </Link>
                <Link
                  href="/explore"
                  className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/30 transition-colors"
                >
                  Explore
                </Link>
              </nav>
            </div>
            
            <ConnectKitButton />
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {isConnected ? (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Wallet Connected!</h2>
                <p className="text-slate-400">You are now connected to the blockchain</p>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-700/30 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Address</span>
                    <span className="text-white font-mono text-sm bg-slate-600/50 px-3 py-1 rounded-lg">
                      {address ? shortenAddress(address) : '-'}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Network</span>
                    <span className="text-white font-medium">
                      {CHAIN_NAMES[chainId] || `Chain ID: ${chainId}`}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Balance</span>
                    <span className="text-white font-medium">
                      {balance ? `${parseFloat(formatEther(balance.value)).toFixed(4)} ${balance.symbol}` : '-'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-700/50">
                <p className="text-slate-400 text-sm text-center">
                  Ready to explore the NFT marketplace
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center mb-8 border border-purple-500/30">
                <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Welcome to NFT Marketplace</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
                Connect your wallet to explore, buy, sell, and create unique digital assets on the blockchain
              </p>
              <div className="flex justify-center">
                <ConnectKitButton.Custom>
                  {({ isConnected, show }) => {
                    if (isConnected) return null
                    return (
                      <button
                        onClick={show}
                        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:scale-105"
                      >
                        <span className="flex items-center gap-3">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                          Connect Wallet
                        </span>
                      </button>
                    )
                  }}
                </ConnectKitButton.Custom>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-slate-800 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <p className="text-slate-400 text-sm">Secure</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-slate-800 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-slate-400 text-sm">Fast</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-slate-800 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                  </div>
                  <p className="text-slate-400 text-sm">Decentralized</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="py-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-500 text-sm">
            NFT Marketplace - Powered by Next.js, Wagmi, and ConnectKit
          </p>
        </div>
      </footer>
    </div>
  )
}
