'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ConnectKitButton } from 'connectkit'
import { useTrendingCollections, type UseTrendingCollectionsOptions } from '@/hooks/web3/useTrendingCollections'
import { CollectionCard } from '@/components/nft/CollectionCard'
import { chains, type ChainKey } from '@/lib/config/opensea'

const SORT_OPTIONS = [
  { value: 'seven_day_volume' as const, label: '7d Volume' },
  { value: 'market_cap' as const, label: 'Market Cap' },
  { value: 'num_owners' as const, label: 'Owners' },
  { value: 'one_day_change' as const, label: '24h Change' },
  { value: 'seven_day_change' as const, label: '7d Change' },
]

export default function ExplorePage() {
  const [selectedChain, setSelectedChain] = useState<ChainKey>('ethereum')
  const [sortBy, setSortBy] = useState<UseTrendingCollectionsOptions['sortBy']>('seven_day_volume')
  const [limit, setLimit] = useState(20)
  
  const { data, isLoading, error, refetch } = useTrendingCollections({
    chain: selectedChain,
    sortBy,
    limit,
  })
  
  const chainOptions = Object.entries(chains).map(([key, chain]) => ({
    value: key as ChainKey,
    label: chain.name,
  }))
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-slate-900/50 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-white">NFT Marketplace</h1>
              </Link>
              
              <nav className="hidden md:flex items-center gap-1">
                <Link
                  href="/"
                  className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/30 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/explore"
                  className="px-4 py-2 rounded-lg text-white bg-purple-600/30 border border-purple-500/30"
                >
                  Explore
                </Link>
              </nav>
            </div>
            
            <ConnectKitButton />
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Trending Collections</h2>
            <p className="text-slate-400">Discover the hottest NFT collections across multiple chains</p>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-slate-400 text-sm mb-2">Chain</label>
              <select
                value={selectedChain}
                onChange={(e) => setSelectedChain(e.target.value as ChainKey)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
              >
                {chainOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex-1 min-w-[200px]">
              <label className="block text-slate-400 text-sm mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as UseTrendingCollectionsOptions['sortBy'])}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex-1 min-w-[200px]">
              <label className="block text-slate-400 text-sm mb-2">Show</label>
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
              >
                <option value={10}>10 Collections</option>
                <option value={20}>20 Collections</option>
                <option value={50}>50 Collections</option>
              </select>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 animate-pulse">
                  <div className="aspect-square bg-slate-700/30" />
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between">
                      <div className="h-6 bg-slate-700 rounded w-3/4" />
                      <div className="h-4 bg-slate-700 rounded w-1/4" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-16 bg-slate-700/30 rounded-xl" />
                      <div className="h-16 bg-slate-700/30 rounded-xl" />
                      <div className="h-16 bg-slate-700/30 rounded-xl" />
                      <div className="h-16 bg-slate-700/30 rounded-xl" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Failed to load collections</h3>
              <p className="text-slate-400 mb-6 max-w-md mx-auto">
                {error instanceof Error ? error.message : 'An unexpected error occurred'}
              </p>
              <button
                onClick={() => refetch()}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : data && data.collections.length > 0 ? (
            <>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-slate-400">
                  Showing <span className="text-white font-medium">{data.collections.length}</span> collections
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data.collections.map((collection, index) => (
                  <CollectionCard
                    key={collection.id}
                    collection={collection}
                    rank={index + 1}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto bg-slate-700/30 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No collections found</h3>
              <p className="text-slate-400 max-w-md mx-auto">
                Try selecting a different chain or sorting option
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="py-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-500 text-sm">
            NFT Marketplace - Powered by Next.js, Wagmi, and OpenSea API
          </p>
        </div>
      </footer>
    </div>
  )
}
