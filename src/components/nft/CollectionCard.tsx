'use client'

import Link from 'next/link'
import { type Collection } from '@/lib/config/nftscan'

interface CollectionCardProps {
  collection: Collection
  rank?: number
}

export function CollectionCard({ collection, rank }: CollectionCardProps) {
  const { name, image, floorAsk, volume, volumeChange, tokenCount, ownerCount, symbol, slug } = collection
  
  const floorPrice = floorAsk?.price?.amount?.native
  const volume1Day = volume?.['1day']
  const volumeChange1Day = volumeChange?.['1day']
  
  const formatNumber = (num: number | null | undefined): string => {
    if (num == null) return '-'
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(2)}K`
    return num.toFixed(2)
  }
  
  const formatTokenCount = (count: number | null | undefined): string => {
    if (count == null) return '-'
    return count.toLocaleString()
  }
  
  const cardContent = (
    <div className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
      <div className="relative">
        {rank !== undefined && (
          <div className="absolute top-3 left-3 z-10 w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">#{rank}</span>
          </div>
        )}
        
        <div className="aspect-square bg-slate-700/30 overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={name || 'Collection'}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800">
              <svg className="w-16 h-16 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold text-lg truncate group-hover:text-purple-400 transition-colors">
            {name || 'Unknown Collection'}
          </h3>
          {symbol && (
            <span className="text-slate-400 text-sm font-mono">
              {symbol}
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-700/30 rounded-xl p-3">
            <p className="text-slate-400 text-xs mb-1">Floor Price</p>
            <p className="text-white font-semibold">
              {floorPrice !== undefined && floorPrice !== null
                ? `${floorPrice.toFixed(4)} ETH`
                : '-'}
            </p>
          </div>
          
          <div className="bg-slate-700/30 rounded-xl p-3">
            <p className="text-slate-400 text-xs mb-1">24h Volume</p>
            <div className="flex items-center gap-2">
              <p className="text-white font-semibold">
                {formatNumber(volume1Day)} ETH
              </p>
              {volumeChange1Day !== undefined && volumeChange1Day !== null && (
                <span className={`text-xs font-medium ${volumeChange1Day >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {volumeChange1Day >= 0 ? '+' : ''}{volumeChange1Day.toFixed(1)}%
                </span>
              )}
            </div>
          </div>
          
          <div className="bg-slate-700/30 rounded-xl p-3">
            <p className="text-slate-400 text-xs mb-1">Items</p>
            <p className="text-white font-semibold">
              {formatTokenCount(tokenCount)}
            </p>
          </div>
          
          <div className="bg-slate-700/30 rounded-xl p-3">
            <p className="text-slate-400 text-xs mb-1">Owners</p>
            <p className="text-white font-semibold">
              {formatTokenCount(ownerCount)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  if (slug) {
    return (
      <Link href={`/collections/${slug}`} className="block">
        {cardContent}
      </Link>
    )
  }

  return cardContent
}
